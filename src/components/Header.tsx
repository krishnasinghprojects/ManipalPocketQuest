import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import VoiceNavigation from './VoiceNavigation';
import Narrator from './Narrator';
import { Link } from 'react-router-dom';
import Pokeball from './Pokeball';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Catch', href: '/catch' },
    { name: 'Inventory', href: '/inventory' },
    { name: 'Leaderboard', href: '/leaderboard' },
    { name: 'Pokémon', href: '/chatbot' },
    { name: 'Challenges', href: '/challenges' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Pokeball" style={{ width: 32, height: 32, marginRight: 8 }} />
              <span className="logo-text"></span>
            </div>
            
            <span className="brand-name">Manipal PokeQuest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="nav-link"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile, Theme Toggle & Mobile Menu */}
          <div className="header-actions">
            <VoiceNavigation />
            <Narrator 
              text="Welcome to Manipal PokeQuest. Navigate through the menu to explore different features like catching Pokemon, viewing your inventory, checking the leaderboard, chatting with our AI assistant, taking health challenges, and exploring disease outbreak data."
              className="header-narrator"
            />
            <ThemeToggle />
            <div className="user-profile">
              <div className="profile-avatar">
                <User size={16} />
              </div>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-btn"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <nav className="mobile-nav-content">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="mobile-nav-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
