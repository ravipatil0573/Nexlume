import express from "express";
import mongoose from "mongoose";
import Project from "../models/Project.js";

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

export default router;

