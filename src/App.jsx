import "./App.css";
import { Routes, Route } from "react-router-dom";
import { RingLoader } from "react-spinners";
import { useState, useEffect } from "react";

import Home from "./Home";
import Footer from "./Component/Footer/Footer";
import Navbar from "./Component/Navbar/Navbar";
import Contact from "./Component/Contacts/Contact";
import Services from "./Component/Service/Service";
import Projects from "./Component/Projects/Project";
import ProjectDetails from "./Component/Projects/ProjectDetails";
import Team from "./Component/Team/Team";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 3000);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return (
    <>
      {loading ? (
        // 🌀 Loader
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0a0a0a",
          }}
        >
          <RingLoader color="#d40000ff" size={60} />
        </div>
      ) : (
        // 🌐 Actual App
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/team" element={<Team />} />
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
}

export default App;
