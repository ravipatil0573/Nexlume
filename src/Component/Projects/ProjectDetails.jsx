import React from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Zap,
  Code,
  Target,
  Users,
  Sparkles,
  ExternalLink,
} from "lucide-react";

// ============================================
// DATA CONFIGURATION
// ============================================

const projectsData = {
  1: {
    id: 1,
    title: "Next Venture",
    subtitle: "Pitch Your Startup, Connect With Investors, and Fuel Innovation",
    gradient: "linear-gradient(135deg, #6b21a8 0%, #be185d 50%, #6b21a8 100%)",
    liveUrl: "https://nextvenue.com",
    codeUrl: "https://github.com/yourusername/next-venture",
    overview:
      "Next Venture is a cutting-edge platform built to address the gap between early-stage entrepreneurs and investors. The platform allows startups to pitch ideas, browse trending projects, and engage with investors in real-time. Leveraging Partial Prerendering and After for faster loading, the platform delivers a seamless experience with simplified idea submission and enhanced browsing through performance optimization.",
    features: [
      {
        title: "High-Performance Architecture",
        description:
          "Built with Next.js 15 leveraging Partial Prerendering for instant page loads and optimal user experience.",
      },
      {
        title: "Seamless Authentication",
        description:
          "Secure GitHub OAuth integration enabling quick registration and safe user authentication flows.",
      },
      {
        title: "Interactive Chat Integration",
        description:
          "Real-time messaging system connecting entrepreneurs with investors for instant collaboration and feedback.",
      },
      {
        title: "Dynamic Content Management",
        description:
          "Powered by Sanity CMS for real-time content updates and flexible pitch management capabilities.",
      },
    ],
    techStack: [
      {
        name: "Next.js 15",
        description: "Full-stack React framework with SSR",
        color: "cyan",
      },
      {
        name: "TypeScript",
        description: "Type-safe development",
        color: "blue",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework",
        color: "cyan",
      },
      {
        name: "Sanity",
        description: "Smart strategies and mapping",
        color: "orange",
      },
      {
        name: "Node.js",
        description: "JavaScript runtime for server",
        color: "green",
      },
      {
        name: "Auth.js",
        description: "Authentication framework",
        color: "purple",
      },
      {
        name: "Motion",
        description: "Smooth layout transitions",
        color: "pink",
      },
      { name: "Git", description: "Version control system", color: "yellow" },
    ],
    challenges: [
      {
        title: "Adopting the Next 15 Architecture",
        description:
          "Migrating to Next.js 15's Partial Prerendering paradigm required completely rethinking our data fetching patterns. The learning curve was steep, but the performance improvements were remarkable - we achieved a 40% reduction in initial page load times. Server Actions also streamlined our form handling significantly.",
      },
      {
        title: "Real-Time CMS Syncing",
        description:
          "Integrating Sanity's studio architecture with Next.js posed synchronization challenges. We had to carefully manage cache invalidation and implement webhooks to ensure content updates appeared instantly without requiring page refreshes, creating a truly dynamic user experience.",
      },
      {
        title: "Auth Integration",
        description:
          "Building secure authentication flows with GitHub OAuth taught us valuable lessons about token management, session handling, and creating seamless onboarding experiences. We implemented middleware-based route protection and optimized the authentication state management.",
      },
    ],
    designDescription:
      "Using shadcn/ui brought remarkable consistency and modularity to our design system. We built a comprehensive library of reusable components including pitch cards, investor profiles, notification badges, and interactive dialogs that maintain visual harmony while remaining highly customizable. The carefully crafted dark theme with vibrant accent colors creates an engaging, premium aesthetic that resonates with our target audience of modern entrepreneurs and investors.",
    outcome: {
      description:
        "Next Venture successfully launched with overwhelmingly positive feedback from both entrepreneurs and investors. The platform's exceptional speed, intuitive user interface, and modern design have made it the preferred destination for early-stage networking and fundraising activities.",
      stats: [
        { number: "2.5k+", label: "Active Users", color: "green" },
        { number: "500+", label: "Startup Pitches", color: "cyan" },
        { number: "40%", label: "Performance Boost", color: "purple" },
      ],
    },
  },
  2: {
    id: 2,
    title: "CodeVerse",
    subtitle:
      "A Collaborative Platform for Developers to Share, Learn, and Grow",
    gradient: "linear-gradient(135deg, #0077ff 0%, #8a2be2 50%, #0077ff 100%)",
    liveUrl: "https://codeverse.com",
    codeUrl: "https://github.com/yourusername/codeverse",
    overview:
      "CodeVerse is a collaborative platform designed for developers to engage in interactive coding sessions, share knowledge, and participate in challenges. With real-time code sharing capabilities and a gamified learning environment, CodeVerse transforms the way developers learn and grow together.",
    features: [
      {
        title: "Real-Time Code Collaboration",
        description:
          "Live code sharing with WebSocket integration for seamless pair programming and collaborative sessions.",
      },
      {
        title: "Gamified Challenges",
        description:
          "Engaging coding challenges with leaderboards, achievements, and reward systems to motivate continuous learning.",
      },
      {
        title: "Cloud-Based IDE",
        description:
          "Browser-based development environment with syntax highlighting and multiple language support.",
      },
      {
        title: "Community Forums",
        description:
          "Interactive discussion boards where developers can ask questions, share solutions, and network.",
      },
    ],
    techStack: [
      { name: "React", description: "Frontend UI library", color: "cyan" },
      {
        name: "Node.js",
        description: "Backend runtime environment",
        color: "green",
      },
      {
        name: "Socket.io",
        description: "Real-time bidirectional communication",
        color: "purple",
      },
      { name: "MongoDB", description: "NoSQL database", color: "green" },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework",
        color: "cyan",
      },
      {
        name: "Express",
        description: "Web application framework",
        color: "blue",
      },
      {
        name: "Redis",
        description: "In-memory data structure store",
        color: "orange",
      },
      {
        name: "Docker",
        description: "Containerization platform",
        color: "blue",
      },
    ],
    challenges: [
      {
        title: "Real-Time Synchronization",
        description:
          "Implementing real-time code synchronization across multiple users required careful state management and conflict resolution strategies. We used operational transformation algorithms to ensure smooth collaborative editing.",
      },
      {
        title: "Scalability Concerns",
        description:
          "As the user base grew, we faced challenges in maintaining low latency for real-time features. We implemented Redis for session management and optimized WebSocket connections to handle thousands of concurrent users.",
      },
      {
        title: "Security Implementation",
        description:
          "Ensuring secure code execution in a shared environment was critical. We implemented sandboxed containers using Docker to isolate user code and prevent malicious activities.",
      },
    ],
    designDescription:
      "The platform features a modern, developer-friendly interface with syntax-highlighted code editors, dark mode support, and intuitive navigation. We focused on minimizing distractions while providing powerful tools for collaboration and learning.",
    outcome: {
      description:
        "CodeVerse has become a thriving community of developers, with thousands of daily active users participating in challenges and collaborative sessions. The platform's unique approach to gamified learning has received praise from educators and industry professionals.",
      stats: [
        { number: "5k+", label: "Active Developers", color: "green" },
        { number: "1k+", label: "Challenges Completed", color: "cyan" },
        { number: "95%", label: "User Satisfaction", color: "purple" },
      ],
    },
  },
  3: {
    id: 3,
    title: "FluxLura Converter",
    subtitle:
      "Free Online Multimedia Conversion Tool for Seamless File Processing",
    gradient: "linear-gradient(135deg, #00ffaa 0%, #00ccff 50%, #00ffaa 100%)",
    liveUrl: "https://fluxlura.com",
    codeUrl: "https://github.com/yourusername/fluxlura",
    overview:
      "FluxLura Converter is a powerful, free online tool that enables users to convert various multimedia files seamlessly. Built with Next.js and leveraging FFmpeg for media processing, it provides a fast, secure, and user-friendly conversion experience for audio, video, and image files.",
    features: [
      {
        title: "Multi-Format Support",
        description:
          "Convert between dozens of audio, video, and image formats with a single click. Support for MP4, AVI, MP3, PNG, JPG, and more.",
      },
      {
        title: "Client-Side Processing",
        description:
          "All conversions happen directly in your browser using WebAssembly, ensuring privacy and faster processing without server uploads.",
      },
      {
        title: "Batch Conversion",
        description:
          "Process multiple files simultaneously with our advanced batch conversion feature, saving time and effort.",
      },
      {
        title: "Quality Presets",
        description:
          "Choose from optimized quality presets or customize compression settings for your specific needs.",
      },
    ],
    techStack: [
      {
        name: "Next.js",
        description: "React framework for production",
        color: "cyan",
      },
      {
        name: "FFmpeg",
        description: "Multimedia framework for conversion",
        color: "orange",
      },
      {
        name: "WebAssembly",
        description: "High-performance browser execution",
        color: "purple",
      },
      {
        name: "TypeScript",
        description: "Type-safe development",
        color: "blue",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework",
        color: "cyan",
      },
      {
        name: "React Dropzone",
        description: "File upload component",
        color: "pink",
      },
      { name: "Media.dev", description: "Media optimization", color: "green" },
      { name: "Vercel", description: "Deployment platform", color: "blue" },
    ],
    challenges: [
      {
        title: "FFmpeg WebAssembly Integration",
        description:
          "Compiling and optimizing FFmpeg to run efficiently in the browser was a significant challenge. We had to carefully select codecs and optimize the WASM bundle size to maintain fast load times while supporting multiple formats.",
      },
      {
        title: "Memory Management",
        description:
          "Processing large media files in the browser required careful memory management to prevent crashes. We implemented chunked processing and memory cleanup strategies to handle files of various sizes.",
      },
      {
        title: "Cross-Browser Compatibility",
        description:
          "Ensuring consistent performance across different browsers and devices was complex. We implemented fallback mechanisms and optimized for various browser engines.",
      },
    ],
    designDescription:
      "The interface prioritizes simplicity and clarity, with a drag-and-drop file upload area as the centerpiece. We used smooth animations and clear progress indicators to guide users through the conversion process, making it accessible even for non-technical users.",
    outcome: {
      description:
        "FluxLura Converter has processed millions of files since launch, becoming a go-to tool for users seeking free, privacy-focused media conversion. The client-side processing approach has been particularly praised for its speed and security.",
      stats: [
        { number: "1M+", label: "Files Converted", color: "green" },
        { number: "50+", label: "Supported Formats", color: "cyan" },
        { number: "100%", label: "Privacy Protected", color: "purple" },
      ],
    },
  },
  4: {
    id: 4,
    title: "AI StarForge",
    subtitle: "Modern AI SaaS Landing Page with Enhanced User Engagement",
    gradient: "linear-gradient(135deg, #ff6600 0%, #ff0080 50%, #ff6600 100%)",
    liveUrl: "https://aistarforge.com",
    codeUrl: "https://github.com/yourusername/aistarforge",
    overview:
      "AI StarForge is a beautifully designed SaaS landing page built to showcase AI-powered products. With a focus on high conversion rates and user engagement, the page features dynamic chat experiences powered by OpenAI, smooth animations with Framer Motion, and a modern layout built with Next.js.",
    features: [
      {
        title: "Conversion-Optimized Design",
        description:
          "Strategic placement of CTAs, social proof elements, and compelling copy designed to maximize conversion rates.",
      },
      {
        title: "AI-Powered Chat Demo",
        description:
          "Interactive chat demonstration powered by OpenAI API, allowing visitors to experience the product firsthand.",
      },
      {
        title: "Smooth Animations",
        description:
          "Engaging micro-interactions and scroll-triggered animations using Framer Motion for a premium feel.",
      },
      {
        title: "Responsive Design",
        description:
          "Pixel-perfect responsive design that looks stunning on all devices, from mobile phones to large desktop screens.",
      },
    ],
    techStack: [
      {
        name: "Next.js",
        description: "React framework for production",
        color: "cyan",
      },
      {
        name: "TypeScript",
        description: "Type-safe development",
        color: "blue",
      },
      {
        name: "Framer Motion",
        description: "Animation library",
        color: "purple",
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS framework",
        color: "cyan",
      },
      {
        name: "OpenAI API",
        description: "AI chat integration",
        color: "green",
      },
      {
        name: "React Hook Form",
        description: "Form validation",
        color: "pink",
      },
      { name: "Vercel", description: "Deployment platform", color: "blue" },
      {
        name: "Analytics",
        description: "User behavior tracking",
        color: "orange",
      },
    ],
    challenges: [
      {
        title: "Performance Optimization",
        description:
          "Balancing rich animations with page load performance required careful optimization. We implemented lazy loading for heavy components and optimized animation triggers to maintain smooth 60fps performance.",
      },
      {
        title: "API Rate Limiting",
        description:
          "Managing OpenAI API rate limits for the demo chat required implementing smart caching strategies and user session management to prevent abuse while maintaining a great user experience.",
      },
      {
        title: "Conversion Tracking",
        description:
          "Setting up comprehensive analytics to track user behavior and conversion funnels helped us iterate on the design and improve conversion rates through data-driven decisions.",
      },
    ],
    designDescription:
      "The landing page features a bold, modern design with vibrant gradients and striking typography. Every element is carefully crafted to guide users toward conversion, with clear value propositions, compelling visuals, and strategic use of whitespace to create a premium, trustworthy feel.",
    outcome: {
      description:
        "AI StarForge has achieved exceptional conversion rates, outperforming industry benchmarks. The engaging design and interactive demo have significantly reduced bounce rates and increased trial signups.",
      stats: [
        { number: "12%", label: "Conversion Rate", color: "green" },
        { number: "3.5min", label: "Avg. Time on Page", color: "cyan" },
        { number: "25%", label: "Bounce Rate", color: "purple" },
      ],
    },
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const getColorClasses = (color) => {
  const colorMap = {
    cyan: {
      text: "text-cyan-400",
      border: "border-cyan-500",
      bg: "bg-cyan-500",
    },
    blue: {
      text: "text-blue-400",
      border: "border-blue-500",
      bg: "bg-blue-500",
    },
    green: {
      text: "text-green-400",
      border: "border-green-500",
      bg: "bg-green-500",
    },
    purple: {
      text: "text-purple-400",
      border: "border-purple-500",
      bg: "bg-purple-500",
    },
    pink: {
      text: "text-pink-400",
      border: "border-pink-500",
      bg: "bg-pink-500",
    },
    orange: {
      text: "text-orange-400",
      border: "border-orange-500",
      bg: "bg-orange-500",
    },
    yellow: {
      text: "text-yellow-400",
      border: "border-yellow-500",
      bg: "bg-yellow-500",
    },
  };
  return colorMap[color] || colorMap.cyan;
};

// ============================================
// COMPONENTS
// ============================================

const HeroSection = ({ project }) => (
  <div
    className="relative w-full h-[60vh] md:h-[70vh]"
    style={{ background: project.gradient }}
  >
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center px-4 max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="inline-block px-4 py-2 bg-pink-600/30 backdrop-blur-sm rounded-full text-sm font-medium border border-pink-500/50">
            Featured Project
          </span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
          {project.title}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
          {project.subtitle}
        </p>
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            View Live Site <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all"
          >
            View Code
          </a>
        </div>
      </div>
    </div>
  </div>
);

const BackButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors group"
  >
    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
    <span>Back to Projects</span>
  </button>
);

const SectionHeader = ({ title, gradient }) => (
  <div className="flex items-center gap-3 mb-6">
    <div
      className={`w-10 h-10 rounded-full ${gradient} flex items-center justify-center`}
    >
      <IconComponent className="w-5 h-5" />
    </div>
    <h2 className="text-3xl font-bold">{title}</h2>
  </div>
);

const OverviewSection = ({ overview }) => (
  <section className="mb-12">
    <SectionHeader
      icon={Target}
      title="Overview"
      gradient="bg-gradient-to-br from-cyan-500 to-blue-600"
    />
    <p className="text-gray-300 text-lg leading-relaxed">{overview}</p>
  </section>
);

const FeaturesSection = ({ features }) => (
  <section className="mb-12">
    <SectionHeader
      icon={Zap}
      title="Key Features"
      gradient="bg-gradient-to-br from-yellow-500 to-orange-600"
    />
    <div className="grid md:grid-cols-2 gap-4">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors"
        >
          <div className="flex items-start gap-4">
            <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const TechStackSection = ({ techStack }) => (
  <section className="mb-12">
    <SectionHeader
      icon={Code}
      title="Tech Stack"
      gradient="bg-gradient-to-br from-purple-500 to-pink-600"
    />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {techStack.map((tech, index) => {
        const colors = getColorClasses(tech.color);
        return (
          <div
            key={index}
            className={`p-4 bg-gray-900 rounded-lg border border-gray-800 text-center hover:${colors.border} transition-colors group`}
          >
            <p className={`font-bold text-lg ${colors.text}`}>{tech.name}</p>
            <p className="text-xs text-gray-500 mt-1">{tech.description}</p>
          </div>
        );
      })}
    </div>
  </section>
);

const ChallengesSection = ({ challenges }) => (
  <section className="mb-12">
    <SectionHeader
      icon={Users}
      title="Challenges & Learnings"
      gradient="bg-gradient-to-br from-orange-500 to-red-600"
    />
    <div className="space-y-6">
      {challenges.map((challenge, index) => (
        <div
          key={index}
          className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 hover:border-orange-500/50 transition-colors"
        >
          <h3 className="text-xl font-bold text-orange-400 mb-3">
            {challenge.title}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {challenge.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

const DesignSection = ({ description }) => (
  <section className="mb-12">
    <SectionHeader
      icon={Sparkles}
      title="Design & Component Composition"
      gradient="bg-gradient-to-br from-indigo-500 to-purple-600"
    />
    <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700">
      <p className="text-gray-300 text-lg leading-relaxed">{description}</p>
    </div>
  </section>
);

const OutcomeSection = ({ outcome }) => (
  <section className="mb-12">
    <SectionHeader
      icon={Target}
      title="Outcome"
      gradient="bg-gradient-to-br from-green-500 to-emerald-600"
    />
    <div className="p-8 bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl border border-green-700/50">
      <p className="text-gray-300 text-lg leading-relaxed mb-8">
        {outcome.description}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {outcome.stats.map((stat, index) => {
          const colors = getColorClasses(stat.color);
          return (
            <div
              key={index}
              className={`text-center p-6 bg-black/40 rounded-xl border ${colors.border}/30 hover:${colors.border}/50 transition-colors`}
            >
              <p className={`text-5xl font-bold ${colors.text} mb-2`}>
                {stat.number}
              </p>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const ProjectImage = ({ title, gradient }) => (
  <div className="mb-12 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
    <div
      className="w-full aspect-video flex items-center justify-center"
      style={{ background: gradient }}
    >
      <div className="text-center text-white p-8">
        <h3 className="text-3xl font-bold mb-2">{title}</h3>
        <p className="text-gray-200">Project Screenshot Preview</p>
      </div>
    </div>
  </div>
);

// ============================================
// MAIN COMPONENT
// ============================================

export default function ProjectDetails() {
  const [currentProjectId, setCurrentProjectId] = React.useState(1);

  const project = projectsData[currentProjectId];

  const handleBack = () => {
    setCurrentProjectId(1);
  };

  const handleProjectChange = (id) => {
    setCurrentProjectId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <HeroSection project={project} />

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-12">
        <BackButton onClick={handleBack} />

        {/* Project Navigation */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {Object.values(projectsData).map((proj) => (
            <button
              key={proj.id}
              onClick={() => handleProjectChange(proj.id)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                currentProjectId === proj.id
                  ? "bg-white text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {proj.title}
            </button>
          ))}
        </div>

        <ProjectImage title={project.title} gradient={project.gradient} />
        <OverviewSection overview={project.overview} />
        <FeaturesSection features={project.features} />
        <TechStackSection techStack={project.techStack} />
        <ChallengesSection challenges={project.challenges} />
        <DesignSection description={project.designDescription} />
        <OutcomeSection outcome={project.outcome} />
      </div>
    </div>
  );
}
