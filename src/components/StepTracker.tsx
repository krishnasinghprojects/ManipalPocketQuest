import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Footprints, Plus, Minus, RotateCcw } from 'lucide-react';

interface StepTrackerProps {
  currentSteps: number;
  onStepsChange: (steps: number) => void;
}

const StepTracker: React.FC<StepTrackerProps> = ({ currentSteps, onStepsChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSteps = parseInt(inputValue) || 0;
    onStepsChange(newSteps);
    setInputValue('');
  };

  const handleQuickAdd = (amount: number) => {
    onStepsChange(currentSteps + amount);
  };

  const handleReset = () => {
    onStepsChange(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <Footprints className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Step Tracker
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Update your step count
          </p>
        </div>
      </div>

      {/* Current Steps Display */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Steps</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {currentSteps.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Manual Input */}
      <form onSubmit={handleInputSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter steps..."
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            Set
          </motion.button>
        </div>
      </form>

      {/* Quick Add Buttons */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Add</p>
        <div className="grid grid-cols-3 gap-2">
          {[100, 500, 1000].map((amount) => (
            <motion.button
              key={amount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAdd(amount)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-4 h-4" />
              <span className="font-medium">{amount.toLocaleString()}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Subtract Buttons */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Subtract</p>
        <div className="grid grid-cols-3 gap-2">
          {[100, 500, 1000].map((amount) => (
            <motion.button
              key={amount}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAdd(-amount)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
            >
              <Minus className="w-4 h-4" />
              <span className="font-medium">{amount.toLocaleString()}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg transition-colors duration-200"
      >
        <RotateCcw className="w-4 h-4" />
        <span className="font-medium">Reset Steps</span>
      </motion.button>

      {/* Tips */}
      <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs font-bold">💡</span>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
              Pro Tips
            </h4>
            <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
              <li>• Use quick add buttons for convenience</li>
              <li>• Set your actual step count manually</li>
              <li>• Complete your daily goal to earn Pokemon rewards!</li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StepTracker; 