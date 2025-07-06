import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";

  const heroTitleStyle: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '2rem',
    fontWeight:'bold',
    lineHeight: 1.2,
    color: 'yellow',
    textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
  };
    const heroTitleStyle2: React.CSSProperties = {
    fontFamily: '"Young Serif", serif',
    fontSize: '4rem',
    fontWeight:'bolder',
    lineHeight: 1.2,
    color: '#FFFFFF',
    textShadow: '0px 4px 8px rgba(8, 8, 8, 0.4), 0px 0px 15px rgba(255, 255, 255, 0.2)',
    letterSpacing: '0.05em',
  };
  const heroDescriptionStyle: React.CSSProperties = {
    fontFamily: '"Roboto Serif", serif',
    fontSize: '2rem',
    lineHeight: 1.6,
    marginTop: '20px',
    marginBottom: '30px',
    textShadow: '0px 2px 4px rgba(8, 8, 8, 0.3), 0px 0px 8px rgba(255, 255, 255, 0.1)',
    fontWeight: 400,
    fontStyle: 'normal',
  };
// Styled Components for thematic look and transitions
const NotFoundContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  font-family: 'Poppins', sans-serif; /* Assuming Poppins or similar font for Manipal PokeQuest */
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
  animation: backgroundAnimation 10s ease infinite alternate; /* Subtle background animation */

  @keyframes backgroundAnimation {
    0% { background-position: 0% 50%; }
    100% { background-position: 100% 50%; }
  }
`;

const ErrorContent = styled.div`
  /* Glassmorphism styles */
  background: rgba(255, 255, 255, 0.15); /* Lighter, more transparent background */
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3); /* Subtle white border for glass effect */
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); /* Enhanced shadow */
  backdrop-filter: blur(10px); /* Increased blur for stronger glass effect */
  -webkit-backdrop-filter: blur(10px); /* Webkit prefix for compatibility */

  padding: 40px 60px;
  animation: fadeIn 1s ease-out forwards; /* Fade-in animation for content */

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ErrorHeading = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin-bottom: 10px;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  letter-spacing: 3px;
`;

const ErrorMessage = styled.p`
  font-size: 1.8rem;
  margin-bottom: 30px;
  line-height: 1.4;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
`;

const PokemonImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  margin-top: 20px;
  margin-bottom: 30px;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  transition: transform 0.3s ease-in-out; /* Hover effect */

  &:hover {
    transform: scale(1.1) rotate(5deg);
  }
`;

const HomeLink = styled(Link)`
    font-family: "Young Serif", serif;,
  display: inline-block;
  background-color: #f0c419; /* A golden color, somewhat thematic */
  color: #FFFFFF;
  padding: 15px 30px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease-in-out; /* Hover effect */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);

  &:hover {
   color: #000000;
    background-color: yellow;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  }
`;

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const NotFound = () => {
  const location = useLocation();
  const [pokemonData, setPokemonData] = useState<{ name: string; imageUrl: string } | null>(null);
  const totalPokemons = 1000; // Increased total_pokemons for more variety

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    const getRandomPokemon = async () => {
      try {
        const randomId = Math.floor(Math.random() * totalPokemons) + 1;
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon");
        }
        const data = await response.json();
        setPokemonData({
          name: capitalizeFirstLetter(data.name),
          imageUrl: data.sprites.other.dream_world.front_default || data.sprites.front_default, // Fallback sprite
        });
      } catch (error) {
        console.error("Error fetching random Pokemon:", error);
        setPokemonData(null); // Reset if there's an error
      }
    };

    getRandomPokemon();
  }, [location.pathname]);

  return (
    <NotFoundContainer>
      <ErrorContent>
        <ErrorHeading style={heroTitleStyle2}>404</ErrorHeading>
        {pokemonData ? (
          <div className="error" style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection: 'column'}}>
            <ErrorMessage style={heroDescriptionStyle}>
              Oops! <span style={heroTitleStyle}>{pokemonData.name}</span> Couldn't find that page.
              <br /> It seems you've wandered off the path!
            </ErrorMessage>
            <PokemonImage src={pokemonData.imageUrl} alt={pokemonData.name} />
          </div>
        ) : (
          <ErrorMessage>Oops! It seems we couldn't find that page. <br /> Even our Pokémon are stumped!</ErrorMessage>
        )}
        <HomeLink to="/">Return to Home</HomeLink>
      </ErrorContent>
    </NotFoundContainer>
  );
};

export default NotFound;
