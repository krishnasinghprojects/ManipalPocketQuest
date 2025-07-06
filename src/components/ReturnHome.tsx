import React from 'react';

// It's recommended to handle routing with a library like React Router.
// For this standalone example, the button is an anchor tag `<a>` that navigates to the root path "/".
// In a real app, you might replace it with:
// import { Link } from 'react-router-dom';
// <Link to="/" ...>

/**
 * A standalone SVG icon component for the home symbol.
 * This avoids external dependencies and keeps the button self-contained.
 * @param {object} props - Standard SVG properties.
 */
const HomeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);


/**
 * A reusable button component with a "glassmorphism" effect.
 * It's designed to be a "Return Home" button that navigates to the root URL.
 */
const GlassyHomeButton = () => {
  // The styles are defined directly here for simplicity and to keep the component standalone.
  // In a larger application, these would typically be in a separate CSS/SCSS file or a CSS-in-JS solution.
  const styles = `
    .glassy-button-container {
      /* This style is for the <a> tag */
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 24px;
      
      /* --- The Glassmorphism Effect --- */
      background: rgba(255, 255, 255, 0.2); /* Semi-transparent white background */
      backdrop-filter: blur(10px); /* The key ingredient for the frosted glass look */
      -webkit-backdrop-filter: blur(10px); /* For Safari support */
      border: 1px solid rgba(255, 255, 255, 0.3); /* A subtle border to catch the light */
      border-radius: 16px;
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2); /* A soft shadow to lift the button */

      /* --- Typography & Appearance --- */
      color: #ffffff;
      font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
      cursor: pointer;

      /* --- Smooth Transitions --- */
      transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    }

    .glassy-button-container:hover {
      background: rgba(255, 255, 255, 0.35); /* Lighten the background on hover */
      box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.25); /* Enhance the shadow */
      transform: translateY(-3px); /* Lift the button slightly */
    }
    
    .glassy-button-container:active {
      transform: translateY(-1px); /* Give a "pressing down" effect */
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <a href="/" className="glassy-button-container">
        <HomeIcon />
        <span>Return Home</span>
      </a>
    </>
  );
};


/**
 * Main App component to demonstrate the GlassyHomeButton.
 * The background gradient is crucial for the glass effect to be visible.
 */
export default function App() {
  const appStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding:'40px',
  };

  return (
    <div style={appStyles}>
      <GlassyHomeButton />
    </div>
  );
}
