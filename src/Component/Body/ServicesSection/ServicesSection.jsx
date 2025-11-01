import React, { useState } from "react";
import "./ServicesSection.css";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  // Updated links to React Router paths
  const services = [
    {
      id: 1,
      icon: "fas fa-pencil-alt",
      title: "Logo Designing",
      description: "Crafting unique brand identities",
      link: "/services/logo-designing",
    },
    {
      id: 2,
      icon: "fas fa-video",
      title: "Video Editing",
      description: "Professional cinematic storytelling",
      link: "/services/video-editing",
    },
    {
      id: 3,
      icon: "fas fa-code",
      title: "Website Development",
      description: "Building powerful digital solutions",
      link: "/services/website-development",
    },
    {
      id: 4,
      icon: "fas fa-paint-brush",
      title: "Graphic Designing",
      description: "Visual concepts that inspire",
      link: "/services/graphic-designing",
    },
    {
      id: 5,
      icon: "fas fa-laptop",
      title: "Web Designing",
      description: "Beautiful & responsive interfaces",
      link: "/services/web-designing",
    },
    {
      id: 6,
      icon: "fas fa-mobile-alt",
      title: "App Development",
      description: "Innovative mobile experiences",
      link: "/services/app-development",
    },
  ];

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />

      <section className="services-section">
        <div className="container services-container">
          {/* Header */}
          <div className="services-header d-flex justify-content-between align-items-center flex-wrap mb-5 pb-3">
            <div className="header-content">
              <p className="services-subtitle">WHAT WE OFFER</p>
              <h1 className="services-title">Our Innovation Services</h1>
            </div>
            <Link
              to="/services"
              className={`view-all-btn ${
                hoveredId === "viewAll" ? "hovered" : ""
              }`}
              onMouseEnter={() => setHoveredId("viewAll")}
              onMouseLeave={() => setHoveredId(null)}
            >
              View all Services
              <i className="fa-solid fa-arrow-right ms-2"></i>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="row g-4">
            {services.map((service) => (
              <div key={service.id} className="col-12 col-sm-6 col-lg-4">
                <Link
                  to={service.link}
                  className={`service-card ${
                    hoveredId === service.id ? "hovered" : ""
                  }`}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  data-service-id={service.id}
                >
                  <div className="icon-wrapper">
                    <i className={service.icon}></i>
                  </div>

                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>

                  <div className="arrow-icon">
                    <i className="fas fa-arrow-right"></i>
                  </div>

                  <div className="gradient-border"></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
