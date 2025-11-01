import React from "react";
import "./Contact.css";

const ContactSection = () => {
  // Simple Book Now button handler
  const bookNow = () => {
    alert("Thank you for your interest! We will contact you soon.");
  };

  return (
    <section className="custom-bg py-5" id="contact">
      <div className="container">
        <div className="mb-4 text-center">
          <h2 className="custom-heading position-relative d-inline-block">
            <span className="left-line"></span>
            CONNECT WITH US
          </h2>
        </div>
        <div className="d-flex flex-column-reverse flex-md-row justify-content-between align-items-stretch">
          {/* Left Side Text */}
          <div className="flex-fill p-4 p-md-5 left-side-text">
            <h2 className="message">
              Great websites <br /> begin with a conversation
            </h2>
            <p>Reach out, and let’s craft a smarter web together with Nexlume.</p>
            <p className="mt-4 fs-5">
              Contact us at: <br />
              <a href="mailto:nexlume.co@gmail.com" className="text-decoration-none ">
                nexlume.co@gmail.com
              </a>
            </p>
            <div className="button-container mt-3">
              <button
                className="btn btn-warning book-now-button" 
                onClick={bookNow}
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Right Side Form */}
          <div
            className="card flex-fill p-4 p-md-5 mx-md-4"
            style={{ maxWidth: "480px" }}
          >
            <h2
              className="mb-4 text-center fw-semibold"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "3px" }}
            >
              SEND US A MESSAGE
            </h2>
            <form>
              {/* Your Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Your name"
                  required
                />
              </div>
              {/* Organization */}
              <div className="mb-3">
                <label htmlFor="organization" className="form-label">
                  Your Organization <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  id="organization"
                  name="organization"
                  className="form-control"
                  placeholder="Your organization name"
                  required
                />
              </div>
              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email <span className="text-danger">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Your email address"
                  required
                />
              </div>
              {/* Contact */}
              <div className="mb-3">
                <label htmlFor="contact" className="form-label">
                  Your Contact <span className="text-danger">*</span>
                </label>
                <input
                  type="tel"
                  id="contact"
                  name="contact"
                  className="form-control"
                  placeholder="Your contact number"
                  required
                />
              </div>
              {/* Services */}
              <fieldset className="mb-3">
                <legend className="form-label">
                  What Services are you interested in?{" "}
                  <span className="text-danger">*</span>
                </legend>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="logoDesign"
                    value="Logo Designing"
                    name="services"
                  />
                  <label className="form-check-label" htmlFor="logoDesign">
                    Logo Designing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="webDesign"
                    value="Web Designing"
                    name="services"
                  />
                  <label className="form-check-label" htmlFor="webDesign">
                    Website Designing
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="webDev"
                    value="Web Development"
                    name="services"
                  />
                  <label className="form-check-label" htmlFor="webDev">
                    Website Development
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="appDev"
                    value="App Development"
                    name="services"
                  />
                  <label className="form-check-label" htmlFor="appDev">
                    Android Development
                  </label>
                </div>
              </fieldset>
              {/* Investment */}
              <div className="mb-3">
                <label htmlFor="investment" className="form-label">
                  How much are you looking to invest?{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  id="investment"
                  name="investment"
                  className="form-select"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="30k-40k">₹30,000 - ₹40,000</option>
                  <option value="40k-50k">₹40,000 - ₹50,000</option>
                  <option value="50k+">More than ₹50,000</option>
                </select>
              </div>
              {/* Source */}
              <div className="mb-4">
                <label htmlFor="source" className="form-label">
                  How did you hear about us?{" "}
                  <span className="text-danger">*</span>
                </label>
                <select
                  id="source"
                  name="source"
                  className="form-select"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option value="Instagram">Instagram</option>
                  <option value="Facebook">X</option>
                  <option value="LinkedIn">LinkedIn</option>
                </select>
              </div>
              {/* Submit */}
              <div className="text-center">
                <button type="submit" className="btn btn-primary px-5">
                  Let's Connect
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
