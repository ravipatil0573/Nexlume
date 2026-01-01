import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import API_BASE from "../../lib/api";


// ============================================
// PROJECTS SECTION - START
// ============================================

// Tech icon mapping for project tags (unchanged)
const techIcons = {
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  React:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  Firebase:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Vercel:
    "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
  "Socket.io":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  JavaScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "Motion.dev":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  "Framer Motion":
    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
};

// 👉 Backend base URL (set VITE_API_BASE in your frontend .env to override)


const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [, setActiveId] = useState(null); // keep setter only (fix)
  const refs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(Number(entry.target.dataset.id));
          }
        });
      },
      { threshold: 0.6 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="project-card"
      data-id={project.id}
      ref={(el) => (refs.current[project.id] = el)}
    >
      <div className="project-container">
        {/* Left side - Image with gradient background */}
        <div
          className="project-image-section"
          style={{ background: project.gradient }}
        >
          <div className="gradient-overlay"></div>

          {/* Floating description tag */}
          <div className="floating-description">
            <p className="description-text">
              {project?.subtitle?.split(".")[0]}
            </p>
            <div className="arrow-circle">→</div>
          </div>

          {/* Main image with rotation effect */}
          <div
            className={`image-wrapper ${isHovered ? "hovered" : ""}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Project image */}
            <div className="project-image-frame">
              <Link to={`/projects/${project.id}`} state={project}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Right side - Project details */}
        <div className="project-details">
          <div className="project-header">
            <div className="dot-indicator"></div>
            <h2 className="project-title">{project.title}</h2>
          </div>

          <p className="project-subtitle">{project.subtitle}</p>

          <ul className="project-features">
            {(project.description || []).map((point, idx) => (
              <li key={idx} className="feature-item">
                <span className="feature-icon">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="tech-tags">
            {(project.tags || []).map((tag, i) => (
              <span key={i} className="tech-tag">
                {techIcons[tag] && (
                  <img src={techIcons[tag]} alt={tag} className="tech-icon" />
                )}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${API_BASE}/api/projects`)
      .then((r) => r.json())
      .then((json) => {
        // backend returns { data: [...] }
        const list = Array.isArray(json) ? json : json.data || [];
        if (isMounted) setProjects(list);
      })
      .catch((e) => {
        console.error("Failed to load projects:", e);
        if (isMounted) setProjects([]);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="projects-section">
      <div className="projects-wrapper">
        <h1 className="main-heading">
          Curated <span className="gradient-text">Work</span>
        </h1>

        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
