import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import PokemonCardInventory from '@/components/PokemonCardInventory';
import ReturnHome from '@/components/ReturnHome';
import { Link } from 'react-router-dom';

const styles = {
    header: {
        fontFamily: '"Young Serif", serif',
    fontSize: '3.5rem',
    lineHeight: 1.2,
    color: '#FFFFFF',
    textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
    textAlign:'center',
    margin:'20px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '40px',
        justifyItems: 'center',
        padding:'10px'
    },
    emptyText: {
        color: 'white',
        textAlign: 'center' as const,
        fontSize: '1.2rem',
    },
    link: {
        color: '#ffaf7b',
        textDecoration: 'underline'
    }
};

export default function InventoryPage() {
    const { inventory } = useInventory();

    return (
        <div>
            
            <h1 style={styles.header}>My Pokémon Collection</h1>
            {inventory.length > 0 ? (
                <div style={styles.grid}>
                    {inventory.map(pokemon => (
                        <PokemonCardInventory key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            ) : (
                <p style={styles.emptyText}>
                    Your inventory is empty. <Link to="/catch" style={styles.link}>Go catch some!</Link>
                </p>
            )}
            <ReturnHome />
        </div>
    );
}