import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StepChart from '../components/StepChart';
import DailyQuest from '../components/DailyQuest';
import StepTracker from '../components/StepTracker';
import RewardClaim from '../components/RewardClaim';
import PokemonCardModal from '../components/PokemonCardModal';
import { PokemonCard } from '../types/pokemonData';
import { getRandomPokemon } from '../data/pokemonData';

const ChallengesPage: React.FC = () => {
  const [currentSteps, setCurrentSteps] = useState<number>(0);
  const [dailyGoal, setDailyGoal] = useState<number>(0);
  const [questCompleted, setQuestCompleted] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [claimedCard, setClaimedCard] = useState<PokemonCard | null>(null);
  const [stepHistory, setStepHistory] = useState<Array<{ date: string; steps: number }>>([]);

  // Initialize daily goal and load saved data
  useEffect(() => {
    const today = new Date().toDateString();
    const savedData = localStorage.getItem('stepChallengeData');
    
    if (savedData) {
      const data = JSON.parse(savedData);
      if (data.date === today) {
        setCurrentSteps(data.currentSteps || 0);
        setDailyGoal(data.dailyGoal || 0);
        setQuestCompleted(data.questCompleted || false);
        setStepHistory(data.stepHistory || []);
      } else {
        // New day, generate new goal
        generateNewDailyGoal();
        setCurrentSteps(0);
        setQuestCompleted(false);
        setStepHistory([]);
      }
    } else {
      generateNewDailyGoal();
    }
  }, []);

  // Generate random daily step goal
  const generateNewDailyGoal = () => {
    const goal = Math.floor(Math.random() * (20000 - 10000 + 1)) + 10000;
    setDailyGoal(goal);
  };

  // Update steps and save to localStorage
  const updateSteps = (newSteps: number) => {
    const updatedSteps = Math.max(0, newSteps);
    setCurrentSteps(updatedSteps);
    
    const today = new Date().toDateString();
    const isCompleted = updatedSteps >= dailyGoal;
    
    if (isCompleted && !questCompleted) {
      setQuestCompleted(true);
    }

    // Update step history
    const updatedHistory = [...stepHistory];
    const todayIndex = updatedHistory.findIndex(entry => entry.date === today);
    
    if (todayIndex >= 0) {
      updatedHistory[todayIndex].steps = updatedSteps;
    } else {
      updatedHistory.push({ date: today, steps: updatedSteps });
    }

    // Keep only last 7 days
    const last7Days = updatedHistory.slice(-7);
    setStepHistory(last7Days);

    // Save to localStorage
    const dataToSave = {
      date: today,
      currentSteps: updatedSteps,
      dailyGoal,
      questCompleted: isCompleted,
      stepHistory: last7Days
    };
    localStorage.setItem('stepChallengeData', JSON.stringify(dataToSave));
  };

  // Handle reward claim
  const handleClaimReward = () => {
    const randomPokemon = getRandomPokemon();
    setClaimedCard(randomPokemon);
    setShowModal(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setClaimedCard(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-green-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Daily Step Challenge
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Complete your daily step goal and earn Pokemon rewards! Track your progress and stay motivated on your fitness journey.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StepChart 
                stepHistory={stepHistory}
                dailyGoal={dailyGoal}
                currentSteps={currentSteps}
              />
            </motion.div>
          </div>

          {/* Right Column - Quest and Tracker */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <DailyQuest
                currentSteps={currentSteps}
                dailyGoal={dailyGoal}
                questCompleted={questCompleted}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <StepTracker
                currentSteps={currentSteps}
                onStepsChange={updateSteps}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <RewardClaim
                questCompleted={questCompleted}
                onClaim={handleClaimReward}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Pokemon Card Modal */}
      {showModal && claimedCard && (
        <PokemonCardModal
          pokemon={claimedCard}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default ChallengesPage; 