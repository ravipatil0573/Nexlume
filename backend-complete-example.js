// ============================================
// COMPLETE BACKEND SETUP EXAMPLE
// ============================================

// ============================================
// 1. models/Project.js - Project Model
// ============================================

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  id: { 
    type: Number, 
    required: true, 
    unique: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  name: String, // alternative to title
  subtitle: String,
  overview: String, // alternative to subtitle
  description: { 
    type: [String], 
    default: [] 
  }, // array of feature strings
  tags: { 
    type: [String], 
    default: [] 
  }, // tech stack tags
  screenshots: [String], // array of image URLs
  image: String, // single image URL (alternative to screenshots)
  typography: {
    headings: { type: String, default: "Poppins" },
    body: { type: String, default: "Inter" },
    align: { type: String, default: "left" },
    google: { type: Boolean, default: true }
  },
  palette: [String], // color palette array
  links: {
    demo: String,
    repo: String
  },
  role: String,
  timeline: String,
  color: String,
  gradient: String,
  slug: String
}, { 
  timestamps: true 
});

const Project = mongoose.model("Project", projectSchema);

// export default Project; // Uncomment when this is in models/Project.js

// ============================================
// 2. routes/projects.js - Route Handler
// ============================================
// NOTE: This section should be in a SEPARATE file: routes/projects.js
// In that file, you would import: import Project from "../models/Project.js";

import express from "express";
// For this example file, we're using the Project declared above
const router = express.Router();

// GET /api/projects/:id - Get single project
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by numeric ID first
    let project = await Project.findOne({ id: Number(id) });
    
    // If not found by numeric ID, try MongoDB _id
    if (!project && mongoose.Types.ObjectId.isValid(id)) {
      project = await Project.findById(id);
    }
    
    if (!project) {
      return res.status(404).json({ 
        error: "Project not found",
        message: `No project found with ID: ${id}`
      });
    }
    
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

// GET /api/projects - Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

// export default router; // Uncomment when this is in routes/projects.js

// ============================================
// 3. scripts/seedProjects.js - Seed Sample Data
// ============================================
// NOTE: This section should be in a SEPARATE file: scripts/seedProjects.js
// In that file, you would import: import Project from "../models/Project.js";

import dotenv from "dotenv";
// For this example file, we're using the Project and mongoose declared above

dotenv.config();

const sampleProjects = [
  {
    id: 1,
    title: "SAFARNAMA",
    subtitle: "Where Adventure Meets Simplicity",
    overview: "Embark on extraordinary journeys with Safarnama, where every trip is crafted to perfection. From breathtaking landscapes to cultural wonders, we curate seamless itineraries and exclusive experiences tailored for modern explorers.",
    description: [
      "Seamless trip planning and booking",
      "Curated travel experiences",
      "Real-time itinerary management",
      "Multi-destination support",
      "Travel guide integration",
      "Mobile-first responsive design"
    ],
    tags: ["Tours and Travel", "Logo Design", "React", "Node.js", "MongoDB"],
    screenshots: [
      "/path/to/safarnama-screenshot-1.jpg",
      "/path/to/safarnama-screenshot-2.jpg"
    ],
    typography: {
      headings: "Poppins",
      body: "Inter",
      align: "left",
      google: true
    },
    palette: ["#060010", "#C80000", "#FFFFFF"],
    links: {
      demo: "https://safarnama-demo.com",
      repo: "https://github.com/yourusername/safarnama"
    },
    role: "Full Stack Developer",
    timeline: "3 months",
    color: "#C80000",
    slug: "safarnama"
  },
  {
    id: 2,
    title: "NEXSHOW",
    subtitle: "Where Cinema Meets Convenience",
    overview: "Book your favorite movies effortlessly with NexShow, your one-stop destination for seamless movie ticket booking. Discover the latest blockbusters, explore showtimes, and secure the best seats—all with a few clicks.",
    description: [
      "Easy movie ticket booking",
      "Real-time seat selection",
      "Showtime management",
      "User reviews and ratings",
      "Payment integration",
      "Email notifications"
    ],
    tags: ["Movie Booking", "Logo Design", "React", "Express", "MongoDB"],
    screenshots: [
      "/path/to/nexshow-screenshot-1.jpg",
      "/path/to/nexshow-screenshot-2.jpg"
    ],
    typography: {
      headings: "Poppins",
      body: "Inter",
      align: "left",
      google: true
    },
    palette: ["#060010", "#C80000", "#FFFFFF"],
    links: {
      demo: "https://nexshow-demo.com",
      repo: "https://github.com/yourusername/nexshow"
    },
    role: "Full Stack Developer",
    timeline: "4 months",
    color: "#C80000",
    slug: "nexshow"
  },
  {
    id: 3,
    title: "STYLORA",
    subtitle: "Where Style Meets Simplicity",
    overview: "Step into a world of trendsetting fashion with Stylora, your go-to destination for the latest styles and timeless classics. From chic casuals to elegant formals, we bring you a curated collection of apparel.",
    description: [
      "E-commerce platform",
      "Product catalog management",
      "Shopping cart functionality",
      "Secure checkout process",
      "Order tracking",
      "User account management"
    ],
    tags: ["E-commerce", "Logo Design", "React", "Node.js", "MongoDB", "Stripe"],
    screenshots: [
      "/path/to/stylora-screenshot-1.jpg",
      "/path/to/stylora-screenshot-2.jpg"
    ],
    typography: {
      headings: "Poppins",
      body: "Inter",
      align: "left",
      google: true
    },
    palette: ["#060010", "#C80000", "#FFFFFF"],
    links: {
      demo: "https://stylora-demo.com",
      repo: "https://github.com/yourusername/stylora"
    },
    role: "Full Stack Developer",
    timeline: "5 months",
    color: "#C80000",
    slug: "stylora"
  }
];

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing projects (optional)
    await Project.deleteMany({});
    console.log("🗑️  Cleared existing projects");

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log("✅ Seeded projects successfully");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding projects:", error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedProjects();
}

// ============================================
// 4. How to use:
// ============================================
/*
1. Create the model file: models/Project.js
2. Create the routes file: routes/projects.js
3. Run the seed script: node scripts/seedProjects.js
4. Your API will be ready at:
   - GET http://localhost:5000/api/projects (all projects)
   - GET http://localhost:5000/api/projects/1 (Safarnama)
   - GET http://localhost:5000/api/projects/2 (Nexshow)
   - GET http://localhost:5000/api/projects/3 (Stylora)
*/


