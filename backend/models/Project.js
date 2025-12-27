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

export default Project;

