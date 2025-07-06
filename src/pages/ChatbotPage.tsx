import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PokemonChatbot from '@/components/PokemonChatbot';
import { Pokemon } from '@/types';

const ChatbotPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // API key for Perplexity - it will be passed to PokemonChatbot
  const apiKey = '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'; // Hardcoded for immediate use

  // Validate API key
  const [apiKeyValid, setApiKeyValid] = useState(true);

  useEffect(() => {
    // Simple validation to check if API key is present
    if (!apiKey || apiKey.trim() === '') {
      setApiKeyValid(false);
      setError('API key is missing. Please provide a valid Perplexity API key.');
    } else {
      setApiKeyValid(true);
    }
  }, [apiKey]);
  
  // Fetch a random Pokemon when the page loads
  useEffect(() => {
    const fetchRandomPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const maxPokemonId = 151; // Limit to original 151 Pokemon for better recognition
        const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        
        // Get more details including description
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        // Find English flavor text
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        
        const description = englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
        
        setSelectedPokemon({
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          image: data.sprites.other['official-artwork'].front_default,
          type: data.types[0].type.name,
          description: description
        });
      } catch (err) {
        console.error('Error fetching Pokemon:', err);
        setError('Failed to load Pokemon. Using default Pikachu instead.');
        
        // Use default Pikachu if API fails
        setSelectedPokemon({
          id: 25,
          name: 'Pikachu',
          image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
          type: 'electric',
          description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchRandomPokemon();
  }, []);
  
  // Function to change Pokemon
  const handleChangePokemon = () => {
    // Close chatbot if open
    setIsOpen(false);
    
    // Re-fetch a new random Pokemon
    const fetchRandomPokemon = async () => {
      setLoading(true);
      setError(null);
      try {
        const maxPokemonId = 151;
        const randomId = Math.floor(Math.random() * maxPokemonId) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();
        
        // Get more details including description
        const speciesResponse = await fetch(data.species.url);
        const speciesData = await speciesResponse.json();
        
        // Find English flavor text
        const englishEntry = speciesData.flavor_text_entries.find(
          (entry: any) => entry.language.name === 'en'
        );
        
        const description = englishEntry ? englishEntry.flavor_text.replace(/\f/g, ' ') : '';
        
        setSelectedPokemon({
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          image: data.sprites.other['official-artwork'].front_default,
          type: data.types[0].type.name,
          description: description
        });
      } catch (err) {
        console.error('Error fetching Pokemon:', err);
        setError('Failed to load a new Pokemon.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRandomPokemon();
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Pokémon AI Assistant</h1>
      
      <div className="max-w-2xl mx-auto bg-card rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col items-center justify-center mb-6">
          {loading ? (
            <div className="w-48 h-48 rounded-full bg-muted animate-pulse"></div>
          ) : (
            selectedPokemon && (
              <div className="relative">
                <div 
                  className="w-48 h-48 rounded-full overflow-hidden border-4 mb-4"
                  style={{ 
                    borderColor: getTypeColor(selectedPokemon.type),
                    boxShadow: `0 0 20px ${getTypeColor(selectedPokemon.type)}80`
                  }}
                >
                  <img 
                    src={selectedPokemon.image} 
                    alt={selectedPokemon.name} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div 
                  className="absolute bottom-2 right-0 rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: getTypeColor(selectedPokemon.type) }}
                >
                  {selectedPokemon.type.toUpperCase()}
                </div>
              </div>
            )
          )}
          
          <h2 className="text-2xl font-bold mb-2">
            {loading ? 'Loading...' : selectedPokemon?.name}
          </h2>
          
          {selectedPokemon?.description && (
            <p className="text-center text-muted-foreground mb-4">
              {selectedPokemon.description}
            </p>
          )}
          
          {error && (
            <p className="text-destructive text-sm mb-4">{error}</p>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => {
              try {
                setIsOpen(true);
              } catch (err) {
                console.error('Error opening chatbot:', err);
                setError('Failed to open chatbot. Please try again.');
              }
            }}
            className="flex-1"
            disabled={loading || !selectedPokemon || !apiKeyValid}
            style={{
              backgroundColor: selectedPokemon ? getTypeColor(selectedPokemon.type) : undefined,
            }}
            title={!apiKeyValid ? 'API key is invalid or missing' : undefined}
          >
            Chat with {loading ? 'Pokémon' : selectedPokemon?.name}
          </Button>
          
          <Button 
            onClick={handleChangePokemon} 
            variant="outline"
            className="flex-1"
            disabled={loading}
          >
            Change Pokémon
          </Button>
        </div>
      </div>
      
      <div className="max-w-2xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">About this AI Assistant</h3>
        <p className="mb-4">
          This Pokémon-themed AI assistant uses the Perplexity AI API to provide helpful responses
          with the personality of your selected Pokémon. Each Pokémon has its own unique characteristics
          that influence how it responds to your questions.
        </p>
        <p className="mb-4">
          You can ask your Pokémon assistant about anything - from general knowledge questions to
          Pokémon-specific information. The AI will respond in a way that matches the personality
          of your selected Pokémon.
        </p>
        <p>
          Click the "Change Pokémon" button to get a different Pokémon assistant with a new personality!
        </p>
      </div>
      
      {selectedPokemon && (
        <PokemonChatbot 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)} 
          apiKey={apiKey}
          pokemon={selectedPokemon}
        />
      )}
    </div>
  );
};

// Helper function to get color based on Pokemon type
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
  return colors[type?.toLowerCase()] || '#AAA67F'; // Default to normal type color
};

export default ChatbotPage;