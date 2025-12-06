import React from "react";
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
    video: NexshowVideo,
    tagline: "Where Cinema Meets Convenience",
  },
  {
    title: "STYLORA",
    tags: ["E-commerce", "Logo Design"],
    description:
      "Step into a world of trendsetting fashion with Stylora, your go-to destination for the latest styles and timeless classics. From chic casuals to elegant formals, we bring you a curated collection of apparel that blends quality, comfort, and sophistication. Shop effortlessly, stay ahead of trends, and express your unique style with Stylora—where fashion meets convenience! 👗🛍️",
    video: StyloraVideo,
    tagline: "Where Style Meets Simplicity",
  },
];

const ProjectsSection = () => {
  return (
    <section className="relative min-h-screen bg-bg-primary overflow-hidden py-16 md:py-24 lg:py-32 font-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-12 md:mb-16 lg:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent tracking-tight">
            Our Projects
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-white to-gray-400 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
            Discover our innovative solutions and creative excellence
          </p>
        </div>

        {/* Project Cards */}
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12 lg:space-y-16">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-bg-card border border-borderCustom-primary rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:border-borderCustom-secondary hover:shadow-2xl hover:shadow-glow-white hover:-translate-y-2"
            >
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/2 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative p-6 sm:p-8 md:p-10 lg:p-12">
                {/* Project Header */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-text-primary mb-4 tracking-tight leading-tight">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block px-4 py-2 text-xs sm:text-sm font-medium text-text-muted bg-bg-surface border border-borderCustom-primary rounded-full transition-all duration-300 hover:bg-bg-elevated hover:border-borderCustom-secondary hover:text-text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-text-tertiary leading-relaxed mb-6 md:mb-8 font-light max-w-3xl">
                  {project.description}
                </p>

                {/* Button */}
                <button className="relative inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-4 mb-6 md:mb-8 text-sm md:text-base font-semibold text-text-on-primary bg-secondary rounded-lg overflow-hidden transition-all duration-300 hover:bg-gray-100 hover:shadow-lg hover:shadow-glow-white hover:-translate-y-1 active:translate-y-0">
                  <span className="relative z-10 tracking-wide">MORE ABOUT THIS PROJECT</span>
                </button>

                {/* Video Preview */}
                <div className="relative bg-bg-primary rounded-xl md:rounded-2xl overflow-hidden border border-borderCustom-primary group-hover:border-borderCustom-secondary transition-all duration-300">
                  <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[450px] bg-bg-primary">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    
                    {/* Tagline overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 flex items-end justify-center">
                      <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-primary font-light text-center tracking-wide">
                        {project.tagline}
                      </p>
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
