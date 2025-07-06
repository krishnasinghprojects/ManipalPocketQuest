import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { PokemonCardHero } from './PokemonCardHero'; // Ensure this path is correct
import { Pokemon } from '@/types'; // Ensure this path is correct for your project
import { ArrowRight, Sparkles } from 'lucide-react'; // Import arrow icon and Sparkles
import StoryDialog from './StoryDialog'; // Import the new StoryDialog component
import Narrator from './Narrator'; // Import the Narrator component

const HeroSection = () => {
  // State to hold the random Pokemon data
  const [randomPokemon, setRandomPokemon] = useState<Pokemon | null>(null);
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(true);
  const [pokemonError, setPokemonError] = useState<string | null>(null);
  // State to control the story dialog
  const [isStoryOpen, setIsStoryOpen] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showStory, setShowStory] = useState(false);
  // Ref to get the bounding box of the visual container for mouse events
  const visualRef = useRef<HTMLDivElement>(null);

  // --- Data Fetching Logic for a Random Pokemon ---
  const fetchRandomPokemon = async () => {
    setLoadingPokemon(true);
    setPokemonError(null);
    try {
      const maxPokemonId = 1025; // As of latest PokeAPI data (Gen 9). Adjust if needed.
      const randomId = Math.floor(Math.random() * maxPokemonId) + 1;

      // Fetch basic Pokémon data
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Fetch species data for description (flavor text)
      const speciesResponse = await fetch(data.species.url);
      if (!speciesResponse.ok) {
        throw new Error(`HTTP error! status: ${speciesResponse.status}`);
      }
      const speciesData = await speciesResponse.json();

      // Find an English flavor text entry
      const descriptionEntry = speciesData.flavor_text_entries.find(
        (entry: any) => entry.language.name === 'en'
      );
      // Clean up description: replace newlines and form feed characters
      const description = descriptionEntry
        ? descriptionEntry.flavor_text.replace(/[\n\f]/g, ' ')
        : 'No description available.';

      const pokemonData: Pokemon = {
        id: data.id,
        name: data.name,
        type: data.types[0]?.type.name || 'unknown',
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        description: description,
      };

      setRandomPokemon(pokemonData);
    } catch (err) {
      console.error("Failed to fetch random Pokémon:", err);
      setPokemonError("Failed to load Pokémon. Displaying placeholder.");
      // Optionally set a default placeholder Pokemon here if desired:
      // setRandomPokemon(yourDefaultPlaceholderPokemonObject);
    } finally {
      setLoadingPokemon(false);
    }
  };

  // Run the fetch when the component mounts
  useEffect(() => {
    fetchRandomPokemon();
  }, []);

  // Colorblind mode detection (scoped to hero)
  const isColorblind = typeof document !== 'undefined' && document.body.classList.contains('colorblind-theme');

  // Handle quest start: show animation, then story
  const handleStartQuest = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
      setShowStory(true);
    }, 2000); // 2 seconds animation
  };

  // When story closes, reset
  const handleCloseStory = () => {
    setShowStory(false);
  };

  //FONT STYLES
  // --- Existing styles (no changes needed here unless you want to integrate new fonts via global CSS) ---
  const heroTitleStyle: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '3.5rem',
    lineHeight: 1.2,
    color: isColorblind ? '#000' : '#FFFFFF',
    textShadow: isColorblind ? 'none' : '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
  };
  const heroDescriptionStyle: React.CSSProperties = {
    fontFamily: '"Roboto Serif", serif',
    fontSize: '1.2rem',
    lineHeight: 1.6,
    marginTop: '20px',
    marginBottom: '30px',
    textShadow: isColorblind ? 'none' : '0px 2px 4px rgba(8, 8, 8, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.1)',
    fontWeight: 400,
    fontStyle: 'normal',
    color: isColorblind ? '#000' : undefined,
  };
  const heroDescriptionStyle2: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '1rem',
    lineHeight: 1.2,
    color: isColorblind ? '#000' : '#FFFFFF',
    textShadow: isColorblind ? 'none' : '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
  };

  return (
    <section className={`hero-section${isColorblind ? ' hero-section-colorblind' : ''}`}>
      {/* Background Elements */}
      <div className="hero-background">
        <div className="floating-element floating-element-1"></div>
        <div className="floating-element floating-element-2"></div>
        <div className="floating-element floating-element-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-grid">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <Narrator 
              text="Embark on Your Health Adventure. Transform your health journey into an exciting quest. Explore real-time disease outbreak data, weather intelligence, and AI health assistance, all while interacting with your favorite characters. Collect Pokemon Cards By Performing Daily Challenges And Quizzes To Climb The Leaderboards"
              className="hero-narrator"
            />
            
            <h1 className="hero-title" style={heroTitleStyle}>
              <span className="title-word title-embark">Embark</span> on Your{' '}
              <span className="title-word title-health">Health</span>{' '}
              <span className="title-word title-adventure">Adventure</span>
            </h1>

            <p className="hero-description" style={heroDescriptionStyle}>
              Transform your health journey into an exciting quest. Explore real-time disease outbreak data,
              weather intelligence, and AI health assistance, all while interacting with your favorite characters.
            </p>
            <p className="hero-description" style={heroDescriptionStyle}>
              Collect Pokemon Cards By Performing Daily Challenges And Quizzes To Climb The Leaderboards
            </p>

            <button
              className="cssbuttons-io-button"
              style={heroDescriptionStyle2}
              onClick={handleStartQuest}
            >
              Start Your Quest
              <div className="icon">
                <ArrowRight />
              </div>
            </button>
          </motion.div>

          {/* Character/Illustration Container with Mouse Events and 3D Perspective */}
          <motion.div
            ref={visualRef} // Attach ref to this div to track its position
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-visual"
            // Apply perspective to the parent that contains the 3D rotating element
            style={{ perspective: '1000px' }}
          >
            <div className="character-container">
              {/* AnimatePresence for animation before story */}
              <AnimatePresence>
                {showAnimation && randomPokemon && (
                  <motion.div
                    key="pokemon-animation"
                    initial={{ opacity: 0, scale: 0.8, y: 40 }}
                    animate={{ opacity: 1, scale: [0.8, 1.1, 1], y: [40, -30, 0] }}
                    exit={{ opacity: 0, scale: 0.8, y: 40 }}
                    transition={{ duration: 2 }}
                    className="flex flex-col items-center justify-center"
                  >
                    <motion.img
                      src={randomPokemon.image}
                      alt={randomPokemon.name}
                      className="w-48 h-48 object-contain"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                    />
                    <motion.div
                      className="flex gap-2 mt-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Sparkles key={i} className="text-yellow-400 w-6 h-6" />
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Show PokemonCardHero if not animating */}
              {!showAnimation && randomPokemon && (
                <PokemonCardHero pokemon={randomPokemon} />
              )}
            </div>
          </motion.div>
        </div>
      </div>
      {/* Show story dialog after animation */}
      {showStory && (
        <StoryDialog isOpen={showStory} onClose={handleCloseStory} pokemon={randomPokemon} />
      )}
      {/* Scoped colorblind styles */}
      <style>{`
        .hero-section-colorblind {
          background: #fff !important;
        }
        .hero-section-colorblind .hero-title,
        .hero-section-colorblind .hero-description,
        .hero-section-colorblind .cssbuttons-io-button {
          color: #000 !important;
          text-shadow: none !important;
        }
        .hero-section-colorblind .cssbuttons-io-button {
          background: #fff !important;
          border: 2px solid #000 !important;
          color: #000 !important;
        }
        .hero-section-colorblind .cssbuttons-io-button:hover {
          background: #000 !important;
          color: #fff !important;
        }
        .hero-section-colorblind .character-container {
          filter: grayscale(1) contrast(2);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;