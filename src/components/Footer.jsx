import React from 'react';

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-section">
        <h4>SmartCureX</h4>
        <p>AI-powered healthcare for a better tomorrow</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#detection">Detection</a></li>
        </ul>
      </div>
      <div className="footer-section">
        <h4>Connect</h4>
        <ul>
          <li><a href="https://github.com/Minos02/SmartCureX">GitHub</a></li>
          <li><a href="https://www.linkedin.com/in/piyush-gupta-aa2795340">LinkedIn</a></li>
          <li><a href="mailto:piyushgupta010204@gmail.com">Contact</a></li>
        </ul>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2025 SmartCureX | Made with ❤️ Digital Mavericks</p>
    </div>
  </footer>
);

export default Footer;
