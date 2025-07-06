import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, Shield, Wind } from 'lucide-react';
import { PokemonCard } from '../types/pokemonData';
import { fallbackImageUrl } from '../data/pokemonData';

interface PokemonCardModalProps {
  pokemon: PokemonCard;
  onClose: () => void;
}

const PokemonCardModal: React.FC<PokemonCardModalProps> = ({ pokemon, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Handle image load/error
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Get rarity color
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-purple-500 to-pink-500';
      case 'rare':
        return 'from-blue-500 to-cyan-500';
      case 'uncommon':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-slate-500';
    }
  };

  // Get type color
  const getTypeColor = (type: string) => {
    const typeColors: { [key: string]: string } = {
      'Fire': 'bg-red-500',
      'Water': 'bg-blue-500',
      'Grass': 'bg-green-500',
      'Electric': 'bg-yellow-500',
      'Psychic': 'bg-purple-500',
      'Ghost': 'bg-indigo-500',
      'Poison': 'bg-purple-600',
      'Flying': 'bg-sky-500',
      'Normal': 'bg-gray-500',
      'Fairy': 'bg-pink-500',
      'Dragon': 'bg-indigo-600'
    };
    return typeColors[type] || 'bg-gray-500';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors duration-200"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Congratulations text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute top-20 left-1/2 transform -translate-x-1/2 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Congratulations!
          </h2>
          <p className="text-xl text-yellow-300 font-semibold drop-shadow-lg">
            You earned a Pokemon card!
          </p>
        </motion.div>

        {/* Pokemon Card */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
          className="relative w-full max-w-sm md:max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sparkle effects */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="absolute text-yellow-300 text-2xl"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${20 + (i * 10)}%`
              }}
            >
              ✨
            </motion.div>
          ))}

          {/* Card Container */}
          <div className={`relative bg-gradient-to-br ${getRarityColor(pokemon.rarity)} p-1 rounded-2xl shadow-2xl`}>
            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                    {pokemon.name}
                  </h3>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-400">HP</p>
                    <p className="text-lg font-bold text-red-600">{pokemon.hp}</p>
                  </div>
                </div>
                
                {/* Types */}
                <div className="flex gap-2">
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getTypeColor(type)}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pokemon Image */}
              <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-800 dark:to-gray-700 p-6">
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                  {!imageLoaded && (
                    <div className="animate-pulse bg-gray-300 dark:bg-gray-600 w-full h-full rounded-lg"></div>
                  )}
                  <img
                    src={imageError ? fallbackImageUrl : pokemon.imageUrl}
                    alt={pokemon.name}
                    className={`w-full h-full object-contain transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
              </div>

              {/* Card Stats */}
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Attack</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{pokemon.attack}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Defense</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{pokemon.defense}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Wind className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Speed</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{pokemon.speed}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                    "{pokemon.description}"
                  </p>
                </div>

                {/* Rarity Badge */}
                <div className="mt-4 text-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r ${getRarityColor(pokemon.rarity)}`}>
                    {pokemon.rarity.charAt(0).toUpperCase() + pokemon.rarity.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Auto-close indicator */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 5, ease: "linear" }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <div className="h-full bg-white rounded-full"></div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PokemonCardModal; 