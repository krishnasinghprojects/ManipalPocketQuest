import React from 'react';

export interface Pokemon {
  name: string;
  type: string;
  image: string;
  description: string;
}

const getTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    fire: '#F57D31',
    water: '#6493EB',
    grass: '#74CB48',
    electric: '#F9CF30',
    psychic: '#FB5584',
    ice: '#9AD6DF',
    dragon: '#7037FF',
    dark: '#75574C',
    fairy: '#E69EAC',
    normal: '#AAA67F',
    fighting: '#C12239',
    flying: '#A891EC',
    poison: '#A43E9E',
    ground: '#DEC16B',
    rock: '#B69E31',
    bug: '#A7B723',
    ghost: '#70559B',
    steel: '#B7B9D0',
  };
  return colors[type.toLowerCase()] || '#A8A878';
};

interface PokemonCardProps {
  pokemon: Pokemon | null;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  if (!pokemon) {
    return null;
  }

  const typeColor = getTypeColor(pokemon.type);

  const cardStyle: React.CSSProperties = {
    width: '320px',
    padding: '20px',
    borderRadius: '20px',
    fontFamily: '"Segoe UI", Roboto, sans-serif',
    color: 'white',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.1)', // Glassmorphic background
    backdropFilter: 'blur(10px) saturate(180%)', // Glassmorphic blur
    WebkitBackdropFilter: 'blur(10px) saturate(180%)', // For Safari
    border: '1px solid rgba(255, 255, 255, 0.125)', // Subtle border
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    transform: 'perspective(1000px) rotateY(0deg)',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // Glassmorphic shadow
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const imageContainerStyle: React.CSSProperties = {
    width: '200px',
    height: '200px',
    margin: '0 auto 10px',
    backgroundColor: typeColor,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `inset 0 0 15px rgba(0,0,0,0.4), 0 0 10px ${typeColor}50`,
  };

  const imageStyle: React.CSSProperties = {
    width: '90%',
    height: '90%',
    objectFit: 'contain',
    filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.5))',
  };

  const nameStyle: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '2rem',
    textTransform: 'capitalize',
    margin: '10px 0',
    textShadow: '0 2px 4px rgba(0,0,0,0.5)',
  };

  const typeBadgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '6px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  };

  const descriptionStyle: React.CSSProperties = {
    fontFamily: '"Roboto Serif", serif',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: '15px',
    minHeight: '80px',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(15deg) scale(1.05)';
        e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
      }}
    >
      <div style={imageContainerStyle}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          style={imageStyle}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = `https://placehold.co/200x200/454d55/FFFFFF?text=${pokemon.name}&font=roboto`;
          }}
        />
      </div>
      <h2 style={nameStyle}>{pokemon.name}</h2>
      <div style={typeBadgeStyle}>{pokemon.type}</div>
      <p style={descriptionStyle}>{pokemon.description}</p>
    </div>
  );
};

export default PokemonCard;