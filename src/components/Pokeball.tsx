// src/components/Pokeball.tsx
import React from 'react';

const styles: { [key: string]: React.CSSProperties } = {
    pokeball: {
        width: '60px',
        height: '60px',
        cursor: 'pointer',
        position: 'absolute',
        transition: 'top 0.5s ease-in-out, left 0.5s ease-in-out',
        // The 'pulse' animation is defined in animations.css
    },
    pokeballImage: {
        width: '100%',
        height: '100%',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
    }
};

interface PokeballProps {
    onClick: () => void;
    position: { top: string; left: string };
}

const Pokeball: React.FC<PokeballProps> = ({ onClick, position }) => {
    return (
        <div onClick={onClick} style={{ ...styles.pokeball, ...position }} className="pulse">
            <img 
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" 
                alt="Pokeball" 
                style={styles.pokeballImage}
            />
        </div>
    );
};

export default Pokeball;