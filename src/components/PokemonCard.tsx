import React from 'react';

// Define the type for a Pokémon object
export interface Pokemon {
  name: string;
  type: string;
  image: string;
  description: string;
}

// --- Helper function to get a color based on Pokémon type for styling ---
const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
        fire: '#F57D31',      // Orange
        water: '#6493EB',     // Blue
        grass: '#74CB48',     // Green
        electric: '#F9CF30',  // Yellow
        psychic: '#FB5584',   // Pink
        ice: '#9AD6DF',       // Light Blue
        dragon: '#7037FF',    // Purple
        dark: '#75574C',      // Brown
        fairy: '#E69EAC',     // Light Pink
        normal: '#AAA67F',    // Gray
        fighting: '#C12239',  // Red
        flying: '#A891EC',    // Lavender
        poison: '#A43E9E',    // Dark Purple
        ground: '#DEC16B',    // Sand
        rock: '#B69E31',      // Dark Sand
        bug: '#A7B723',       // Lime Green
        ghost: '#70559B',     // Dark Lavender
        steel: '#B7B9D0',     // Light Steel
    };
    return colors[type.toLowerCase()] || '#A8A878'; // Default color
};

// --- Main Component Props ---
interface PokemonCardProps {
    pokemon: Pokemon | null;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
    // If pokemon is null or undefined, render nothing to prevent errors.
    if (!pokemon) {
        return null;
    }

    // --- Dynamic Styles based on Pokémon type ---
    const typeColor = getTypeColor(pokemon.type);

    const cardStyle: React.CSSProperties = {
        width: '320px',
        padding: '20px',
        borderRadius: '20px',
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        color: 'white',
        textAlign: 'center',
        // --- IMPORTANT ---
        // No background property is set here as requested.
        // The transition property animates changes to transform and boxShadow.
        transition: 'transform 0.4s ease, box-shadow 0.4s ease',
        // Initial transform state for the 3D effect
        transform: 'perspective(1000px) rotateY(0deg)',
        // A default shadow that will change on hover
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    };

    const imageContainerStyle: React.CSSProperties = {
        width: '200px',
        height: '200px',
        margin: '0 auto 10px',
        backgroundColor: typeColor, // Background color based on Pokémon type
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
                // Apply 3D rotation and lift the card with a more pronounced shadow
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(15deg) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.4)';
            }}
            onMouseLeave={(e) => {
                // Return to the default state
                e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
        >
            <div style={imageContainerStyle}>
                <img
                    src={pokemon.image}
                    alt={pokemon.name}
                    style={imageStyle}
                    // Fallback for broken image links
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