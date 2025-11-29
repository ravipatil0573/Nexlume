import React, { useMemo, useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

// -------------------------------------------
// Config
// -------------------------------------------
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

// -------------------------------------------
// Utilities
// -------------------------------------------
const extractColorFromGradient = (g) => {
  if (!g) return "#060010";
  const m = g.match(/#([0-9a-f]{6})/i);
  return m ? `#${m[0].slice(1)}` : "#060010";
};

const loadGoogleFontIfNeeded = (family) => {
  if (!family) return;
  const encoded = family.replace(/\s+/g, "+");
  const id = `gf-${encoded}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@300..800&display=swap`;
  document.head.appendChild(link);
};

// Map backend payload to our in-page model, with fallbacks
const normalizeProject = (src = {}) => {
  const title = src.title || src.name || "Untitled Project";
  const subtitle = src.subtitle || src.overview || "";
  const features = Array.isArray(src.description) ? src.description : [];
  const techStack = Array.isArray(src.tags) ? src.tags : [];
  const screenshots = src.screenshots?.length
    ? src.screenshots
    : src.image
    ? [src.image]
    : [];
  const color = src.color || extractColorFromGradient(src.gradient);

  const typography = {
    headings: src.typography?.headings || "Poppins",
    body: src.typography?.body || "Inter",
    align: src.typography?.align || "left",
    google: "google" in (src.typography || {}) ? !!src.typography.google : true,
  };

  return {
    id: src.id ?? "unknown",
    slug: src.slug || String(src.id || ""),
    name: title,
    overview: subtitle,
    techStack,
    features,
    screenshots,
    palette: src.palette?.length
      ? src.palette
      : ["#060010", "#8400FF", "#00F0FF", "#FFFFFF"],
    typography,
    links: src.links || { demo: src.demo, repo: src.repo },
    role: src.role || "Developer",
    timeline: src.timeline || "",
    color,
    gradient: src.gradient,
  };
};

// -------------------------------------------
// Page Component
// -------------------------------------------
export default function ProjectDetails() {
  const { projectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const stateProject = location.state ? normalizeProject(location.state) : null;
  const [serverProject, setServerProject] = useState(null);
  const [loading, setLoading] = useState(!stateProject);

  // Refs for sections (must be declared before any early returns)
  const overviewRef = useRef(null);
  const featuresRef = useRef(null);
  const techStackRef = useRef(null);
  const challengesRef = useRef(null);
  const outcomeRef = useRef(null);

  // Active section state
  const [activeSection, setActiveSection] = useState("overview");

  // Navigation items
  const navItems = [
    { id: "overview", label: "Overview", ref: overviewRef },
    { id: "features", label: "Key Features", ref: featuresRef },
    { id: "tech-stack", label: "Tech Stack", ref: techStackRef },
    {
      id: "challenges",
      label: "Challenges & Learnings",
      ref: challengesRef,
      subItems: [
        { id: "adopting-tech", label: "Adopting the Tech Ecosystem" },
        { id: "real-time", label: "Real-Time Syncing" },
        { id: "authentication", label: "Authentication" },
        { id: "design-composition", label: "Design & Component Composition" },
      ],
    },
    { id: "outcome", label: "Outcome", ref: outcomeRef },
  ];

  const project = useMemo(
    () => serverProject || stateProject,
    [serverProject, stateProject]
  );

  // Load fonts when we know families
  useEffect(() => {
    const p = serverProject || stateProject;
    if (!p) return;
    if (p.typography?.google !== false) {
      loadGoogleFontIfNeeded(p.typography?.headings);
      loadGoogleFontIfNeeded(p.typography?.body);
    }
  }, [serverProject, stateProject]);

  // Fetch from backend by id or slug
  useEffect(() => {
    let isMounted = true;

    const tryFetch = async () => {
      try {
        const id = Number(projectId);
        const endpoint = Number.isFinite(id)
          ? `${API_BASE}/api/projects/${id}`
          : `${API_BASE}/api/projects/slug/${encodeURIComponent(projectId)}`;

        setLoading(true);
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!isMounted) return;
        setServerProject(normalizeProject(json));
      } catch {
        if (!isMounted) return;
        setServerProject(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    tryFetch();
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  // IntersectionObserver to track active section with improved threshold
  useEffect(() => {
    if (!project) return;

    const observers = [];
    const sectionRefs = [
      { id: "overview", ref: overviewRef },
      { id: "features", ref: featuresRef },
      { id: "tech-stack", ref: techStackRef },
      { id: "challenges", ref: challengesRef },
      { id: "outcome", ref: outcomeRef },
    ];

    sectionRefs.forEach(({ id, ref }) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.45) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-100px 0px -50% 0px",
          threshold: 0.45,
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [project]);

  // Smooth scroll handler
  const handleNavClick = (sectionId, ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setActiveSection(sectionId);
    }
  };

  if (loading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="text-center">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-light-50">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#0A0A0A" }}
      >
        <div className="text-center px-4">
          <h1
            className="text-white mb-3"
            style={{ fontSize: "2rem", fontWeight: 600 }}
          >
            Project Not Found
          </h1>
          <p className="text-white-50 mb-4" style={{ opacity: 0.8 }}>
            We couldn't find this project. Go back to the list and choose a
            project.
          </p>
          <button
            className="btn btn-outline-light px-4 py-2 rounded-pill"
            onClick={() => navigate(-1)}
            style={{
              borderColor: "rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
              e.target.style.backgroundColor = "transparent";
            }}
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const mainImage = project?.screenshots?.[0] || project?.image || "";
  const features = project?.features || [];
  const techStack = project?.techStack || [];

  return (
    <div
      style={{
        backgroundColor: "#0A0A0A",
        minHeight: "100vh",
        color: "#EDEDED",
        fontFamily: project?.typography?.body
          ? `"${project.typography.body}", system-ui, sans-serif`
          : "system-ui, sans-serif",
      }}
    >
      <div
        className="container-fluid px-4 px-lg-5"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        <div className="d-flex justify-content-between gap-5 position-relative">
          {/* Main Content */}
          <main style={{ flex: "1", maxWidth: "900px", width: "100%" }}>
            {/* Hero Section */}
            <section className="pt-20 pb-12">
              <div className="mb-6">
                <h1
                  className="mb-4"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: "#EDEDED",
                    fontFamily: project?.typography?.headings
                      ? `"${project.typography.headings}", system-ui, sans-serif`
                      : "system-ui, sans-serif",
                  }}
                >
                  {project.name || "Untitled Project"}
                </h1>
                <p
                  className="mb-5"
                  style={{
                    fontSize: "1.125rem",
                    color: "#A7A7A7",
                    lineHeight: 1.75,
                    maxWidth: "800px",
                  }}
                >
                  {project.overview ||
                    "A modern project built with cutting-edge technologies."}
                </p>

                {/* Tech Stack Badges */}
                {techStack.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    {techStack.slice(0, 8).map((tech, idx) => (
                      <span
                        key={idx}
                        className="badge px-3 py-2 rounded-pill"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          color: "#EDEDED",
                          fontSize: "0.875rem",
                          fontWeight: 400,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Role & Timeline */}
                {(project.role || project.timeline) && (
                  <div className="d-flex flex-wrap gap-3">
                    {project.role && (
                      <span
                        className="text-white-50"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <i className="bi bi-person me-2"></i>
                        {project.role}
                      </span>
                    )}
                    {project.timeline && (
                      <span
                        className="text-white-50"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <i className="bi bi-calendar me-2"></i>
                        {project.timeline}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Banner Preview Image */}
            {mainImage && (
              <section className="mb-12">
                <div
                  className="rounded-4 overflow-hidden position-relative"
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.02)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    boxShadow:
                      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 30px rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(4px)",
                    padding: "2px",
                  }}
                >
                  <div
                    className="rounded-4 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)",
                    }}
                  >
                    <img
                      src={mainImage}
                      alt={project.name}
                      className="w-100"
                      style={{
                        display: "block",
                        height: "auto",
                        maxHeight: "600px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Overview Section */}
            <section
              id="overview"
              ref={overviewRef}
              className="pt-20 pb-12"
              style={{ scrollMarginTop: "120px" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#EDEDED",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Overview
              </h2>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "#A7A7A7",
                  maxWidth: "900px",
                }}
              >
                {project.overview ||
                  `${project.name} is a comprehensive project that showcases modern web development practices. 
                  Built with attention to detail and user experience, it demonstrates proficiency in full-stack development 
                  and contemporary design principles.`}
              </p>
            </section>

            {/* Key Features */}
            {features.length > 0 && (
              <section
                id="features"
                ref={featuresRef}
                className="pt-20 pb-12"
                style={{ scrollMarginTop: "120px" }}
              >
                <h2
                  className="mb-6"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#EDEDED",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Key Features
                </h2>
                <div
                  className="row g-4"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {features.slice(0, 6).map((feature, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-3"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(4px)",
                        boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.03)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <div className="d-flex align-items-start">
                        <i
                          className="bi bi-check-circle-fill me-3 mt-1"
                          style={{
                            color: "#00F0FF",
                            fontSize: "1.25rem",
                            flexShrink: 0,
                          }}
                        ></i>
                        <p
                          className="mb-0"
                          style={{ color: "#EDEDED", lineHeight: 1.6 }}
                        >
                          {feature}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tech Stack */}
            {techStack.length > 0 && (
              <section
                id="tech-stack"
                ref={techStackRef}
                className="pt-20 pb-12"
                style={{ scrollMarginTop: "120px" }}
              >
                <h2
                  className="mb-6"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#EDEDED",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                    paddingBottom: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Tech Stack
                </h2>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {techStack.map((tech, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-3"
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(4px)",
                        boxShadow: "inset 0 0 30px rgba(255, 255, 255, 0.03)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.1)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.08)";
                      }}
                    >
                      <div className="d-flex align-items-center">
                        <div
                          className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            flexShrink: 0,
                          }}
                        >
                          <i
                            className="bi bi-code-slash"
                            style={{ color: "#00F0FF" }}
                          ></i>
                        </div>
                        <div>
                          <h6
                            className="mb-1"
                            style={{
                              color: "#EDEDED",
                              fontWeight: 600,
                              fontSize: "1rem",
                            }}
                          >
                            {tech}
                          </h6>
                          <p
                            className="mb-0 text-white-50"
                            style={{ fontSize: "0.875rem" }}
                          >
                            Modern technology stack
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Challenges & Learnings */}
            <section
              id="challenges"
              ref={challengesRef}
              className="pt-20 pb-12"
              style={{ scrollMarginTop: "120px" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#EDEDED",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Challenges & Learnings
              </h2>
              <div className="row g-4">
                <div className="col-md-6">
                  <div className="mb-6">
                    <h3
                      id="adopting-tech"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Adopting the Tech Ecosystem
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Implementing modern web technologies required careful
                      consideration of performance, scalability, and user
                      experience. The project involved integrating multiple
                      systems while maintaining clean code architecture.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3
                      id="real-time"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Real-Time Syncing
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Implementing real-time data synchronization required
                      understanding WebSocket connections and state management
                      patterns to ensure seamless user experience.
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-6">
                    <h3
                      id="authentication"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Authentication
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Building secure authentication flows required implementing
                      OAuth protocols, session management, and protecting
                      against common security vulnerabilities.
                    </p>
                  </div>
                  <div className="mb-6">
                    <h3
                      id="design-composition"
                      className="mb-3"
                      style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#EDEDED",
                        scrollMarginTop: "120px",
                      }}
                    >
                      Design & Component Composition
                    </h3>
                    <p style={{ color: "#A7A7A7", lineHeight: 1.75 }}>
                      Creating an intuitive and visually appealing interface
                      required balancing aesthetics with functionality. The
                      design process emphasized user-centered principles and
                      accessibility standards.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Outcome */}
            <section
              id="outcome"
              ref={outcomeRef}
              className="pt-20 pb-12"
              style={{ scrollMarginTop: "120px" }}
            >
              <h2
                className="mb-6"
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  color: "#EDEDED",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  paddingBottom: "12px",
                  letterSpacing: "-0.01em",
                }}
              >
                Outcome
              </h2>
              <p
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.75,
                  color: "#A7A7A7",
                  maxWidth: "900px",
                }}
              >
                {project.name} was successfully developed and deployed,
                demonstrating proficiency in modern web development practices.
                The project showcases clean code architecture, responsive
                design, and attention to detail in both functionality and user
                experience.
              </p>
            </section>

            {/* Action Buttons */}
            {(project.links?.demo || project.links?.repo) && (
              <section className="pt-20 pb-20">
                <div className="d-flex flex-wrap gap-3">
                  {project.links?.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn px-4 py-3 rounded-pill d-inline-flex align-items-center"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#EDEDED",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.4)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className="bi bi-box-arrow-up-right me-2"></i>
                      Live Demo
                    </a>
                  )}
                  {project.links?.repo && (
                    <a
                      href={project.links.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn px-4 py-3 rounded-pill d-inline-flex align-items-center"
                      style={{
                        backgroundColor: "transparent",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        color: "#EDEDED",
                        textDecoration: "none",
                        fontWeight: 500,
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.4)";
                        e.currentTarget.style.backgroundColor =
                          "rgba(255, 255, 255, 0.05)";
                        e.currentTarget.style.boxShadow =
                          "0 4px 20px rgba(255, 255, 255, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.2)";
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <i className="bi bi-github me-2"></i>
                      Source Code
                    </a>
                  )}
                </div>
              </section>
            )}
          </main>

          {/* Right Sidebar Navigation */}
          <aside
            className="d-none d-lg-flex flex-column"
            style={{
              position: "sticky",
              top: "96px",
              alignSelf: "flex-start",
              width: "220px",
              flexShrink: 0,
              paddingLeft: "32px",
              height: "fit-content",
            }}
          >
            <p
              className="mb-4"
              style={{
                fontSize: "0.75rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#8A8A8A",
              }}
            >
              On this page
            </p>

            <nav
              style={{
                position: "relative",
                paddingLeft: "16px",
              }}
            >
              {/* Vertical connector line */}
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  top: "0",
                  bottom: "0",
                  width: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />

              <div className="d-flex flex-column" style={{ gap: "12px" }}>
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={() => handleNavClick(item.id, item.ref)}
                      className="btn p-0 text-start border-0 bg-transparent"
                      style={{
                        fontSize: "0.875rem",
                        color:
                          activeSection === item.id ? "#FFFFFF" : "#9CA3AF",
                        fontWeight: activeSection === item.id ? 500 : 400,
                        letterSpacing: "0.01em",
                        lineHeight: "1.5",
                        padding: "4px 0 4px 12px",
                        position: "relative",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        textDecoration: "none",
                        background: "transparent",
                        opacity: activeSection === item.id ? 1 : 0.7,
                      }}
                      onMouseEnter={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.color = "#D1D5DB";
                          e.currentTarget.style.transform = "translateX(4px)";
                          e.currentTarget.style.opacity = "1";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeSection !== item.id) {
                          e.currentTarget.style.color = "#9CA3AF";
                          e.currentTarget.style.transform = "translateX(0)";
                          e.currentTarget.style.opacity = "0.7";
                        }
                      }}
                    >
                      {/* Active indicator - left border glow */}
                      {activeSection === item.id && (
                        <div
                          style={{
                            position: "absolute",
                            left: "-16px",
                            top: "0",
                            bottom: "0",
                            width: "2px",
                            backgroundColor: "#FFFFFF",
                            boxShadow:
                              "0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3)",
                            animation: "fadeIn 0.3s ease-in-out",
                          }}
                        />
                      )}
                      {item.label}
                    </button>

                    {/* Sub-items for Challenges section */}
                    {item.subItems && activeSection === item.id && (
                      <div
                        className="d-flex flex-column"
                        style={{
                          marginTop: "8px",
                          paddingLeft: "16px",
                          gap: "8px",
                        }}
                      >
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.id}
                            href={`#${subItem.id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.getElementById(
                                subItem.id
                              );
                              if (element) {
                                element.scrollIntoView({
                                  behavior: "smooth",
                                  block: "start",
                                });
                              }
                            }}
                            style={{
                              fontSize: "0.8125rem",
                              color: "#9CA3AF",
                              fontWeight: 400,
                              letterSpacing: "0.01em",
                              lineHeight: "1.5",
                              padding: "2px 0",
                              textDecoration: "none",
                              transition: "all 0.3s ease",
                              opacity: 0.7,
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#D1D5DB";
                              e.currentTarget.style.transform =
                                "translateX(4px)";
                              e.currentTarget.style.opacity = "1";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#9CA3AF";
                              e.currentTarget.style.transform = "translateX(0)";
                              e.currentTarget.style.opacity = "0.7";
                            }}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </nav>
          </aside>
        </div>
      </div>

      {/* Add animations */}
      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: scaleY(0.8);
            }
            to {
              opacity: 1;
              transform: scaleY(1);
            }
          }
        `}
      </style>
    </div>
  );
}
