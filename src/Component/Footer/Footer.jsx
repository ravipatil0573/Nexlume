import React from "react";
import CircularText from "./CircularText";
import "./Footer.css";

const socialLinks = [
  { text: "TELEGRAM", url: "https://t.me/IggaDark" },
  { text: "GitHub", url: "viber://chat?number=+380674347527" },
  {
    text: "WHATSAPP",
    url: "https://api.whatsapp.com/send?phone=+380674347527",
  },
  {
    text: "LINKEDIN",
    url: "https://www.linkedin.com/in/igor-okunskyi-🇺🇦-08a5691a5/",
  },
  { text: "INSTAGRAM", url: "https://www.instagram.com/okunskyi_uiux/" },
];

export default function Footer() {
  return (
    <footer className="custom-footer">
      <div className="footer-title">SAY HELLO</div>

      {/* Top social links */}
      <div className="footer-social top">
        {socialLinks.slice(0, 3).map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        ))}
      </div>

      {/* Center circular button */}
      <div className="center-container">
        <CircularText
          text="REACT*BITS*COMPONENTS*"
          onHover="speedUp"
          spinDuration={20}
          className="custom-class"
        ></CircularText>

        <div className="yellow-circle">
          <span className="circle-arrow">&#8599;</span>
        </div>
      </div>

      {/* Bottom social links */}
      <div className="footer-social bottom">
        {socialLinks.slice(3).map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
            {link.text}
          </a>
        ))}
      </div>

      {/* Footer bottom */}
      <div className="footer-bottom">
        <a href="mailto:NexLume.Co@GMAIL.COM">NEXLUME.CO@GMAIL.COM</a>
        <span>© 2024</span>
        <a href="/privacy-policy">PRIVACY POLICY</a>
      </div>
    </footer>
  );
}
