import React, { useEffect } from "react";
import "./TestimonialsSection.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "CEO, DigitalHive",
    feedback:
      "Nexlume transformed our online presence! The website design is stunning, and their team maintained great communication throughout the project.",
    image:
      "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Founder, StyleNest",
    feedback:
      "They built a fast and responsive eCommerce platform for my brand — smooth process, clear updates, and incredible results!",
    image:
      "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Product Manager, CodeSpark",
    feedback:
      "The Nexlume team delivered a high-quality web app on time. I’m impressed by their professionalism and innovative approach.",
    image:
      "https://i.pravatar.cc/150?img=15",
  },
];

const TestimonialsSection = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".testimonial-card");
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="testimonials-section section-padding">
      <div className="container">
        <div className="sec-head text-center mb-60">
          <h6 className="sub-head mb-15">Testimonials</h6>
          <h2>What Our Clients Say</h2>
          <p className="section-desc">
            Hear from our happy clients who trusted Nexlume with their digital
            transformation.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-feedback">“{t.feedback}”</p>
              </div>
              <div className="testimonial-user">
                <img src={t.image} alt={t.name} />
                <div className="testimonial-info">
                  <h4>{t.name}</h4>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
