// src/components/Hero.jsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Spotlight from "../../../../components/ui/Spotlight";
import SplineSceneBasic from "../../../../components/ui/SplineSceneBasic";

export default function Hero() {
  const splineUrl =
    "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

  // 🪄 Headings + Paragraphs
  const content = [
    {
      title: "Where design meets innovation",
      text: "Power your brand with a sleek, dark aesthetic and vibrant digital storytelling.",
    },
    {
      title: "Build experiences that feel alive",
      text: "Deliver seamless interactions and bold visuals that leave a lasting impression.",
    },
    {
      title: "Crafting digital brilliance",
      text: "Turning ideas into elegant, high-performance digital experiences with Nexlume.",
    },
    {
      title: "Nexlume brings your vision to life",
      text: "Design, build, and launch stunning digital experiences — faster than ever before.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // ⏳ Rotate every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.length]);

  const current = content[currentIndex];

  return (
    <section className="position-relative  min-vh-100 d-flex align-items-center bg-black text-white overflow-hidden">
      {/* Spotlight Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <Spotlight />
      </div>

      <div className="container position-relative">
        <div className="row g-4 align-items-center">
          {/* Left Content */}
          <div className="col-12 col-lg-6 mt-5 mt-md-5 mt-lg-0">
            <div className="mb-4">
              <AnimatePresence mode="wait">
    <motion.div
      key={current.title} // unique key per slide
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
    >
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight h-[80px] flex items-center justify-center md:justify-start">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff0000] via-[#ff6a00] to-[#ff1100] inline-block">
          {current.title}
        </span>
      </h1>

      {/* Paragraph */}
      <p className="mt-5 text-white/70 text-base md:text-lg text-center md:text-left">
        {current.text}
      </p>
    </motion.div>
  </AnimatePresence>
            </div>

            {/* Buttons */}
            <div className="d-flex flex-wrap gap-3">
              <motion.a
                href="#get-started"
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 0 24px rgba(255, 5, 5, 0.7)",
                }}
                whileTap={{ scale: 0.98 }}
                className="btn btn-primary btn-lg fw-semibold rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 btn-glow"
                style={{
                  background:
                    "linear-gradient(90deg, rgb(255, 30, 0) 0%, hsl(25, 100%, 50%) 100%)",
                  border: "none",
                }}
              >
                <ArrowRight size={20} />
                Get started
              </motion.a>

              <a
                className="btn btn-outline-light btn-lg fw-semibold rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2"
                href="#learn-more"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Right: 3D */}
          <div className="col-12 col-lg-6">
            <div className="position-relative">
              <SplineSceneBasic sceneUrl={splineUrl} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
