import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import toast from "react-hot-toast";
import { Preloader, Mouse, Footer, Header } from "../Components/Home/index";
import { FaExternalLinkAlt } from "../Components/Home/SVG/index";

const FORMSPREE_API = process.env.NEXT_PUBLIC_FORMSPREE_API;

const ContactUs = () => {
  const [state, handleSubmit] = useForm(FORMSPREE_API);

  const notifySuccess = (msg) => toast.success(msg, { duration: 2000 });
  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  if (state.succeeded) {
    notifySuccess("Thanks for sending your message!");
  }

  return (
    <>
      <Preloader />
      <div id="wrapper">
        <div id="page" className="pt-40">
          <Header />

          {/* Title Section */}
          <div className="flat-title-page">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <h1 className="heading text-center">Contact Us</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Google Maps */}
          <div className="tf-section-2 contact-us">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-12">
                  <div className="widget-gg-map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.143360774167!2d80.20931281482257!3d13.058124316126622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266c3b2cb2f7d%3A0x26c3742e43c3a6a5!2sT%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689125037376!5m2!1sen!2sin"
                      width="100%"
                      height={460}
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="tf-section-2 widget-box-icon">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading-section-1">
                    <h2 className="tf-title pb-20 text-center">Information</h2>
                    <p className="pb-40 text-center">
                      Reach out to us for any questions, partnerships, or just to say hi!
                    </p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="box-icon-item">
                    <img src="assets/images/box-icon/address.png" alt="address icon" />
                    <div className="title"><a href="#">Office Address</a></div>
                    <p>Flat No. 5B, Lotus Apartments, North Usman Road, T. Nagar, Chennai – 600017, Tamil Nadu</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="box-icon-item">
                    <img src="assets/images/box-icon/email.png" alt="email icon" />
                    <div className="title"><a href="#">Email</a></div>
                    <p>vighnesh2504@gmail.com<br />aryasimlot165@gmail.com</p>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="box-icon-item">
                    <img src="assets/images/box-icon/phone.png" alt="phone icon" />
                    <div className="title"><a href="#">Phone Number</a></div>
                    <p>+91 91500 12345<br />+91 63829 98765</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="tf-section-2 widget-box-icon">
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="heading-section-1">
                    <h2 className="tf-title pb-20 text-center">Contact Us</h2>
                    <p className="pb-40 text-center">
                      Have a question or proposal? Don’t hesitate to drop us a message!
                    </p>
                  </div>
                </div>

                <div className="col-12">
                  <form
                    id="commentform"
                    className="comment-form"
                    onSubmit={handleSubmit}
                  >
                    <div className="flex gap30">
                      <fieldset className="name">
                        <input
                          className="style-1"
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Your name*"
                          required
                        />
                      </fieldset>
                      <fieldset className="email">
                        <input
                          className="style-1"
                          type="email"
                          id="email"
                          placeholder="Email address*"
                          name="email"
                          required
                        />
                      </fieldset>
                      <fieldset className="subject">
                        <input
                          className="style-1"
                          type="text"
                          id="subject"
                          placeholder="Subject"
                          name="subject"
                        />
                      </fieldset>
                    </div>

                    <fieldset className="message">
                      <textarea
                        className="style-1"
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Your message*"
                        required
                      />
                    </fieldset>

                    <div className="btn-submit">
                      <button
                        className="tf-button style-1"
                        type="submit"
                        disabled={state.submitting}
                      >
                        Send Message <FaExternalLinkAlt />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
      <Mouse />
    </>
  );
};

export default ContactUs;
