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
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 bg-gradient-to-r from-red-800 via-red-800 to-red-800 bg-clip-text text-transparent tracking-tight">
            Our Projects
          </h2>
          <div className="w-20 h-1 mx-auto mb-6 bg-gradient-to-r from-white to-gray-400 rounded-full"></div>
          <p className="text-base sm:text-lg md:text-xl text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
            Discover our innovative solutions and creative excellence
          </p>
        </div>

        {/* Project Cards */}
        <div className="max-w-5xl mx-auto space-y-6 md:space-y-10 lg:space-y-14">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-[#0a0a0a] border border-[#C80000]/50 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:border-[#C80000] hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1"
            >
              {/* Mobile Layout: Video First with Overlay Content */}
              <div className="block lg:hidden">
                {/* Video Container */}
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                  
                  {/* Tags floating on video */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 text-[10px] font-medium text-white/90 bg-black/40 backdrop-blur-sm border border-white/20 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Content Below Video */}
                <div className="p-3 sm:p-4">
                  <h3 className="text-lg sm:text-xl font-heading font-bold text-white mb-1.5 tracking-tight bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed mb-2.5 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center justify-between gap-2">
                    <button className="group/btn inline-flex items-center gap-1 px-3 py-1 text-[10px] font-medium text-white bg-red-600 rounded-full transition-all duration-300 hover:bg-red-700 hover:shadow-md hover:shadow-red-500/25">
                      <span>View</span>
                      <svg className="w-2.5 h-2.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                    <span className="text-[10px] text-gray-500 italic truncate">{project.tagline}</span>
                  </div>
                </div>
              </div>

              {/* Desktop Layout: Full Content */}
              <div className="hidden lg:block relative p-8 xl:p-10">
                {/* Project Header */}
                <div className="mb-5">
                  <h3 className="text-4xl xl:text-5xl font-heading font-bold text-white mb-4 tracking-tight bg-gradient-to-r from-red-600 via-white to-red-600 bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block px-4 py-1.5 text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <p className="text-lg text-gray-400 leading-relaxed mb-6 max-w-3xl">
                  {project.description}
                </p>

                {/* Button */}
                <button className="group/btn inline-flex items-center gap-2 px-6 py-3 mb-6 text-sm font-medium tracking-wide text-white bg-red-600 rounded-full transition-all duration-300 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/20">
                  <span>VIEW</span>
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>

                {/* Video Preview */}
                <div className="relative rounded-xl overflow-hidden border border-white/10">
                  <div className="relative w-full h-[380px]">
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                    >
                      <source src={project.video} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-center">
                      <p className="text-xl text-white font-light text-center tracking-wide">
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
