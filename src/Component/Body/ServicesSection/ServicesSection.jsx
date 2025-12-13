import React from "react";
import { Link } from "react-router-dom";

const ServicesSection = () => {
  // Gradients for each service card
  const getGradient = (id) => {
    switch (id) {
      case 1:
        return "group-hover:from-[#667eea] group-hover:to-[#764ba2]";
      case 2:
        return "group-hover:from-[#f093fb] group-hover:to-[#f5576c]";
      case 3:
        return "group-hover:from-[#4facfe] group-hover:to-[#00f2fe]";
      case 4:
        return "group-hover:from-[#43e97b] group-hover:to-[#38f9d7]";
      case 5:
        return "group-hover:from-[#fa709a] group-hover:to-[#fee140]";
      case 6:
        return "group-hover:from-[#30cfd0] group-hover:to-[#330867]";
      default:
        return "group-hover:from-blue-500 group-hover:to-purple-500";
    }
  };

  const getBorderGradient = (id) => {
    switch (id) {
      case 1:
        return "from-[#667eea] to-[#764ba2]";
      case 2:
        return "from-[#f093fb] to-[#f5576c]";
      case 3:
        return "from-[#4facfe] to-[#00f2fe]";
      case 4:
        return "from-[#43e97b] to-[#38f9d7]";
      case 5:
        return "from-[#fa709a] to-[#fee140]";
      case 6:
        return "from-[#30cfd0] to-[#330867]";
      default:
        return "from-blue-500 to-purple-500";
    }
  };

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

      <section className="relative min-h-screen py-20 overflow-hidden bg-bg-primary font-primary">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between mb-12 pb-3 border-b border-white/10 text-center md:text-left">
            <div className="w-full md:w-auto mb-6 md:mb-0">
              <p className="mb-2 text-sm font-semibold tracking-[2px] text-text-muted uppercase">
                WHAT WE OFFER
              </p>
              <h1 className="mb-0 text-3xl sm:text-4xl md:text-5xl font-bold font-heading bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Our Innovation Services
              </h1>
            </div>
            <Link
              to="/services"
              className="group inline-flex items-center justify-center w-full md:w-auto px-7 py-3 text-base font-medium text-text-primary bg-transparent border-2 border-red-500/50 rounded-full transition-all duration-300 hover:bg-[#C80000] hover:text-white hover:border-[#C80000] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(200,0,0,0.3)] no-underline"
            >
              View all Services
              <i className="fa-solid fa-arrow-right ms-2 transition-transform duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                to={service.link}
                className="group relative block h-full min-h-[280px] p-8 overflow-hidden text-left no-underline transition-all duration-300 bg-white/5 backdrop-blur-md border border-[#C80000]/50 rounded-3xl hover:-translate-y-2 hover:bg-white/10 hover:shadow-2xl"
              >
                {/* Icon Wrapper */}
                <div
                  className={`relative z-10 flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white/5 rounded-2xl bg-gradient-to-br ${getGradient(
                    service.id
                  )}`}
                >
                  <i
                    className={`${service.icon} text-3xl text-text-primary transition-transform duration-300`}
                  ></i>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="mb-3 text-2xl font-semibold font-heading text-text-primary transition-colors duration-300 group-hover:text-[#C80000]">
                    {service.title}
                  </h3>
                  <p className="m-0 text-base leading-relaxed text-text-muted transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="absolute bottom-8 right-8 z-10 flex items-center justify-center w-10 h-10 text-base text-white transition-all duration-300 transform translate-y-2 -translate-x-2 opacity-0 bg-[#C80000] rounded-full group-hover:translate-y-0 group-hover:translate-x-0 group-hover:opacity-100">
                  <i className="fas fa-arrow-right"></i>
                </div>

                {/* Gradient Border Overlay */}
                <div
                  className={`absolute inset-0 p-[2px] rounded-3xl pointer-events-none opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${getBorderGradient(
                    service.id
                  )}`}
                  style={{
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                  }}
                ></div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesSection;
