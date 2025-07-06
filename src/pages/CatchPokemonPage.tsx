// CatchPokemonPage.tsx
import React, { useState, useEffect } from 'react';
import { useInventory } from '@/contexts/InventoryContext';
import PokemonCard from '@/components/PokemonCard';
import QuizCard from '@/components/QuizCard';
import Pokeball from '@/components/Pokeball';
import { Pokemon, QuizQuestion } from '@/types';
import { quizQuestions } from '@/data/quizData';
import '@/styles/animations.css';
import ReturnHome from '@/components/ReturnHome';

const styles = {
    container: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative' as const,
        perspective: '1500px',
    },
};

export default function CatchPokemonPage() {
    type GameState = 'IDLE' | 'FETCHING' | 'QUIZ' | 'REWARD';
    const [gameState, setGameState] = useState<GameState>('IDLE');
    const { addPokemonToInventory } = useInventory();

    const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
    const [pokeballPosition, setPokeballPosition] = useState({ top: '50%', left: '50%' });
    
    const [isFlipping, setIsFlipping] = useState(false);
    const [isWrong, setIsWrong] = useState(false);

    const handlePokeballClick = async () => {
        if (gameState !== 'IDLE') return;
        setGameState('FETCHING');

        const randomId = Math.floor(Math.random() * 200) + 1;
        try {
            const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            const pokeData = await pokeRes.json();
            const speciesRes = await fetch(pokeData.species.url);
            const speciesData = await speciesRes.json();
            const description = speciesData.flavor_text_entries.find(
                (entry: any) => entry.language.name === 'en'
            )?.flavor_text.replace(/[\n\f]/g, ' ') || 'No description available.';

            // FIXED: Ensure the new Pokemon is correctly set in state *before* the quiz.
            const newPokemon: Pokemon = {
                id: pokeData.id,
                name: pokeData.name.charAt(0).toUpperCase() + pokeData.name.slice(1),
                image: pokeData.sprites.other['official-artwork'].front_default,
                type: pokeData.types[0].type.name,
                description,
            };
            setCurrentPokemon(newPokemon); // This is the random pokemon for this round

            const randomQuestion = quizQuestions[Math.floor(Math.random() * quizQuestions.length)];
            setCurrentQuestion(randomQuestion);

            setGameState('QUIZ');
        } catch (error) {
            console.error("Failed to fetch Pokémon data:", error);
            setGameState('IDLE'); // Reset on error
        }
    };

    const handleAnswer = (isCorrect: boolean) => {
        if (gameState !== 'QUIZ') return;

        if (isCorrect && currentPokemon) {
            // Correct Answer: Add to inventory and trigger the flip animation
            addPokemonToInventory(currentPokemon);
            setGameState('REWARD');
            setIsFlipping(true);

            // Reset the game after the animation
            setTimeout(() => {
                setIsFlipping(false);
                setGameState('IDLE');
                spawnNewPokeball();
            }, 2500);
        } else {
            // Wrong Answer: Trigger shake animation and reset
            setIsWrong(true);
            setTimeout(() => {
                setIsWrong(false);
                setGameState('IDLE');
                spawnNewPokeball();
            }, 1500);
        }
    };
    
    const spawnNewPokeball = () => {
        setPokeballPosition({
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
        });
    };
    
    useEffect(() => {
        spawnNewPokeball();
    }, []);

    return (
        <main style={styles.container}>
            {gameState === 'IDLE' && <Pokeball onClick={handlePokeballClick} position={pokeballPosition} />}
            
            {/* The flipper now only renders when there's a quiz or reward */}
            {(gameState === 'QUIZ' || gameState === 'REWARD') && currentQuestion && currentPokemon && (
                <div className={`card-flipper ${isFlipping ? 'is-flipping' : ''}`}>
                    <div className={`card-front ${isWrong ? 'shake' : ''}`}>
                        <QuizCard question={currentQuestion} onAnswer={handleAnswer}  />
                    </div>
                    <div className="card-back">
                        {/* This now correctly shows the pokemon from the current round */}
                        <PokemonCard pokemon={currentPokemon} />
                    </div>
                </div>
            )}
              <ReturnHome />
        </main>
    );
}