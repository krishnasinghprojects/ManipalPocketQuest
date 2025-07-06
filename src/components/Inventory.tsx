import React from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import PokemonCard from '@/components/PokemonCard';
import ReturnHome from '@/components/ReturnHome';
import { Link } from 'react-router-dom';

const styles = {
    page: {
        background: 'linear-gradient(to bottom, #23272F, #1C1F26)',
        minHeight: '100vh',
        padding: '40px',
        fontFamily: 'sans-serif',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '50px',
        color: 'white',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)',
    },
    link: {
        padding: '10px 20px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '10px',
        transition: 'background-color 0.2s',
        border: '1px solid rgba(255, 255, 255, 0.2)',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '40px',
        justifyItems: 'center',
    },
    emptyContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255, 255, 255, 0.7)',
        height: '60vh',
    },
    emptyText: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
};

export default function InventoryPage() {
    const { inventory } = useInventory();

    return (
        <div style={styles.page}>
            <header style={styles.header}>
                <h1 style={styles.title}>My Pokémon Collection</h1>
                <Link to="/catch" style={styles.link} onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'} onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}>
                    Catch More Pokémon
                </Link>
            </header>
            
            {inventory.length > 0 ? (
                <div style={styles.grid}>
                    {inventory.map(pokemon => (
                        <PokemonCard key={pokemon.id} pokemon={pokemon} />
                    ))}
                </div>
            ) : (
                <div style={styles.emptyContainer}>
                    <p style={styles.emptyText}>Your inventory is empty.</p>
                    <p>Time to start your adventure!</p>
                </div>
            )}

            <ReturnHome></ReturnHome>
        </div>
    );
}