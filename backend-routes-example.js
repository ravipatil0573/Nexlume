// routes/projects.js
// This is an example file - copy this to your backend routes/projects.js

import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// ============================================
// Option 1: If you have a Project Model
// ============================================

// Assuming you have a Project model like this:
/*
const projectSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  name: String, // alternative to title
  subtitle: String,
  overview: String, // alternative to subtitle
  description: { type: [String], default: [] }, // array of feature strings
  tags: { type: [String], default: [] }, // tech stack tags
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
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);
*/

// GET /api/projects/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by numeric ID first (if you're using numeric IDs)
    let project = await Project.findOne({ id: Number(id) });
    
    // If not found by numeric ID, try MongoDB _id
    if (!project) {
      if (mongoose.Types.ObjectId.isValid(id)) {
        project = await Project.findById(id);
      }
    }
    
    if (!project) {
      return res.status(404).json({ 
        error: "Project not found",
        message: `No project found with ID: ${id}`
      });
    }
    
    // Return the project as JSON
    res.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

// GET /api/projects (get all projects)
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ id: 1 }); // Sort by id ascending
    res.json(projects); // or res.json({ data: projects }) if you prefer
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
});

export default router;


