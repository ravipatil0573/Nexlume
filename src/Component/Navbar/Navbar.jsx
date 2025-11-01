import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Navbar.css";

import logoImage from "../../assets/logo.png"; // Import the logo image

const Navbar = () => {
  // const [scrolled, setScrolled] = useState(false);

  // // Handle scroll effect
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setScrolled(true);
  //     } else {
  //       setScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    // <header className={`fixed-top ${scrolled ? "navbar-scrolled" : ""}`}>
    <header className="">
      <nav className="navbar navbar-dark bg-black">
        <div className="container-fluid px-0">
          {/* Desktop Navigation */}
          <div className="desktop-nav d-none d-lg-flex">
            <Link className="nav-link" to="/projects">
              PROJECTS
            </Link>
            <Link className="nav-link" to="/services">
              SERVICES
            </Link>

            {/* Center logo */}
            <Link to="/" className="navbar-brand">
              <img src={logoImage} alt="NEXLUME Logo" className="logo-img" />
            </Link>

            <Link className="nav-link" to="/team">
              TEAM
            </Link>
            <Link className="nav-link" to="/contact">
              CONTACT
            </Link>
          </div>

          {/* Mobile view */}
          <div className="d-flex d-lg-none justify-content-between align-items-center w-100">
            <Link to="/" className="navbar-brand">
              <img
                src={logoImage}
                alt="NEXLUME Logo"
                className="logo-img-mobile"
              />
            </Link>
            <button
              className="navbar-toggler border-0"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarContent"
              aria-controls="navbarContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Mobile menu */}
          <div className="collapse navbar-collapse" id="navbarContent">
            <ul className="navbar-nav d-lg-none text-center mt-3">
              <li className="nav-item">
                <Link className="nav-link text-white py-2" to="/projects">
                  PROJECTS
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white py-2" to="/services">
                  SERVICES
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white py-2" to="/team">
                  TEAM
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white py-2" to="/contact">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
