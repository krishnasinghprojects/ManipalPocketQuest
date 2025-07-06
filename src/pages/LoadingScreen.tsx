import ReturnHome from '@/components/ReturnHome';
import React, { useState, useEffect } from 'react';

// --- Helper Types for PokeAPI data ---
interface PokemonSprite {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}

interface PokemonData {
  name: string;
  image: string;
  fact: string;
}

// --- Main Loading Screen Component ---
const LoadingScreen: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<PokemonData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // --- Style Objects for better readability ---
  const styles = {
    // Main container with the gradient background from your design
    container: `
      flex flex-col items-center justify-center min-h-screen  
      p-4 text-white font-['Roboto_Serif']
    `,
    // The glass-morphism card with new hover and transition effects
    card: `
      bg-white/20 backdrop-blur-xl rounded-2xl shadow-lg 
      p-6 md:p-8 flex flex-col items-center text-center 
      w-full max-w-md border border-white/30
      transform-gpu transition-all duration-500 ease-in-out
      hover:scale-105 hover:shadow-2xl
    `,
    // Pokémon image style with a new floating animation
    pokemonImage: `
      w-48 h-48 md:w-56 md:w-56 object-contain -mt-24 md:-mt-32 
      drop-shadow-[0_15px_15px_rgba(0,0,0,0.3)]
      animate-float
    `,
    // Pokémon name style, using the "Young Serif" font
    pokemonName: `
      font-['Young_Serif'] text-4xl capitalize tracking-wide
    `,
    // Fact text style
    factText: `
      mt-4 text-lg text-white/90 h-24
    `,
    // Loading text and dots container
    loadingContainer: `
      mt-6 flex items-center justify-center space-x-2 text-xl font-light pt-8
    `,
    // Animated loading dots
    loadingDot: `
      w-3 h-3 bg-white rounded-full
    `,
  };

  useEffect(() => {
    // --- Function to fetch a single random Pokémon and its fact ---
    const fetchRandomPokemon = async (): Promise<PokemonData | null> => {
      try {
        // There are around 1025 Pokémon, we pick a random ID
        const randomId = Math.floor(Math.random() * 1025) + 1;
        
        // Fetch primary Pokémon data (for name and sprites)
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!pokemonResponse.ok) throw new Error('Pokémon not found');
        const pokemonResult = await pokemonResponse.json();

        // Fetch species data (for flavor text/facts)
        const speciesResponse = await fetch(pokemonResult.species.url);
        if (!speciesResponse.ok) throw new Error('Species data not found');
        const speciesResult: PokemonSpecies = await speciesResponse.json();

        // Find an English flavor text entry
        const englishFact = speciesResult.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
        );

        // Clean up the fact text (removes form feeds, newlines, etc.)
        const cleanedFact = englishFact 
          ? englishFact.flavor_text.replace(/[\n\f\r]/g, ' ') 
          : 'This Pokémon is still a mystery!';

        return {
          name: pokemonResult.name,
          image: pokemonResult.sprites.other['official-artwork'].front_default,
          fact: cleanedFact,
        };
      } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
        return null; // Return null on error so we can filter it out
      }
    };

    // --- Fetch a batch of 10 Pokémon for the loading cycle ---
    const fetchAllData = async () => {
      setIsLoading(true);
      const promises = Array(10).fill(null).map(() => fetchRandomPokemon());
      const results = await Promise.all(promises);
      // Filter out any null results from failed fetches
      const validResults = results.filter((r): r is PokemonData => r !== null);
      
      if (validResults.length > 0) {
        setPokemonData(validResults);
      }
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    // --- Interval to cycle through the fetched Pokémon ---
    if (pokemonData.length > 0 && !isLoading) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pokemonData.length);
      }, 4000); // Change Pokémon every 4 seconds

      return () => clearInterval(interval); // Cleanup on unmount
    }
  }, [pokemonData, isLoading]);

  const currentPokemon = pokemonData[currentIndex];

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-80">
             <div className="text-2xl font-['Young_Serif'] animate-pulse">Summoning Pokémon...</div>
          </div>
        ) : (
          currentPokemon && (
            // By giving the content a key, React will re-render it when the key changes,
            // allowing the fadeIn animation to play on each new Pokémon.
            <div key={currentPokemon.name} className="animate-fadeIn flex flex-col items-center">
              <img
                src={currentPokemon.image}
                alt={currentPokemon.name}
                className={styles.pokemonImage}
              />
              <h2 className={styles.pokemonName}>{currentPokemon.name}</h2>
              <p className={styles.factText}>{currentPokemon.fact}</p>
            </div>
          )
        )}

        <div className={styles.loadingContainer}>
          <span>Loading</span>
          {/* Animated Dots */}
          <div className={styles.loadingDot} style={{ animation: 'bounce 1.4s infinite 0s' }}></div>
          <div className={styles.loadingDot} style={{ animation: 'bounce 1.4s infinite 0.2s' }}></div>
          <div className={styles.loadingDot} style={{ animation: 'bounce 1.4s infinite 0.4s' }}></div>
        </div>
      </div>

      {/* Define the keyframe animations in a style tag */}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }

        /* New animation for the Pokémon image */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        /* New animation for content transitions */
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        .animate-float {
            animation: float 4s ease-in-out infinite;
        }

        .animate-fadeIn {
            animation: fadeIn 0.7s ease-in-out;
        }
        
        /* Ensure the fonts are loaded if they are not global */
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Serif:opsz@8..144&family=Young+Serif&display=swap');
        
        .font-['Young_Serif'] {
            font-family: 'Young Serif', serif;
        }
        .font-['Roboto_Serif'] {
            font-family: 'Roboto Serif', serif;
        }
      `}</style>
      <ReturnHome />
    </div>
  );
};

export default LoadingScreen;
