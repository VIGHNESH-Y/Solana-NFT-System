import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Transaction } from "@solana/web3.js";
import { FaExternalLinkAlt } from "react-icons/fa"; // ✅ Fixed Import
import { Notify } from "../../Context/constants";

// ✅ Fetch API keys securely & provide fallback values
const SHYFT_API_KEY = process.env.NEXT_PUBLIC_SHYFT_AIP_KEY || "";
const SHYFT_ENDPOINT = process.env.NEXT_PUBLIC_SHYFT_ENDPOINT || "";

const BurnNFT = ({ burnNFT, setLoader }) => {
  const { connection } = useConnection();
  const { sendTransaction, publicKey } = useWallet();
  const [loading, setLoading] = useState(false);
  const [network, setNetwork] = useState("devnet");

  // ✅ Ensure localStorage only runs on client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedNetwork = localStorage.getItem("NETWORK") || "devnet";
      setNetwork(storedNetwork);
    }
  }, []);

  // ✅ Notification Helpers
  const notify = (msg, type = "success") => {
    if (type === "success") toast.success(msg, { duration: 2000 });
    else toast.error(msg, { duration: 2000 });
  };

  // ✅ Burn NFT Function
  const handleBurnNFT = async () => {
    if (!burnNFT || !burnNFT.mint) {
      notify("Invalid NFT data!", "error");
      return;
    }

    if (!publicKey) {
      notify("Wallet not connected!", "error");
      return;
    }

    try {
      setLoading(true);
      setLoader(true);

      const nftUrl = `${SHYFT_ENDPOINT}nft/burn_detach`;

      console.log("SHYFT API URL:", nftUrl);

      // ✅ Changed DELETE to POST for proper request handling
      const response = await axios.post(
        nftUrl,
        {
          network,
          wallet: publicKey.toString(),
          token_address: burnNFT.mint,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": SHYFT_API_KEY,
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Failed to burn NFT!");
      }

      const encodedTransaction = response.data.result.encoded_transaction;

      // ✅ Ensure `encoded_transaction` exists before decoding
      if (!encodedTransaction) {
        throw new Error("No transaction data received!");
      }

      const transaction = Transaction.from(Buffer.from(encodedTransaction, "base64"));
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "finalized");

      Notify("NFT Burned Successfully", burnNFT.image_uri, burnNFT.name);
      notify("NFT Burned Successfully");
    } catch (error) {
      console.error("Error burning NFT:", error);
      notify(error?.response?.data?.message || error.message, "error");
    } finally {
      setLoading(false);
      setLoader(false);
    }
  };

  return (
    <div className="modal fade popup" id="burnNFT" tabIndex={-1} role="dialog" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
          <div className="modal-body">
            {burnNFT ? (
              <>
                <div className="image">
                  <img src={burnNFT.image_uri} alt={burnNFT.name} />
                </div>
                <div className="logo-rotate">
                  <img src="logo-solana.png" style={{ width: "80px", borderRadius: "50%" }} alt="Solana Logo" />
                </div>
                <h2>{burnNFT.name}</h2>
                <p>{burnNFT.description?.slice(0, 115)}...</p>
                <p>Are you sure you want to burn this NFT?</p>

                <button
                  disabled={loading}
                  onClick={handleBurnNFT}
                  className="tf-button style-1 h50"
                  style={{
                    backgroundColor: loading ? "#ccc" : "#000",
                    color: "white",
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Burning..." : `Yes, Burn ${burnNFT.symbol}`}
                  <FaExternalLinkAlt />
                </button>
              </>
            ) : (
              <p className="text-danger">No NFT selected!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurnNFT;
