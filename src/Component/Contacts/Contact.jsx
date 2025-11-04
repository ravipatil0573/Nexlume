import React, { useState, useEffect } from "react";
import "./Contact.css";

const defaultSocialLinks = [
  { id: "1", name: "X", iconSrc: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg", href: "https://www.instagram.com/nexlume" },
  { id: "2", name: "Instagram", iconSrc: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg", href: "https://www.instagram.com/nexlume" },
  { id: "3", name: "LinkedIn", iconSrc: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg", href: "https://www.linkedin.com/in/nexlume-co-463256384/" },
];



const ContactSection = ({
  title = "We can turn your dream project into reality",
  mainMessage = "Let's talk! 👋",
  contactEmail = "nexlume.co@gmail.com",
  socialLinks = defaultSocialLinks,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    socialMedia: "",
    budget: "",
    services: [],
    message: "",
  });

  // Auto detect country code based on browser locale
 useEffect(() => {
    const getCountryCode = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data && data.country_calling_code) {
          setFormData((prev) => ({
            ...prev,
            countryCode: data.country_calling_code,
          }));
        } else {
          setFormData((prev) => ({ ...prev, countryCode: "+91" }));
        }
      } catch (error) {
        console.error("Error detecting country code:", error);
        setFormData((prev) => ({ ...prev, countryCode: "+91" }));
      }
    };

    getCountryCode();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service, checked) => {
    setFormData((prev) => {
      const updated = checked
        ? [...prev.services, service]
        : prev.services.filter((s) => s !== service);
      return { ...prev, services: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    if (onSubmit) onSubmit(formData);
  };

  const serviceOptions = [
    "Website",
    "Mobile App",
    "Web App",
    "E-Commerce",
    "Brand Identity",
    "SEO",
    "Social Media Marketing",
    "Brand Strategy & Consulting",
    "Other",
  ];

  const budgetOptions = [
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹15,000",
    "₹15,000 - ₹20,000",
  ];

  return (
    <section className="contact-section">
      <div className="bubble-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="bubble"></div>
        ))}
      </div>

      <div className="contact-content">
        <div className="contact-grid">
          <div className="contact-left">
            <h1 className="contact-title">{title}</h1>
          </div>

          <div className="contact-form-container">
            <h2 className="contact-heading">{mainMessage}</h2>

            <div className="contact-info">
              <p>Mail us at</p>
              <a href={`mailto:${contactEmail}`} className="contact-email">
                {contactEmail}
              </a>
              <div className="contact-socials">
                <span>OR</span>
                {socialLinks.map((link) => (
                  <a key={link.id} href={link.href} className="social-link">
                    <img src={link.iconSrc} alt={link.name} />
                  </a>
                ))}
              </div>
            </div>

            <hr />

            <form onSubmit={handleSubmit} className="contact-form">
              <p>Fill out your details below 👇</p>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    name="businessName"
                    placeholder="Your company or brand name"
                    value={formData.businessName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                 <div className="form-group">
            <label>Phone Number</label>
            <div className="phone-input">
              <span className="country-code">{formData.countryCode}</span>
              <input
                name="phone"
                type="tel"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
              </div>

              </div>

              <div className="form-group">
                <label>Social Media (Optional)</label>
                <input
                  name="socialMedia"
                  placeholder="@yourhandle or profile link"
                  value={formData.socialMedia}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select your budget</option>
                  {budgetOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div className="project-options">
                <p>What services are you interested in?</p>
                <div className="options-grid">
                  {serviceOptions.map((service) => (
                    <div key={service} className="option-item">
                      <input
                        type="checkbox"
                        id={service.replace(/\s/g, "-").toLowerCase()}
                        checked={formData.services.includes(service)}
                        onChange={(e) =>
                          handleCheckboxChange(service, e.target.checked)
                        }
                      />
                      <label htmlFor={service.replace(/\s/g, "-").toLowerCase()}>
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Briefly describe your project idea...</label>
                <textarea
                  name="message"
                  placeholder="Write your idea or requirement..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
