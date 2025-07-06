import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Type Definition ---
interface Pokemon {
  name: string;
  image: string;
  type: string;
  description: string;
}

// --- Type Color Helper ---
const getTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    fire: '#F57D31', water: '#6493EB', grass: '#74CB48', electric: '#F9CF30',
    psychic: '#FB5584', ice: '#9AD6DF', dragon: '#7037FF', dark: '#75574C',
    fairy: '#E69EAC', normal: '#AAA67F', fighting: '#C12239', flying: '#A891EC',
    poison: '#A43E9E', ground: '#DEC16B', rock: '#B69E31', bug: '#A7B723',
    ghost: '#70559B', steel: '#B7B9D0',
  };
  return colors[type.toLowerCase()] || '#A8A878';
};

// --- Sample Pokémon List ---
const pokemons: Pokemon[] = [
  { name: 'Bulbasaur', type: 'Grass/Poison', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png', description: 'A strange seed was planted on its back at birth. The plant sprouts and grows with this Pokémon.' },
  { name: 'Charmander', type: 'Fire', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png', description: 'Obviously prefers hot places. When it rains, steam is said to spout from the tip of its tail.' },
  { name: 'Squirtle', type: 'Water', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png', description: 'Shoots water at prey while in the water. Withdraws into its shell when in danger.' },
  { name: 'Pikachu', type: 'Electric', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png', description: 'When several of these Pokémon gather, their electricity could build and cause lightning storms.' },
  { name: 'Jigglypuff', type: 'Normal/Fairy', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/039.png', description: 'Uses its alluring eyes to enrapture its foe. It then sings a pleasing melody that lulls the foe to sleep.' },
  { name: 'Machop', type: 'Fighting', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/066.png', description: 'Loves to build its muscles. It trains in all styles of martial arts to become even stronger.' },
  { name: 'Abra', type: 'Psychic', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png', description: 'Sleeps 18 hours a day. If it senses danger, it will teleport itself to safety even while asleep.' },
  { name: 'Charizard', type: 'Fire/Flying', image: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/006.png', description: 'It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.' },
];

// --- Main App Component ---
export default function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % pokemons.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: 'Inter, sans-serif',
    }}>
      <StyleInjector />
      <AnimatePresence mode="wait">
        <motion.div
          key={pokemons[index].name}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <PokemonCard pokemon={pokemons[index]} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- Pokemon Card Component ---
interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const typeColor = getTypeColor(pokemon.type);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { top, left, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    const rotateY = x * 15;
    const rotateX = -y * 15;
    const glowX = x * 100 + 50;
    const glowY = y * 100 + 50;
    const glowOpacity = Math.max(Math.abs(x), Math.abs(y)) * 0.6;

    cardRef.current.style.setProperty('--glow-x', `${glowX}%`);
    cardRef.current.style.setProperty('--glow-y', `${glowY}%`);
    cardRef.current.style.setProperty('--glow-opacity', `${glowOpacity}`);
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--glow-opacity', '0');
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const dynamicCardInnerStyle: React.CSSProperties = {
    ...styles.cardInner,
    background: `linear-gradient(135deg, ${typeColor}25, transparent 60%), rgba(255, 255, 255, 0.1)`,
  };

  const dynamicImageContainerStyle: React.CSSProperties = {
    ...styles.pokemonImageContainer,
    boxShadow: `0 0 25px -5px ${typeColor}`,
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ ...styles.card }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div style={dynamicCardInnerStyle}>
        <div style={dynamicImageContainerStyle}>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={styles.pokemonImage}
          />
        </div>
        <div style={styles.typeBadge}>{pokemon.type}</div>
        <h2 style={styles.pokemonName}>{pokemon.name}</h2>
        <p style={styles.pokemonDescription}>{pokemon.description}</p>
      </div>
    </motion.div>
  );
};

// --- Styles ---
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    width: 360,
    height: 450,
    padding: 20,
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.1s ease-out',
    '--glow-x': '50%',
    '--glow-y': '50%',
    '--glow-opacity': '0',
  } as React.CSSProperties,
  cardInner: {
    position: 'absolute',
    width: '90%',
    height: '100%',
    borderRadius: '20px',
    overflow: 'hidden',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    border: '1.5px solid rgba(255, 255, 255, 0.2)',
    transformStyle: 'preserve-3d',
    transform: 'translateZ(0)',
  },
  pokemonImageContainer: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translateX(-50%) translateZ(80px)',
  },
  pokemonImage: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
    filter: 'drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.5))',
    pointerEvents: 'none',
  },
  pokemonName: {
    fontFamily: '"Young Serif", serif',
    fontWeight: '400',
    position: 'absolute',
    top: '230px',
    width: '100%',
    textAlign: 'center',
    color: 'white',
    fontSize: '32px',
    textTransform: 'capitalize',
    textShadow: '0 2px 5px rgba(0, 0, 0, 0.6)',
    transform: 'translateZ(60px)',
  },
  typeBadge: {
    position: 'absolute',
    fontFamily: '"Young Serif", serif',
    top: '285px',
    left: '50%',
    transform: 'translateX(-50%) translateZ(50px)',
    padding: '5px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '20px',
    fontSize: '14px',
    textTransform: 'uppercase',
    color: 'white',
    letterSpacing: '1px',
  },
  pokemonDescription: {
    fontFamily: '"Roboto Serif", serif',
    position: 'absolute',
    bottom: '25px',
    left: '25px',
    right: '25px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: '14px',
    fontWeight: 400,
    textAlign: 'center',
    textShadow: '0 1px 3px rgba(0, 0, 0, 0.4)',
    transform: 'translateZ(40px)',
  },
};

// --- Glow Effect Style Injector ---
const StyleInjector: React.FC = () => {
  useEffect(() => {
    const styleId = 'pokemon-glow-style';
    if (document.getElementById(styleId)) return;

    const styleElement = document.createElement('style');
    styleElement.id = styleId;
    styleElement.innerHTML = `
      [style*="backdrop-filter: blur(12px)"]::before {
        content: '';
        position: absolute;
        left: 0; top: 0;
        width: 100%; height: 100%;
        background: radial-gradient(
          circle at var(--glow-x) var(--glow-y),
          rgba(255, 255, 255, 0.6),
          transparent 50%
        );
        opacity: var(--glow-opacity);
        transition: opacity 0.2s ease-in-out;
        mix-blend-mode: screen;
        transform: translateZ(30px);
        pointer-events: none;
      }
    `;
    document.head.appendChild(styleElement);
    return () => {
      const style = document.getElementById(styleId);
      if (style) document.head.removeChild(style);
    };
  }, []);
  return null;
};

export { PokemonCard as PokemonCardHero };
