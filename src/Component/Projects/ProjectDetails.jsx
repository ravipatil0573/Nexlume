import React, {
  useMemo,
  useRef,
  useEffect,
  useCallback,
  useState,
  Fragment,
} from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import "./MagicBento.css";

// -------------------------------------------
// Config
// -------------------------------------------
const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = "132, 0, 255";
const MOBILE_BREAKPOINT = 768;
const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5000";

// -------------------------------------------
// Utilities
// -------------------------------------------
const ensureArray = (val) => (Array.isArray(val) ? val : val ? [val] : []);
const extractColorFromGradient = (g) => {
  if (!g) return "#060010";
  const m = g.match(/#([0-9a-f]{6})/i);
  return m ? `#${m[0].slice(1)}` : "#060010";
};

const loadGoogleFontIfNeeded = (family) => {
  if (!family) return;
  // basic sanitization for a Google Fonts URL
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
  const glowColor = src.glowColor || DEFAULT_GLOW_COLOR;

  const typography = {
    headings: src.typography?.headings || "Poppins",
    body: src.typography?.body || "Inter",
    align: src.typography?.align || "left",
    google: "google" in (src.typography || {}) ? !!src.typography.google : true,
  };

  // If backend provides ordered "cards", use them; else we’ll synthesize later
  const cards = Array.isArray(src.cards) ? src.cards : null;

  return {
    id: src.id ?? "unknown",
    slug: src.slug || String(src.id || ""),
    name: title,
    overview: subtitle,
    techStack,
    features,
    screenshots,
    palette: src.palette?.length ? src.palette : ["#060010", "#8400FF", "#00F0FF", "#FFFFFF"],
    typography,
    links: src.links || { demo: src.demo, repo: src.repo },
    role: src.role || "Developer",
    timeline: src.timeline || "",
    color,
    gradient: src.gradient,
    glowColor,
    cards, // may be null (we’ll auto-build)
  };
};

// -------------------------------------------
// Visual FX helpers (particles/spotlight)
// -------------------------------------------
const createParticleElement = (x, y, color = DEFAULT_GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px; height: 4px; border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none; z-index: 100;
    left: ${x}px; top: ${y}px;
  `;
  return el;
};
const calculateSpotlightValues = (radius) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});
const updateCardGlowProperties = (card, mouseX, mouseY, glow, radius) => {
  const rect = card.getBoundingClientRect();
  const x = ((mouseX - rect.left) / rect.width) * 100;
  const y = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${x}%`);
  card.style.setProperty("--glow-y", `${y}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
};

// -------------------------------------------
// Particle-enabled Card Shell
// -------------------------------------------
const ParticleCard = ({
  children,
  className = "",
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
}) => {
  const cardRef = useRef(null);
  const particlesRef = useRef([]);
  const timeoutsRef = useRef([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef(null);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    if (magnetismAnimationRef.current?.kill) magnetismAnimationRef.current.kill();
    particlesRef.current.forEach((p) =>
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      })
    );
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();
    memoizedParticles.current.forEach((particle, index) => {
      const t = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true);
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(t);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
    };
    const onLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };
    const onMove = (e) => {
      if (!enableTilt && !enableMagnetism) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      if (enableTilt) {
        const rx = ((y - cy) / cy) * -10;
        const ry = ((x - cx) / cx) * 10;
        gsap.to(el, { rotateX: rx, rotateY: ry, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      }
      if (enableMagnetism) {
        gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: "power2.out" });
      }
    };
    const onClick = (e) => {
      if (!clickEffect) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const maxD = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - r.width, y),
        Math.hypot(x, y - r.height),
        Math.hypot(x - r.width, y - r.height)
      );
      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;
        background: radial-gradient(circle, rgba(${glowColor}, .4) 0%, rgba(${glowColor}, .2) 30%, transparent 70%);
        left:${x - maxD}px; top:${y - maxD}px; pointer-events:none; z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);

    return () => {
      isHoveredRef.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} particle-container`} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
};

// -------------------------------------------
// Spotlight
// -------------------------------------------
const GlobalSpotlight = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const sp = document.createElement("div");
    sp.className = "global-spotlight";
    sp.style.cssText = `
      position: fixed; width: 800px; height: 800px; border-radius: 50%; pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, rgba(${glowColor}, 0.01) 65%, transparent 70%);
      z-index: 200; opacity: 0; transform: translate(-50%, -50%); mix-blend-mode: screen;`;
    document.body.appendChild(sp);
    spotlightRef.current = sp;

    const handleMove = (e) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest(".bento-section");
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll(".magic-bento-card");
      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDist = Infinity;

      cards.forEach((card) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const d =
          Math.hypot(e.clientX - cx, e.clientY - cy) -
          Math.max(r.width, r.height) / 2;
        const eff = Math.max(0, d);
        minDist = Math.min(minDist, eff);

        let glow = 0;
        if (eff <= proximity) glow = 1;
        else if (eff <= fadeDistance)
          glow = (fadeDistance - eff) / (fadeDistance - proximity);
        updateCardGlowProperties(card, e.clientX, e.clientY, glow, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: "power2.out" });
      const opacity =
        minDist <= proximity ? 0.8 :
        minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity, duration: opacity > 0 ? 0.2 : 0.5, ease: "power2.out" });
    };

    const handleLeave = () => {
      gridRef.current?.querySelectorAll(".magic-bento-card").forEach((c) => c.style.setProperty("--glow-intensity", "0"));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// -------------------------------------------
// Layout helpers + grid
// -------------------------------------------
const BentoCardGrid = ({ children, gridRef }) => (
  <div className="card-grid bento-section" ref={gridRef}>
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
};

const MagicBentoProject = ({
  cards = [],
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  glowColor = DEFAULT_GLOW_COLOR,
  clickEffect = true,
  enableMagnetism = true,
}) => {
  const gridRef = useRef(null);
  const isMobile = useMobileDetection();
  const shouldDisable = disableAnimations || isMobile;

  const CardShell = enableStars ? ParticleCard : Fragment;
  const shellProps = enableStars
    ? { disableAnimations: shouldDisable, particleCount, glowColor, enableTilt, clickEffect, enableMagnetism }
    : {};

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisable}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cards.map((card, i) => {
          const base = `magic-bento-card ${textAutoHide ? "magic-bento-card--text-autohide" : ""} ${enableBorderGlow ? "magic-bento-card--border-glow" : ""}`;
          const bg = card.background || card.color || "#060010";
          const common = { className: base, style: { backgroundColor: bg, "--glow-color": glowColor } };
          return (
            <CardShell key={i} {...shellProps} {...common}>
              <div className="magic-bento-card__header">
                {card.label && <div className="magic-bento-card__label">{card.label}</div>}
              </div>
              <div className="magic-bento-card__content">
                {card.title && <h2 className="magic-bento-card__title">{card.title}</h2>}
                {card.description && <p className="magic-bento-card__description">{card.description}</p>}
                {card.slot}
              </div>
            </CardShell>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

// -------------------------------------------
// Render helpers for backend “cards”
// -------------------------------------------
const renderBackendCards = (project) => {
  if (!project.cards) return null;

  const toCard = (c) => {
    const color = c.color || project.color || "#060010";

    // different card types coming from backend:
    if (c.type === "overview") {
      return {
        label: c.label || "Overview",
        title: c.title || project.name,
        description: c.description || project.overview,
        color,
        slot: (
          <div className="space-y-3">
            {project.role && <div className="pill">Role: {project.role}</div>}
            {project.timeline && <div className="pill">Timeline: {project.timeline}</div>}
          </div>
        ),
      };
    }

    if (c.type === "tech") {
      const items = ensureArray(c.items).length ? c.items : project.techStack;
      return {
        label: c.label || "Tech Stack",
        title: c.title || "Technologies",
        description: c.description || "Core tools and frameworks",
        color,
        slot: (
          <ul className="list-grid">
            {items.map((t) => (
              <li key={t} className="tag">{t}</li>
            ))}
          </ul>
        ),
      };
    }

    if (c.type === "list") {
      const items = ensureArray(c.items).length ? c.items : project.features;
      return {
        label: c.label || "Features",
        title: c.title || "What it does",
        description: c.description || "Highlights",
        color,
        slot: (
          <ul className="list-bullets">
            {items.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        ),
      };
    }

    if (c.type === "gallery") {
      const images = ensureArray(c.images).length ? c.images : project.screenshots;
      return {
        label: c.label || "Gallery",
        title: c.title || "Screenshots",
        description: c.description || "Project photos",
        color,
        slot: (
          <div className="gallery">
            {images.map((src, i) => (
              <img key={`${src}-${i}`} src={src} alt={`screenshot-${i}`} />
            ))}
          </div>
        ),
      };
    }

    if (c.type === "links") {
      const links = c.links?.length
        ? c.links
        : [
            project.links?.demo && { text: "Live Demo", href: project.links.demo },
            project.links?.repo && { text: "GitHub Repo", href: project.links.repo },
          ].filter(Boolean);

      return {
        label: c.label || "Links",
        title: c.title || "Demo & Code",
        description: c.description || "Explore more",
        color,
        slot: (
          <div className="links">
            {links.map((l, idx) => (
              <a key={idx} className="btn" href={l.href} target="_blank" rel="noreferrer">
                {l.text}
              </a>
            ))}
          </div>
        ),
      };
    }

    if (c.type === "metrics") {
      const metrics = ensureArray(c.metrics);
      return {
        label: c.label || "Metrics",
        title: c.title || "Results",
        description: c.description || "",
        color,
        slot: (
          <div className="metrics-grid">
            {metrics.map((m, idx) => (
              <div key={idx} className="metric">
                <div className="metric-value">{m.value}</div>
                <div className="metric-label">{m.label}</div>
              </div>
            ))}
          </div>
        ),
      };
    }

    if (c.type === "richtext") {
      // render trusted HTML from backend (only if you control the content)
      return {
        label: c.label || "Details",
        title: c.title || "",
        description: c.description || "",
        color,
        slot: (
          <div
            className="richtext"
            dangerouslySetInnerHTML={{ __html: c.html || "" }}
          />
        ),
      };
    }

    // default pass-through
    return {
      label: c.label,
      title: c.title,
      description: c.description,
      color,
    };
  };

  return project.cards.map(toCard);
};

// Fallback when backend doesn’t send `cards`
const synthesizeCards = (project) => [
  {
    label: "Overview",
    title: project.name,
    description: project.overview,
    color: project.color || "#060010",
    slot: (
      <div className="space-y-3">
        {project.role && <div className="pill">Role: {project.role}</div>}
        {project.timeline && <div className="pill">Timeline: {project.timeline}</div>}
      </div>
    ),
  },
  {
    label: "Tech Stack",
    title: "Technologies",
    description: "Core tools and frameworks",
    color: project.color || "#060010",
    slot: (
      <ul className="list-grid">
        {project.techStack?.map((t) => (
          <li key={t} className="tag">{t}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Features",
    title: "What it does",
    description: "Highlights",
    color: project.color || "#060010",
    slot: (
      <ul className="list-bullets">
        {project.features?.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    ),
  },
  {
    label: "Gallery",
    title: "Screenshots",
    description: "Project photos",
    color: project.color || "#060010",
    slot: (
      <div className="gallery">
        {project.screenshots?.map((src, i) => (
          <img key={`${src}-${i}`} src={src} alt={`screenshot-${i}`} />
        ))}
      </div>
    ),
  },
  {
    label: "Design",
    title: "Colors",
    description: "Palette",
    color: project.color || "#060010",
    slot: (
      <div className="palette">
        {project.palette?.map((c) => (
          <div key={c} className="swatch" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    label: "Typography",
    title: project.typography?.headings || "Typography",
    description: `Body: ${project.typography?.body || ""}`,
    color: project.color || "#060010",
    slot: (
      <div className="typo">
        <div>Headings: {project.typography?.headings}</div>
        <div>Body: {project.typography?.body}</div>
        <div>Align: {project.typography?.align}</div>
      </div>
    ),
  },
  {
    label: "Links",
    title: "Demo & Code",
    description: "Explore more",
    color: project.color || "#060010",
    slot: (
      <div className="links">
        {project.links?.demo && (
          <a className="btn" href={project.links.demo} target="_blank" rel="noreferrer">Live Demo</a>
        )}
        {project.links?.repo && (
          <a className="btn" href={project.links.repo} target="_blank" rel="noreferrer">GitHub Repo</a>
        )}
      </div>
    ),
  },
];

// -------------------------------------------
// Page Component
// -------------------------------------------
export default function ProjectDetails() {
  const { projectId } = useParams(); // you can pass either numeric :id or string :slug
  const location = useLocation();
  const navigate = useNavigate();

  // If you navigated with state from list page, we use it for instant paint.
  const stateProject = location.state ? normalizeProject(location.state) : null;

  const [serverProject, setServerProject] = useState(null);
  const [loading, setLoading] = useState(!stateProject);
  const [error, setError] = useState("");

  // load fonts when we know families
  useEffect(() => {
    const p = serverProject || stateProject;
    if (!p) return;
    if (p.typography?.google !== false) {
      loadGoogleFontIfNeeded(p.typography?.headings);
      loadGoogleFontIfNeeded(p.typography?.body);
    }
  }, [serverProject, stateProject]);

  // Fetch from backend by id or slug (name)
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
        setError("");
      } catch {
        if (!isMounted) return;
        // setError("Unable to load project from server.");
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

  const project = useMemo(() => serverProject || stateProject, [serverProject, stateProject]);
  const cards = useMemo(() => {
    if (!project) return [];
    const built = renderBackendCards(project);
    return built && built.length ? built : synthesizeCards(project);
  }, [project]);

  if (!project && !loading) {
    return (
      <div className="project-details-page" style={{ padding: 24 }}>
        <h1>Project details</h1>
        <p className="muted" style={{ opacity: 0.8 }}>
          We couldn’t find this project. Go back to the list and choose a project.
        </p>
        <button className="btn" onClick={() => navigate(-1)}>← Back</button>
      </div>
    );
  }

  return (
    <div
      className="project-details-page"
      style={{
        // apply per-project fonts if present
        fontFamily: project?.typography?.body ? `"${project.typography.body}", system-ui, sans-serif` : undefined,
        textAlign: project?.typography?.align || "left",
      }}
    >
      <header className="project-header">
        <h1 style={{ fontFamily: project?.typography?.headings ? `"${project.typography.headings}", system-ui, sans-serif` : undefined }}>
          {project?.name || "Loading..."}
        </h1>
        <p className="muted">{project?.overview}</p>
        {loading && <p className="muted">Loading details…</p>}
        {!!error && !loading && (
          <p className="muted" style={{ color: "salmon" }}>
            {error}
          </p>
        )}
      </header>

      <MagicBentoProject
        cards={cards}
        textAutoHide
        enableStars
        enableSpotlight
        enableBorderGlow
        enableTilt
        enableMagnetism
        clickEffect
        spotlightRadius={360}
        particleCount={14}
        glowColor={project?.glowColor || DEFAULT_GLOW_COLOR}
      />
    </div>
  );
}

// -------------------------------------------
// Tiny helper CSS injection (works with MagicBento.css)
// -------------------------------------------
const extraCss = `
.project-details-page{max-width:1200px;margin:0 auto;padding:24px}
.project-header{margin-bottom:24px}
.project-header h1{font-size:28px;line-height:1.2;margin:0 0 8px}
.project-header .muted{opacity:.8}
.pill{display:inline-block;padding:6px 10px;border:1px solid rgba(255,255,255,.08);border-radius:999px;font-size:12px;opacity:.9}
.list-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:8px}
.tag{display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:8px 10px}
.list-bullets{padding-left:18px;display:grid;gap:6px}
.gallery{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}
.gallery img{width:100%;height:130px;object-fit:cover;border-radius:12px;border:1px solid rgba(255,255,255,.08)}
.palette{display:flex;gap:8px}
.swatch{width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,.1)}
.links{display:flex;gap:12px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:10px;border:1px solid rgba(255,255,255,.12)}
.metrics-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}
.metric{border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:12px;text-align:center}
.metric-value{font-size:20px;font-weight:700}
.metric-label{opacity:.8;font-size:12px}
.richtext ul{padding-left:18px}
.richtext li{margin:6px 0}
`;
if (typeof document !== "undefined" && !document.getElementById("project-details-inline-css")) {
  const style = document.createElement("style");
  style.id = "project-details-inline-css";
  style.innerHTML = extraCss;
  document.head.appendChild(style);
}
