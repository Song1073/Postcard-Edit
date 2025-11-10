import React from 'react'
import { Heart, Github, Mail } from 'lucide-react'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Greeting Card Maker</h4>
            <p className="footer-text">
              Create beautiful, personalized greeting cards for any occasion.
            </p>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul className="footer-links">
              <li><a href="#templates">Card Templates</a></li>
              <li><a href="#customize">Customize</a></li>
              <li><a href="#export">Export PDF</a></li>
              <li><a href="#email">Send eCards</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="mailto:contact@cardmaker.com" className="social-link" title="Email">
                <Mail size={20} />
              </a>
              <a href="https://github.com" className="social-link" title="GitHub">
                <Github size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            Made with <Heart size={16} className="heart-icon" /> • © {currentYear} Greeting Card Maker
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

