import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Project.css";
import API from "../../lib/api";


// ============================================
// PROJECTS SECTION - START
// ============================================

// Tech icon mapping for project tags - Comprehensive technology logos
const techIcons = {
  // JavaScript & TypeScript
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TypeScript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  
  // Frontend Frameworks
  React: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  Vue: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
  Angular: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
  Svelte: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg",
  
  // CSS Frameworks
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  Bootstrap: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
  "Material-UI": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg",
  Sass: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  Less: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/less/less-plain-wordmark.svg",
  CSS3: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  HTML5: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  
  // Backend & Runtime
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Node: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  NodeJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  Express: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  NestJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-plain.svg",
  "ASP.NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  ASPNET: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  ".NET": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  DotNet: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg",
  
  // Databases
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  MySQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  Postgres: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  SQLite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg",
  "SQL Server": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  SQLServer: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  MSSQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  Firebase: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
  Supabase: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/supabase.svg",
  
  // Cloud & Hosting
  Vercel: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  Azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  Heroku: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg",
  Netlify: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg",
  Docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  Kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  
  // Tools & Libraries
  "Socket.io": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  SocketIO: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  "Framer Motion": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  "Motion.dev": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  GraphQL: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  REST: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  "REST API": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  RestAPI: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  RESTful: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  API: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  Swagger: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/swagger.svg",
  Redux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  Zustand: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/zustand.svg",
  GSAP: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/gsap.svg",
  ThreeJS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  "Three.js": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  
  // Programming Languages
  Python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  C: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  Go: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
  Rust: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
  Ruby: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
  Swift: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
  Kotlin: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
  Dart: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  
  // Mobile Development
  ReactNative: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  Flutter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  Ionic: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg",
  
  // Testing
  Jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  Cypress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  Mocha: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mocha/mocha-plain.svg",
  
  // Build Tools
  Webpack: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  Vite: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg",
  Babel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/babel/babel-original.svg",
  Gulp: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gulp/gulp-plain.svg",
  
  // Version Control
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  GitLab: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg",
  Bitbucket: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bitbucket/bitbucket-original.svg",
  
  // Other Technologies
  Nginx: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  Apache: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apache/apache-original.svg",
  Linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  Ubuntu: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg",
  Windows: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg",
  
  // Design Tools
  Figma: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
  Adobe: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/adobe/adobe-original.svg",
  Photoshop: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",
  Illustrator: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",
  
  // Common Variations & Abbreviations
  JS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  TS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "Responsive Design": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  Responsive: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "UI/UX": "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg",
  UI: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg",
  UX: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/figma.svg",
  Animations: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  Animation: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/framermotion/framermotion-original.svg",
  
  // Additional Technologies
  "Enterprise App": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Enterprise: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
  Spring: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  Django: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  Flask: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
  Laravel: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
  "React Native": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  RN: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
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
            {(project.tags || []).map((tag, i) => {
              // Clean and normalize tag for matching
              const cleanTag = tag.trim();
              
              // Try multiple matching strategies
              let iconUrl = techIcons[cleanTag]; // Exact match
              
              if (!iconUrl) {
                // Case-insensitive match
                const caseInsensitiveMatch = Object.keys(techIcons).find(
                  (key) => key.toLowerCase() === cleanTag.toLowerCase()
                );
                iconUrl = caseInsensitiveMatch ? techIcons[caseInsensitiveMatch] : null;
              }
              
              if (!iconUrl) {
                // Try with common variations (spaces, dots, etc.)
                const variations = [
                  cleanTag.replace(/\./g, ''),
                  cleanTag.replace(/\s+/g, ''),
                  cleanTag.replace(/\s+/g, '-'),
                  cleanTag.replace(/\s+/g, '.'),
                  cleanTag.replace(/\./g, '-'),
                ];
                
                for (const variant of variations) {
                  if (techIcons[variant]) {
                    iconUrl = techIcons[variant];
                    break;
                  }
                }
              }
              
              return (
                <span key={i} className="tech-tag">
                  {iconUrl ? (
                    <img 
                      src={iconUrl} 
                      alt={tag} 
                      className="tech-icon"
                      loading="lazy"
                      onError={(e) => {
                        // Hide icon if it fails to load and log for debugging
                        console.warn(`Icon failed to load for: ${tag}`, iconUrl);
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    // Optional: Add a generic icon placeholder or leave blank
                    null
                  )}
                  {tag}
                </span>
              );
            })}
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

  fetch(`${API.main}/api/projects`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((json) => {
      const list = Array.isArray(json) ? json : json.data || [];
      if (isMounted) setProjects(list);
    })
    .catch((e) => {
      console.error("❌ Failed to load projects:", e.message);
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
