import React from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, CheckCircle } from 'lucide-react';

interface RewardClaimProps {
  questCompleted: boolean;
  onClaim: () => void;
}

const RewardClaim: React.FC<RewardClaimProps> = ({ questCompleted, onClaim }) => {
  const getButtonState = () => {
    if (!questCompleted) {
      return {
        text: 'Complete Quest First',
        icon: Gift,
        className: 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed',
        glow: false,
        disabled: true
      };
    }
    
    return {
      text: 'Claim Pokemon Reward',
      icon: Sparkles,
      className: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-500 hover:via-orange-600 hover:to-red-600 text-white cursor-pointer shadow-lg hover:shadow-xl',
      glow: true,
      disabled: false
    };
  };

  const buttonState = getButtonState();
  const ButtonIcon = buttonState.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Gift className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Pokemon Reward
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {questCompleted 
            ? 'Congratulations! Claim your Pokemon card!'
            : 'Complete your daily step goal to earn a Pokemon reward'
          }
        </p>
      </div>

      {/* Claim Button */}
      <motion.button
        whileHover={!buttonState.disabled ? { scale: 1.02 } : {}}
        whileTap={!buttonState.disabled ? { scale: 0.98 } : {}}
        onClick={onClaim}
        disabled={buttonState.disabled}
        className={`w-full relative overflow-hidden rounded-xl py-4 px-6 font-bold text-lg transition-all duration-300 ${buttonState.className}`}
      >
        {/* Glow effect */}
        {buttonState.glow && (
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.5)',
                '0 0 30px rgba(251, 191, 36, 0.8)',
                '0 0 20px rgba(251, 191, 36, 0.5)'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-xl"
          />
        )}

        {/* Button content */}
        <div className="relative z-10 flex items-center justify-center gap-3">
          <ButtonIcon className="w-6 h-6" />
          <span>{buttonState.text}</span>
        </div>

        {/* Sparkle effects */}
        {buttonState.glow && (
          <>
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, 20, 40],
                y: [0, -20, -40]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.2
              }}
              className="absolute top-2 left-4 text-yellow-300"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                x: [0, -20, -40],
                y: [0, 20, 40]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: 0.8
              }}
              className="absolute bottom-2 right-4 text-yellow-300"
            >
              ✨
            </motion.div>
          </>
        )}
      </motion.button>

      {/* Reward Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-sm font-bold">🎴</span>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Pokemon Card Reward
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• Random Pokemon card with stats</li>
              <li>• Different rarity levels (Common to Legendary)</li>
              <li>• Collect them all!</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Rarity Info */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <span className="font-semibold text-gray-600 dark:text-gray-400">Common</span>
          <p className="text-gray-500 dark:text-gray-500">50%</p>
        </div>
        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <span className="font-semibold text-green-600 dark:text-green-400">Uncommon</span>
          <p className="text-gray-500 dark:text-gray-500">30%</p>
        </div>
        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <span className="font-semibold text-blue-600 dark:text-blue-400">Rare</span>
          <p className="text-gray-500 dark:text-gray-500">15%</p>
        </div>
        <div className="text-center p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <span className="font-semibold text-purple-600 dark:text-purple-400">Legendary</span>
          <p className="text-gray-500 dark:text-gray-500">5%</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RewardClaim; 