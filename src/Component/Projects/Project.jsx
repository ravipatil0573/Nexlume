import React, { useEffect, useState, useRef} from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import OrbitingSkillsBanner from "./OrbitingSkillsBanner";

// Import your images
import Project1 from "../../assets/projects/mockups.jpg";
import Project2 from "../../assets/projects/nexshow-project_rDFMdLC.jpg";
import Project3 from "../../assets/projects/Safarnama.jpg";
import Project4 from "../../assets/projects/stylora-project_hagU2an.jpg";

// ============================================
// PROJECTS SECTION - START
// ============================================

// Tech icon mapping for project tags
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

// Projects Data
const projects = [
  {
    id: 1,
    title: "Next Ventures",
    subtitle:
      "A platform designed for early-stage entrepreneurs to pitch, browse, and engage with startup ideas. It's built to impress both users and investors with blazing speed, compelling visuals, and a modern tech stack.",
    description: [
      "Leveraged Partial Prerendering and After for faster loading.",
      "Simplified idea submission with a clean, intuitive design.",
      "Enhanced browsing with seamless performance optimization.",
    ],
    image: Project1,
    gradient: "linear-gradient(135deg, #ff0077, #ff4dc4)",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "Motion.dev",
      "Sanity CMS",
      "Auth.js",
      "Markdown",
      "GROQ",
      "Sentry",
    ],
  },
  {
    id: 2,
    title: "CodeVerse",
    subtitle:
      "A collaborative platform for developers to share, learn, and grow through interactive coding sessions and challenges.",
    description: [
      "Real-time code sharing with live sessions.",
      "Gamified challenges with leaderboard integration.",
      "Enhanced collaboration using WebSockets and cloud storage.",
    ],
    image: Project2,
    gradient: "linear-gradient(135deg, #0077ff, #8a2be2)",
    tags: [
      "React",
      "Node.js",
      "Tailwind CSS",
      "Socket.io",
      "MongoDB",
      "Framer Motion",
      "Firebase",
    ],
  },
  {
    id: 3,
    title: "FluxLura Converter",
    subtitle:
      "A free online converter tool for seamless multimedia conversion. Effortlessly transform images, audio, and videos with a sleek, modern design.",
    description: [
      "Built with Next.js and optimized with Media.dev for file conversion.",
      "Leveraged FFmpeg for powerful media processing.",
      "Responsive and intuitive UI for a smooth user experience.",
    ],
    image: Project3,
    gradient: "linear-gradient(135deg, #00ffaa, #00ccff)",
    tags: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "TypeScript",
      "FFmpeg",
      "Node.js",
      "Vercel",
    ],
  },
  {
    id: 4,
    title: "AI StarForge",
    subtitle:
      "A sleek AI SaaS landing page with a user-friendly design that enhances engagement.",
    description: [
      "Optimized landing flow for high conversion rates.",
      "Integrated with OpenAI for dynamic chat experiences.",
      "Modern layout powered by Next.js and Framer Motion.",
    ],
    image: Project4,
    gradient: "linear-gradient(135deg, #ff6600, #ff0080)",
    tags: [
      "Next.js",
      "React",
      "Framer Motion",
      "Tailwind CSS",
      "OpenAI API",
      "TypeScript",
    ],
  },
];


const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
const [setActiveId] = useState(null);
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

    refs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="project-card">
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
              {project.subtitle.split('.')[0]}
            </p>
            <div className="arrow-circle">
              →
            </div>
          </div>

          {/* Main image with rotation effect */}
          <div 
            className={`image-wrapper ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            

            {/* Project image */}
            <div className="project-image-frame">
          <Link to={`/projects/${project.id}`} >
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
            <h2 className="project-title">
              {project.title}
            </h2>
          </div>

          <p className="project-subtitle">
            {project.subtitle}
          </p>

          <ul className="project-features">
            {project.description.map((point, idx) => (
              <li key={idx} className="feature-item">
                <span className="feature-icon">✦</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div className="tech-tags">
            {project.tags.map((tag, i) => (
              <span key={i} className="tech-tag">
                {techIcons[tag] && (
                  <img 
                    src={techIcons[tag]} 
                    alt={tag}
                    className="tech-icon"
                  />
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
  
  return (
    <div className="projects-section">
       <OrbitingSkillsBanner />
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