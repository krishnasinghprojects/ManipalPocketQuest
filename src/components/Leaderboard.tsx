import React, { useState, useEffect } from 'react';

// --- Mock Data ---
const topTrainers = [
  { rank: 1, name: 'AshKetchumPro', pokePower: 9850 },
  { rank: 2, name: 'MistyFlow', pokePower: 9600 },
  { rank: 3, name: 'GaryOakRival', pokePower: 9420 },
  { rank: 4, name: 'BrockSolid', pokePower: 9180 },
  { rank: 5, name: 'SerenaGrace', pokePower: 8950 },
  { rank: 6, name: 'AlphaCynthia', pokePower: 8700 },
  { rank: 7, name: 'RocketBlaster', pokePower: 8430 },
  { rank: 8, name: 'EliteLance', pokePower: 8210 },
  { rank: 9, name: 'DawnPiplup', pokePower: 7990 },
  { rank: 10, name: 'RedChampion', pokePower: 7800 },
];

// --- CSS Styles Component ---
// We embed a <style> tag to use advanced CSS like :hover and keyframes.
// This keeps the component self-contained.
const LeaderboardStyles = () => (
  <style>{`
    .leaderboard-container {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-radius: 20px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.25);
      padding: 2rem;
      width: 100%;
    
      color: #ffffff;
      
      /* --- Animation Styling --- */
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s ease-out, transform 0.5s ease-out;
    }

    .leaderboard-container.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .leaderboard-header {
      text-align: center;
      margin-bottom: 2rem; /* Increased margin */
    }

    .leaderboard-title {
      font-family: "Young Serif", serif;
      font-size: 2.5rem; /* Increased font size */
      font-weight: 400;
      margin: 0;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }

    .leaderboard-list {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .leaderboard-list-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0.75rem; /* Increased padding */
      font-family: "Roboto Serif", serif;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      
      /* --- Animation & Transition Styling --- */
      transition: background-color 0.3s ease, transform 0.3s ease;
      opacity: 0;
      transform: translateX(-20px);
    }
    
    .leaderboard-list-item.visible {
        opacity: 1;
        transform: translateX(0);
    }

    /* --- Hover Effect --- */
    .leaderboard-list-item:hover {
      background-color: rgba(255, 255, 255, 0.1);
      transform: scale(1.03);
      border-radius: 8px;
    }

    .leaderboard-list-item:last-child {
      border-bottom: none;
    }

    .item-rank {
      font-weight: 700; /* Bolder */
      font-size: 1.25rem; /* Increased font size */
      min-width: 40px;
      color: rgba(255, 255, 255, 0.9);
    }

    .item-name {
      flex-grow: 1;
      padding: 0 1.25rem; /* Increased padding */
      font-size: 1.1rem; /* Increased font size */
      color: rgba(255, 255, 255, 0.85); /* Softer white for hierarchy */
    }

    .item-score {
      font-weight: 700; /* Bolder */
      font-size: 1.1rem; /* Match name size but bold */
      color: #FFF59D; /* A light yellow to match the theme's highlight */
      min-width: 90px;
      text-align: right;
      text-shadow: 0 0 5px rgba(255, 245, 157, 0.5); /* Add a glow */
    }

    .item-score-label {
      font-size: 0.8rem;
      opacity: 0.7;
      margin-left: 0.25rem;
    }
  `}</style>
);


// --- The React Component ---
const Leaderboard = () => {
  // State to trigger the appearance animations
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a short timeout to allow the component to mount before triggering animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // 100ms delay

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <>
      <LeaderboardStyles />
      <div className={`leaderboard-container ${isVisible ? 'visible' : ''}`}>
        <header className="leaderboard-header">
          <h2 className="leaderboard-title">Top Trainers</h2>
        </header>
        <ul className="leaderboard-list">
          {topTrainers.map((trainer, index) => (
            <li
              key={trainer.rank}
              className={`leaderboard-list-item ${isVisible ? 'visible' : ''}`}
              // Inline style for staggered animation delay
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              <span className="item-rank">{trainer.rank}</span>
              <span className="item-name">{trainer.name}</span>
              <span className="item-score">
                {trainer.pokePower.toLocaleString()}
                <span className="item-score-label">PP</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Leaderboard;