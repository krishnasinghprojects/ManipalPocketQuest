import React from 'react';
import Leaderboard from "@/components/Leaderboard";
import ReturnHome from "@/components/ReturnHome";
 const heroTitleStyle: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '3.5rem',
    lineHeight: 1.2,
    color: '#FFFFFF',
    textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
    textAlign: 'center',
    margin: '20px',
  };
const LeaderboardPage = () => {
  return (
    <div style={{padding: '20px'}}>
      <div className="max-w-4xl mx-auto">
        <h1 style={heroTitleStyle}>Trainer Leaderboard</h1>
        <Leaderboard />
        <ReturnHome />
      </div>
    </div>
  );
};

export default LeaderboardPage;
