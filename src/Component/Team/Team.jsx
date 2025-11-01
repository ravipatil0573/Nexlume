import React from 'react';
import './Team.css';
import { Link } from 'react-router-dom';
import { FaLinkedin } from "react-icons/fa";

// Import images
import Nikhil from "../../assets/Team/messa.jpg";
import Sanjit from "../../assets/Team/sanju.jpg";
import Ravi from "../../assets/Team/ravi.jpg";
import Aman from "../../assets/Team/aman.jpg";
import Prajwal from "../../assets/Team/Pk.jpg";
import Sanath from "../../assets/Team/anna.jpg";
import GroupImage from "../../assets/Team/group-image.jpg";

// Array of team members
const teamMembers = [
  { name: "Nikhil Messa", role: "Developer", image: Nikhil, linkedin: "https://www.linkedin.com/in/nikhil-messa/" },
  { name: "Sanjit Prajapati", role: "Developer", image: Sanjit, linkedin: "https://www.linkedin.com/in/sanjit-prajapati-5420a9222/" },
  { name: "Ravindra Patil", role: "Developer", image: Ravi, linkedin: "https://www.linkedin.com/in/nikhil-messa/" },
  { name: "Aman Mishra", role: "Developer", image: Aman, linkedin: "https://www.linkedin.com/in/aman-kumar/" },
  { name: "Prajwal Kolure", role: "Creative Designer", image: Prajwal, linkedin: "https://www.linkedin.com/in/rohit-kumar/" },
  { name: "Sanath Shetty", role: "Developer", image: Sanath, linkedin: "https://www.linkedin.com/in/shivani-singh/" },
];

// Reusable Team Card
const TeamCard = ({ member }) => (
  <div className="team-card">
    <div className="card-image">
      <img src={member.image} alt={member.name} />
    </div>
    <div className="card-info">
      <div className="info-text">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
      <div className="card-button">
        <Link to={member.linkedin} target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </Link>
      </div>
    </div>
  </div>
);

const Team = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log('Email submitted:', email);
  };

  return (
    <>
      <section id="team" className="team-body">
        <h1 className="team-container-title">
          Namaste, We're the <br /> Creators of NexLume.
        </h1>

        <div className="team-group">
          <div className="team-group-image">
            <img src={GroupImage} alt="Team Group" />
          </div>
          <div className="team-group-text">
            <h2>OUR AMAZING TEAM</h2>
            <p>
              We are Link group of dedicated professionals, committed to delivering the best results. 
              Together, we create innovative solutions and achieve excellence.
            </p>
          </div>
        </div>

        <div id="teams" className="team-main-container">
          <h2 className="header-team">The People Behind the Vision</h2>
          <div className="team-container">
            {teamMembers.map((member, index) => (
              <TeamCard key={index} member={member} />
            ))}
          </div>
        </div>
      </section>

      <div className="join-team">
        <div className="join-container">
          <h1>Create | Innovate | Transform – with NexLume!</h1>
          <p className="subtitle">
            Bring your skills to Link team that builds software for the next generation of startups.
          </p>
          <div className="form-container">
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email Address" 
              className="email-input" 
              required 
            />
            <button type="button" className="apply-button" onClick={handleSubmit}>
              Enroll Now
            </button>
          </div>
          <p className="contact-info">
            Share your details at{' '}
            <Link to="https://mail.google.com/mail/?view=cm&fs=1&to=nexlume.co@gmail.com" target="_blank" rel="noopener noreferrer">
              nexlume.co@gmail.com
            </Link>{' '}
            and let's build together.
          </p>
        </div>
      </div>
    </>
  );
};

export default Team;
