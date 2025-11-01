import React from "react";
import "./ProjectsSection.css";
import SafarnamaVideo from "../../../assets/Video/SafarNamaVideo.mp4";
import NexshowVideo from "../../../assets/Video/NexShow.mp4";
import StyloraVideo from "../../../assets/Video/StyloraVideo.mp4";
const projects = [
  {
    title: "SAFARNAMA",
    tags: ["Tours and Travel", "Logo Design"],
    description:
      "Embark on extraordinary journeys with Safarnama, where every trip is crafted to perfection. From breathtaking landscapes to cultural wonders, we curate seamless itineraries and exclusive experiences tailored for modern explorers. Whether it's a solo adventure, a romantic getaway, or a group expedition, we ensure hassle-free travel, unforgettable memories, and stories worth sharing. Let's turn your travel dreams into reality! 🌍✈️",
    video: SafarnamaVideo,
    tagline: "Where Adventure Meets Simplicity",
  },
  {
    title: "NEXSHOW",
    tags: ["Movie Booking", "Logo Design"],
    description:
      "Book your favorite movies effortlessly with NexShow, your one-stop destination for seamless movie ticket booking. Discover the latest blockbusters, explore showtimes, and secure the best seats—all with a few clicks. Whether it's an action-packed thriller, a heartwarming romance, or a family-friendly film, NexShow ensures a hassle-free booking experience. Enjoy the magic of cinema like never before! 🎬🍿",
    video: NexshowVideo, // Replace with your video path
    tagline: "Where Cinema Meets Convenience",
  },
  {
    title: "STYLORA",
    tags: ["E-commerce", "Logo Design"],
    description:
      "Step into a world of trendsetting fashion with Stylora, your go-to destination for the latest styles and timeless classics. From chic casuals to elegant formals, we bring you a curated collection of apparel that blends quality, comfort, and sophistication. Shop effortlessly, stay ahead of trends, and express your unique style with Stylora—where fashion meets convenience! 👗🛍️",
    video: StyloraVideo, // Replace with your video path
    tagline: "Where Style Meets Simplicity",
  },
];

const ProjectsSection = () => {
  return (
    <section className="project-section py-5">
      <div className="container">
        {/* Enhanced Heading */}
        <div className="projects-heading text-center mb-5">
          <h2 className="section-title mb-3">Our Projects</h2>
          <div className="title-underline mx-auto mb-4"></div>
          <p className="section-subtitle">
            Discover our innovative solutions and creative excellence
          </p>
        </div>

        {/* Project Cards */}
        <div className="projects-container">
          {projects.map((project, index) => (
            <div className="project-card mb-5" key={index}>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <div className="tags mb-3">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="project-tag me-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                <button className="project-button">
                  MORE ABOUT THIS PROJECT
                </button>

                <div className="logo-preview">
                  <div className="video-wrapper">
                    <video
                      className="project-video"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="video-overlay">
                      <p className="logo-tagline">{project.tagline}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
