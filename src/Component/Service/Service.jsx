import React, { useState } from "react";
import "./Services.css";
import FAQ from "../../assets/service/faq.png";
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

function MenuItem({ link, text, imageType }) {
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

  // Professional SVG-based icons for software agency portfolio
  const getCreativeIcon = (type) => {
    const icons = {
      "Website Development": (
        <svg viewBox="0 0 100 100" className="creative-icon">
          <defs>
            <linearGradient id="webdevGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#667eea", stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: "#764ba2", stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="webdevGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: "#667eea", stopOpacity: 0.3}} />
              <stop offset="100%" style={{stopColor: "#764ba2", stopOpacity: 0.3}} />
            </linearGradient>
          </defs>
          {/* Browser Window - Professional */}
          <rect x="10" y="18" width="80" height="64" rx="4" fill="url(#webdevGrad)" opacity="0.95"/>
          <rect x="10" y="18" width="80" height="64" rx="4" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
          {/* Browser Header Bar */}
          <rect x="10" y="18" width="80" height="14" rx="4" fill="rgba(255,255,255,0.15)"/>
          {/* Navigation Dots - Minimal */}
          <circle cx="20" cy="25" r="2.5" fill="rgba(255,255,255,0.8)"/>
          <circle cx="28" cy="25" r="2.5" fill="rgba(255,255,255,0.6)"/>
          <circle cx="36" cy="25" r="2.5" fill="rgba(255,255,255,0.6)"/>
          {/* Code Structure - Professional */}
          <rect x="18" y="38" width="64" height="3" rx="1.5" fill="rgba(255,255,255,0.7)"/>
          <rect x="18" y="46" width="48" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
          <rect x="18" y="54" width="56" height="3" rx="1.5" fill="rgba(255,255,255,0.6)"/>
          <rect x="18" y="62" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.4)"/>
          <rect x="18" y="70" width="52" height="3" rx="1.5" fill="rgba(255,255,255,0.5)"/>
        </svg>
      ),
      "Web Design": (
        <svg viewBox="0 0 100 100" className="creative-icon">
          <defs>
            <linearGradient id="designGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#fa709a", stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: "#fee140", stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="designGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#30cfd0", stopOpacity: 0.6}} />
              <stop offset="100%" style={{stopColor: "#330867", stopOpacity: 0.6}} />
            </linearGradient>
          </defs>
          {/* Design Canvas - Professional */}
          <rect x="15" y="15" width="70" height="70" rx="6" fill="url(#designGrad)" opacity="0.95"/>
          <rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
          {/* Grid Layout Structure */}
          <line x1="30" y1="30" x2="30" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <line x1="50" y1="30" x2="50" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <line x1="70" y1="30" x2="70" y2="80" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <line x1="15" y1="45" x2="85" y2="45" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          <line x1="15" y1="60" x2="85" y2="60" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
          {/* Design Elements - Geometric */}
          <rect x="35" y="35" width="12" height="8" rx="2" fill="rgba(255,255,255,0.6)"/>
          <rect x="55" y="35" width="12" height="8" rx="2" fill="rgba(255,255,255,0.5)"/>
          <rect x="35" y="50" width="32" height="8" rx="2" fill="rgba(255,255,255,0.4)"/>
          <rect x="35" y="65" width="20" height="8" rx="2" fill="rgba(255,255,255,0.5)"/>
        </svg>
      ),
      "Android Development": (
        <svg viewBox="0 0 100 100" className="creative-icon">
          <defs>
            <linearGradient id="androidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#3ddc84", stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: "#2ecc71", stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="androidGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#1a1a1a", stopOpacity: 0.9}} />
              <stop offset="100%" style={{stopColor: "#2d2d2d", stopOpacity: 0.9}} />
            </linearGradient>
          </defs>
          {/* Phone Body - Professional */}
          <rect x="25" y="20" width="50" height="60" rx="6" fill="url(#androidGrad)" opacity="0.95"/>
          <rect x="25" y="20" width="50" height="60" rx="6" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
          {/* Screen */}
          <rect x="30" y="28" width="40" height="44" rx="3" fill="url(#androidGrad2)"/>
          {/* Status Bar */}
          <rect x="30" y="28" width="40" height="4" rx="3" fill="rgba(255,255,255,0.2)"/>
          {/* App Icons Grid - Professional */}
          <rect x="35" y="38" width="8" height="8" rx="1.5" fill="rgba(61,220,132,0.6)"/>
          <rect x="46" y="38" width="8" height="8" rx="1.5" fill="rgba(61,220,132,0.5)"/>
          <rect x="57" y="38" width="8" height="8" rx="1.5" fill="rgba(61,220,132,0.4)"/>
          <rect x="35" y="50" width="8" height="8" rx="1.5" fill="rgba(61,220,132,0.5)"/>
          <rect x="46" y="50" width="8" height="8" rx="1.5" fill="rgba(61,220,132,0.4)"/>
          <rect x="57" y="50" width="8" height="8" rx="1.5" fill="rgba(61,220,132,0.3)"/>
          {/* Navigation Bar */}
          <rect x="30" y="66" width="40" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
        </svg>
      ),
      "Logo Design": (
        <svg viewBox="0 0 100 100" className="creative-icon">
          <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#f59e0b", stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: "#ef4444", stopOpacity: 1}} />
            </linearGradient>
            <linearGradient id="logoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: "#667eea", stopOpacity: 0.8}} />
              <stop offset="100%" style={{stopColor: "#764ba2", stopOpacity: 0.8}} />
            </linearGradient>
          </defs>
          {/* Main Logo Mark - Professional */}
          <circle cx="50" cy="38" r="16" fill="url(#logoGrad)" opacity="0.95"/>
          <circle cx="50" cy="38" r="16" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"/>
          {/* Letter "L" - Clean Typography */}
          <path d="M 42 30 L 42 46 L 58 46" stroke="rgba(255,255,255,0.95)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Brand Identity Elements - Professional */}
          <rect x="30" y="58" width="40" height="3" rx="1.5" fill="url(#logoGrad2)"/>
          <rect x="35" y="66" width="30" height="2.5" rx="1.25" fill="url(#logoGrad2)" opacity="0.8"/>
          <rect x="40" y="73" width="20" height="2" rx="1" fill="url(#logoGrad2)" opacity="0.6"/>
        </svg>
      ),
    };
    return icons[type] || icons["Website Development"];
  };

  const repeatedMarqueeContent = Array.from({ length: 4 }).map((_, idx) => (
    <React.Fragment key={idx}>
      <span>{text}</span>
      <div className={`marquee__img marquee__img--${imageType}`}>
        {getCreativeIcon(text)}
      </div>
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

  // Demo items for FlowingMenu with creative icon types
  const demoItems = [
    {
      link: "#",
      text: "Website Development",
      imageType: "webdev", // Creative icon type
    },
    {
      link: "#",
      text: "Web Design",
      imageType: "webdesign", // Creative icon type
    },
    {
      link: "#",
      text: "Android Development",
      imageType: "android", // Creative icon type
    },
    {
      link: "#",
      text: "Logo Design",
      imageType: "logo", // Creative icon type
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
            <div className="why-card" data-aos="fade-up" data-aos-delay="0">
              <div className="why-card-inner">
                <div className="why-icon-wrapper">
                  <div className="why-icon">🚀</div>
                  <div className="why-icon-bg"></div>
                </div>
                <h3>Fast Delivery</h3>
                <p>Projects delivered quickly without compromising on quality.</p>
                <div className="why-card-hover-effect"></div>
              </div>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="100">
              <div className="why-card-inner">
                <div className="why-icon-wrapper">
                  <div className="why-icon">🎯</div>
                  <div className="why-icon-bg"></div>
                </div>
                <h3>Tailored Solutions</h3>
                <p>Every service is customized to your business objectives.</p>
                <div className="why-card-hover-effect"></div>
              </div>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="200">
              <div className="why-card-inner">
                <div className="why-icon-wrapper">
                  <div className="why-icon">🛠️</div>
                  <div className="why-icon-bg"></div>
                </div>
                <h3>Full Support</h3>
                <p>We provide ongoing maintenance and post-launch support.</p>
                <div className="why-card-hover-effect"></div>
              </div>
            </div>
            <div className="why-card" data-aos="fade-up" data-aos-delay="300">
              <div className="why-card-inner">
                <div className="why-icon-wrapper">
                  <div className="why-icon">✨</div>
                  <div className="why-icon-bg"></div>
                </div>
                <h3>Modern Design</h3>
                <p>Clean, user-friendly interfaces that drive engagement.</p>
                <div className="why-card-hover-effect"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
