import React, { useEffect, useState } from "react";
import "./Services.css";
import FAQ from "../../assets/service/faq.png"; // replace with your FAQ image path

const Services = () => {
  // Services data
  const services = [
    {
      id: 1,
      number: "001",
      title: "Website Development",
      description:
        "Bespoke websites designed to fit your business with modern features.",
    },
    {
      id: 2,
      number: "002",
      title: "Web Design",
      description:
        "Custom website designs that reflect your brand with a modern touch.",
    },
    {
      id: 3,
      number: "003",
      title: "Android Development",
      description:
        "Develop intuitive, high-performance Android apps to boost your mobile presence.",
    },
    {
      id: 4,
      number: "004",
      title: "Logo Design",
      description:
        "Crafting impactful logos that embody your brand's identity and vision.",
    },
  ];

  // FAQs data
  const faqs = [
    {
      id: 1,
      question: "Why choose Nexlume?",
      answer:
        "With Nexlume, you gain a skilled, multi-disciplinary team specializing in web, software, app development, and branding—delivering top-quality solutions without the cost of full-time hires.",
    },
    {
      id: 2,
      question: "How fast can we deliver?",
      answer:
        "Websites: 7-14 days, Android Apps: 3-6 weeks, Logos: 2-3 days. We balance speed and quality for exceptional results.",
    },
    {
      id: 3,
      question: "How do you track progress?",
      answer:
        "We provide regular updates via email, project management tools, or scheduled meetings, ensuring full transparency at every stage.",
    },
    {
      id: 4,
      question: "How to request a project?",
      answer:
        "Simply contact us via our website or email, share your requirements, and receive a custom proposal and timeline.",
    },
  ];

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  // Animate Why Choose Us cards
const whyCards = document.querySelectorAll(".why-card");
const observerWhy = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
whyCards.forEach((card) => observerWhy.observe(card));

  useEffect(() => {
    // Animate service items
    const items = document.querySelectorAll(".service-item");
    const observerItems = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(items).indexOf(entry.target);
            entry.target.classList.add(
              index % 2 === 0
                ? "animate-left-to-right"
                : "animate-right-to-left"
            );
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    items.forEach((item) => observerItems.observe(item));

    // Animate FAQ image
    const imgElement = document.querySelector(".img-to-animate");
    if (imgElement) {
      const observerImg = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.animation =
                "img-anim-left 1.3s forwards cubic-bezier(0.645, 0.045, 0.355, 1)";
              entry.target.style.opacity = "1";
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      observerImg.observe(imgElement);
    }
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="full-screen-container">
        <div className="header">
          <h1>Discover Our Expertise</h1>
          <p>
            At Nexlume, we pride ourselves on our commitment to <br />
            <span className="highlight">
              Excellence, Creativity, and Timely delivery
            </span>
            <br />
            Let us help you build a strong online presence that sets your brand
            apart.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <section className="main-container">
        <h2 className="header">What We Offer</h2>
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6">
                <div className="row d-flex align-items-center">
                  <div className="col-md-4">
                    <span className="numb">{service.number}</span>
                  </div>
                  <div className="col-md-8">
                    <p>{service.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <h2>{service.title}</h2>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      <section className="faqs-pg section-padding">
        <div className="container">
          <div className="row lg-marg align-items-center">
            {/* Left Image */}
            <div className="col-lg-5">
              <div className="fit-img img-to-animate">
                <img src={FAQ} alt="FAQs" />
              </div>
            </div>

            {/* Right FAQ */}
            <div className="col-lg-7">
              <div className="sec-head mb-60">
                <h6 className="sub-head mb-15">Questions & Answers</h6>
                <h2>Providing clarity on frequently asked questions</h2>
              </div>

              <div className="faq-list">
                {faqs.map((faq) => (
                  <div key={faq.id} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => toggleFaq(faq.id)}
                    >
                      {faq.question}
                      <span className="faq-icon">
                        {openFaq === faq.id ? "–" : "+"}
                      </span>
                    </button>
                    <div
                      className={`faq-answer ${
                        openFaq === faq.id ? "show" : ""
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

 {/* Why Choose Us Section */}
<section className="why-choose-us section-padding">
  <div className="container">
    <div className="sec-head mb-60 text-center">
      <h6 className="sub-head mb-15">Why Choose Nexlume?</h6>
      <h2>Your Vision, Our Commitment to Excellence</h2>
    </div>

    <div className="why-grid">
      <div className="why-card">
        <div className="why-icon">🚀</div>
        <h3>Fast Delivery</h3>
        <p>Projects delivered quickly without compromising on quality.</p>
      </div>
      <div className="why-card">
        <div className="why-icon">🎯</div>
        <h3>Tailored Solutions</h3>
        <p>Every service is customized to your business objectives.</p>
      </div>
      <div className="why-card">
        <div className="why-icon">🛠️</div>
        <h3>Full Support</h3>
        <p>We provide ongoing maintenance and post-launch support.</p>
      </div>
      <div className="why-card">
        <div className="why-icon">✨</div>
        <h3>Modern Design</h3>
        <p>Clean, user-friendly interfaces that drive engagement.</p>
      </div>
    </div>
  </div>
</section>


    </>
  );
};

export default Services;
