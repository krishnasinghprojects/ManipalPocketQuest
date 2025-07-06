import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pokemon } from '@/types';

// --- UI Components (mocked for shadcn-like usage) ---
const Dialog = ({ open, onOpenChange, children }) => (
  <div 
    className="fixed inset-0 z-50 flex items-center justify-center"
    onClick={() => onOpenChange(false)}
  >
    {children}
  </div>
);

const DialogContent = ({ className, children }) => (
  <div className={className} onClick={(e) => e.stopPropagation()}>
    {children}
  </div>
);
const DialogHeader = ({ className, children }) => <div className={className}>{children}</div>;
const DialogTitle = ({ className, children }) => <h2 className={className}>{children}</h2>;
const DialogDescription = ({ className, children }) => <p className={className}>{children}</p>;
const Button = ({ className, children, ...props }) => <button className={className} {...props}>{children}</button>;

interface StoryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pokemon: Pokemon | null;
}

const StoryDialog: React.FC<StoryDialogProps> = ({ isOpen, onClose, pokemon }) => {
  const defaultPokemon = {
    id: 25,
    name: 'Pikachu',
    type: 'electric',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png',
    description: 'When several of these POKéMON gather, their electricity could build and cause lightning storms.'
  };

  const activePokemon = pokemon || defaultPokemon;

  const storyContent = [
    {
      title: 'Welcome to Your Health Adventure!',
      content: `Hi there! I'm ${activePokemon.name}, and I'll be your guide on this exciting health journey!`
    },
    {
      title: 'Walk and Earn Pokémon',
      content: 'As you walk and stay active, you\'ll earn Pokémon to add to your collection. The more steps you take, the higher you\'ll climb on our leaderboard!'
    },
    {
      title: 'Health Quests',
      content: 'Attend health-related quests and challenges to catch rare Pokémon. Complete quizzes about health topics and expand your knowledge while growing your collection!'
    },
    {
      title: 'Leaderboard Prizes',
      content: 'Stay at the top of the leaderboard and you\'ll be eligible for special prizes! The healthier you are, the more rewards you\'ll unlock.'
    }
  ];

  const [currentStoryIndex, setCurrentStoryIndex] = React.useState(0);

  const handleNext = React.useCallback(() => {
    if (currentStoryIndex < storyContent.length - 1) {
      setCurrentStoryIndex(prev => prev + 1);
    } else {
      onClose();
      setCurrentStoryIndex(0);
    }
  }, [currentStoryIndex, storyContent.length, onClose]);

  React.useEffect(() => {
    if (!isOpen) setCurrentStoryIndex(0);
  }, [isOpen]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (['ArrowRight', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleNext]);

  const dialogVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { ease: "easeOut", duration: 0.3 } },
    exit: { opacity: 0, scale: 0.95, transition: { ease: "easeIn", duration: 0.2 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
          <motion.div variants={dialogVariants} initial="hidden" animate="visible" exit="exit">
            <DialogContent className="sm:max-w-[500px] w-[90vw] p-8
              bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl"
            >
              <style>{`
                .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
                .text-shadow-sm { text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
              `}</style>

              <DialogHeader>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStoryIndex}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <DialogTitle className="text-3xl font-bold text-center text-white text-shadow h-16">
                      {storyContent[currentStoryIndex].title}
                    </DialogTitle>
                  </motion.div>
                </AnimatePresence>
              </DialogHeader>

              <div className="flex flex-col items-center space-y-4 py-4">
                <motion.div
                  className="w-40 h-40 relative"
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
                >
                  <motion.img
                    src={activePokemon.image}
                    alt={activePokemon.name}
                    className="w-full h-full object-contain drop-shadow-xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStoryIndex}
                    variants={textVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-center px-4 h-24 flex items-center justify-center"
                  >
                    <DialogDescription className="text-lg text-gray-100 text-shadow-sm">
                      {storyContent[currentStoryIndex].content}
                    </DialogDescription>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex flex-col items-center mt-4 space-y-4">
                <div className="flex space-x-2 mb-2">
                  {storyContent.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-2 rounded-full transition-all duration-500 ${index === currentStoryIndex ? 'bg-white w-6' : 'bg-white/40'}`}
                    />
                  ))}
                </div>

                <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
                  <Button
                    onClick={handleNext}
                    className="px-8 py-3 rounded-full font-semibold text-white
                      bg-white/10 backdrop-blur-lg border border-white/20
                      hover:bg-white/20 hover:border-white/30 transform hover:scale-105 transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-white/50"
                    autoFocus
                    aria-label={currentStoryIndex < storyContent.length - 1 ? 'Next story page' : 'Start your adventure'}
                  >
                    {currentStoryIndex < storyContent.length - 1 ? 'Next' : 'Start Adventure!'}
                  </Button>
                </motion.div>
              </div>
            </DialogContent>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default StoryDialog;
