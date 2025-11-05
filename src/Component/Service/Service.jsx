import React, { useState } from "react";
import "./Services.css";
import FAQ from "../../assets/service/faq.png";
import webDev from "../../assets/service/webdev.png";
import webDesign from "../../assets/service/webdes.png";
import android from "../../assets/service/android.png";
import logo from "../../assets/service/logo.png";
import { gsap } from "gsap";
import "./FlowingMenu.css"; // Make sure this file exists

// ================= FlowingMenu Component =================
function FlowingMenu({ items = [] }) {
  return (
    <div className="menu-wrap">
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const itemRef = React.useRef(null);
  const marqueeRef = React.useRef(null);
  const marqueeInnerRef = React.useRef(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const distMetric = (x, y, x2, y2) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mouseX, mouseY, width, height) => {
    const topEdgeDist = distMetric(mouseX, mouseY, width / 2, 0);
    const bottomEdgeDist = distMetric(mouseX, mouseY, width / 2, height);
    return topEdgeDist < bottomEdgeDist ? "top" : "bottom";
  };

  const handleMouseEnter = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const handleMouseLeave = (ev) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const edge = findClosestEdge(x, y, rect.width, rect.height);

    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div
        className="marquee__img"
        style={{ backgroundImage: `url(${image})` }}
      />
    </React.Fragment>
  ));

  return (
    <div className="menu__item" ref={itemRef}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef}>
        <div className="marquee__inner-wrap" ref={marqueeInnerRef}>
          <div className="marquee__inner" aria-hidden="true">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= Main Services Page =================
const Services = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (id) => setOpenFaq(openFaq === id ? null : id);

  // Demo items for FlowingMenu (replace images or links as needed)
  const demoItems = [
    {
      link: "#",
      text: "Website Development",
      image: webDev,
    },
    {
      link: "#",
      text: "Web Design",
      image: webDesign,
    },
    {
      link: "#",
      text: "Android Development",
      image: android,
    },
    {
      link: "#",
      text: "Logo Design",
      image: logo,
    },
  ];

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

  return (
    <>
      {/* Header */}
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

      {/* Flowing Services Menu */}
      <section className="main-container">
        <h2 className="header">What We Offer</h2>
        <div style={{ height: "600px", position: "relative" }}>
          <FlowingMenu items={demoItems} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faqs-pg section-padding">
        <div className="container">
          <div className="row lg-marg align-items-center">
            <div className="col-lg-5">
              <div className="fit-img img-to-animate">
                <img src={FAQ} alt="FAQs" />
              </div>
            </div>
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
