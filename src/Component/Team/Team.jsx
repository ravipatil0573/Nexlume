import React, { useRef, useEffect, useState } from "react"; 
import "./Team.css";
import { Link } from "react-router-dom";
import { FaLinkedin } from "react-icons/fa";
import { gsap } from "gsap";

// Import images
import Nikhil from "../../assets/Team/messa.jpg";
import Sanjit from "../../assets/Team/sanju.jpg";
import Ravi from "../../assets/Team/ravi.jpg";
import Aman from "../../assets/Team/aman.jpg";
import Prajwal from "../../assets/Team/Pk.jpg";
import Sanath from "../../assets/Team/anna.jpg";
import GroupImage from "../../assets/Team/group-image.jpg";
import TeamEmailImage from "../../assets/Team/team-email.jpg";

// =========================
// TEAM DATA
// Image Size 244.64 x 250
// =========================
const demo = [
  {
    image: Nikhil,
    title: "Nikhil Messa",
    subtitle: "Developer",
    handle: "@nikhilmessa",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg,#4F46E5,#000)",
    url: "https://www.linkedin.com/in/nikhil-messa/",
  },
  {
    image: Sanjit,
    title: "Sanjit Prajapati",
    subtitle: "Developer",
    handle: "@sanjitprajapati",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg,#10B981,#000)",
    url: "https://www.linkedin.com/in/sanjit-prajapati-5420a9222/",
  },
  {
    image: Ravi,
    title: "Ravindra Patil",
    subtitle: "Developer",
    handle: "@ravindrapatil",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg,#F59E0B,#000)",
    url: "https://www.linkedin.com/in/nikhil-messa/",
  },
  {
    image: Aman,
    title: "Aman Mishra",
    subtitle: "Developer",
    handle: "@amanmishra",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg,#EF4444,#000)",
    url: "https://www.linkedin.com/in/aman-kumar/",
  },
  {
    image: Prajwal,
    title: "Prajwal Kolure",
    subtitle: "Creative Designer",
    handle: "@prajwalkolure",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg,#8B5CF6,#000)",
    url: "https://www.linkedin.com/in/rohit-kumar/",
  },
  {
    image: Sanath,
    title: "Sanath Shetty",
    subtitle: "Developer",
    handle: "@sanathshetty",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg,#06B6D4,#000)",
    url: "https://www.linkedin.com/in/shivani-singh/",
  },
];

// =========================
// TEAM CARD COMPONENT
// =========================
const TeamCard = ({
  items = demo,
  className = "",
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true,
    });
  };

  const handleMove = (e) => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url) => {
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove = (e) => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    c.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`team-grid ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {items.map((member, index) => (
        <div
          key={index}
          className="team-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(member.url)}
          style={{
            borderColor: member.borderColor || "transparent",
            background: member.gradient,
            cursor: member.url ? "pointer" : "default",
          }}
        >
          <div className="team-image-wrapper">
            <img src={member.image} alt={member.title} loading="lazy" />
          </div>
          <div className="team-info">
            <h3 className="team-name">{member.title}</h3>
            {member.handle && (
              <span className="team-handle">{member.handle}</span>
            )}
            <p className="team-role">{member.subtitle}</p>
            {member.location && (
              <span className="team-location">{member.location}</span>
            )}
          </div>
        </div>
      ))}

      <div className="team-overlay"></div>
      <div ref={fadeRef} className="team-fade"></div>
    </div>
  );
};

// =========================
// MAIN TEAM COMPONENT
// =========================
const Team = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailInput = e.target.previousElementSibling;
    const email = emailInput.value.trim();
    
    if (!email) {
      alert("Please enter your email address");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const API_BASE = import.meta.env?.VITE_API_BASE || "http://localhost:5005";
      
      const response = await fetch(`${API_BASE}/api/team/enroll`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        // If not JSON, it's likely an HTML error page
        const text = await response.text();
        console.error("Non-JSON response:", text);
        throw new Error(`Server error: ${response.status} ${response.statusText}`);
      }

      if (response.ok) {
        alert(`Thank you! We've sent an email to ${email}. Please check your inbox!`);
        emailInput.value = ""; // Clear the input
      } else {
        alert(data.message || `Failed to send email. Error: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      if (error.message.includes("404")) {
        alert("Backend route not found. Please add the /api/team/enroll route to your backend server.");
      } else {
        alert("Failed to send email. Please check your backend server is running and the route is configured.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section id="team" className="team-body">
        <h1 className="team-container-title">
          Namaste, We're the <br /> Creators of NexLume.
        </h1>

        <div className="team-group">
          <div className="team-group-image">
            <img src={GroupImage} alt="Team Group" />
          </div>
          <div className="team-group-text">
            <h2>OUR AMAZING TEAM</h2>
            <p>
              We are a group of dedicated professionals, committed to delivering
              the best results. Together, we create innovative solutions and
              achieve excellence.
            </p>
          </div>
        </div>

        <div id="teams" className="team-main-container">
          <h2 className="header-team text-center">
            The People Behind the Vision
          </h2>
          <TeamCard items={demo} />
        </div>
      </section>

      <div
        className="join-team"
        style={{ backgroundImage: `url(${TeamEmailImage})` }}
      >
        <div className="join-container">
          <h1>Create | Innovate | Transform – with NexLume!</h1>
          <p className="subtitle">
            Bring your skills to the team that builds software for the next
            generation of startups.
          </p>
          <div className="form-container">
            <input
              type="email"
              name="email"
              placeholder="Enter Email Address"
              className="email-input"
              required
            />
            <button
              type="button"
              className="apply-button"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Enroll Now"}
            </button>
          </div>
          <p className="contact-info">
            Share your details at{" "}
            <Link
              to="https://mail.google.com/mail/?view=cm&fs=1&to=nexlume.co@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              nexlume.co@gmail.com
            </Link>{" "}
            and let's build together.
          </p>
        </div>
      </div>
    </>
  );
};

export default Team;
