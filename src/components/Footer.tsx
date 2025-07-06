
import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';
import ErrorButton from './ErrorButton';
import LoadingButton from './LoadingButton';

const Footer = () => {
  const footerLinks = [
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
  ];

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' },
  ];

  return (
    <footer className="footer" style={{background: 'var(--background-primary)'}}>
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <div className="logo-icon" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Pokeball" style={{ width: 32, height: 32, marginRight: 8 }} />
              <span className="logo-text"></span>
            </div>
              </div>
              <span className="brand-name">Manipal PokeQuest</span>
            </div>
            <p className="footer-description" >
              Transforming health awareness through gamification and real-time data. 
              Your journey to better health starts here.
            </p>
            <div style={{display:'flex', flexDirection:'row', gap:'10px'}}>
            <ErrorButton />
            <LoadingButton />
            </div>
          </div>

          {/* Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="social-link"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2024 Manipal PokeQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
