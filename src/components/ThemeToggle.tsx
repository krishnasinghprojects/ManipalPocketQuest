import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Eye, ChevronDown } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeToggle = () => {
  const { theme, toggleTheme, setColorblindMode, isColorblindMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} className="theme-icon" />;
      case 'dark':
        return <Moon size={20} className="theme-icon" />;
      case 'colorblind':
        return <Eye size={20} className="theme-icon" />;
      default:
        return <Sun size={20} className="theme-icon" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'colorblind':
        return 'Colorblind';
      default:
        return 'Light';
    }
  };

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'colorblind') => {
    if (newTheme === 'colorblind') {
      setColorblindMode();
    } else {
      // For light/dark, use the toggle logic
      if (newTheme === 'dark' && theme !== 'dark') {
        toggleTheme();
      } else if (newTheme === 'light' && theme !== 'light') {
        toggleTheme();
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="theme-toggle-container" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="theme-toggle-btn"
        aria-label={`Current theme: ${getThemeLabel()}. Click to change theme.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {getThemeIcon()}
        <span className="theme-label">{getThemeLabel()}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="theme-dropdown"
          >
            <div className="theme-options">
              <button
                onClick={() => handleThemeChange('light')}
                className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                aria-label="Switch to light theme"
              >
                <Sun size={18} />
                <span>Light</span>
                {theme === 'light' && <div className="active-indicator" />}
              </button>

              <button
                onClick={() => handleThemeChange('dark')}
                className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                aria-label="Switch to dark theme"
              >
                <Moon size={18} />
                <span>Dark</span>
                {theme === 'dark' && <div className="active-indicator" />}
              </button>

              <button
                onClick={() => handleThemeChange('colorblind')}
                className={`theme-option ${theme === 'colorblind' ? 'active' : ''}`}
                aria-label="Switch to colorblind accessible theme"
              >
                <Eye size={18} />
                <span>Colorblind</span>
                {theme === 'colorblind' && <div className="active-indicator" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
