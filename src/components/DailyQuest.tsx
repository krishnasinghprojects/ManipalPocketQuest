import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, Clock, Zap } from 'lucide-react';

interface DailyQuestProps {
  currentSteps: number;
  dailyGoal: number;
  questCompleted: boolean;
}

const DailyQuest: React.FC<DailyQuestProps> = ({ currentSteps, dailyGoal, questCompleted }) => {
  const progressPercentage = Math.min((currentSteps / dailyGoal) * 100, 100);
  const remainingSteps = Math.max(dailyGoal - currentSteps, 0);

  // Get quest status and styling
  const getQuestStatus = () => {
    if (questCompleted) {
      return {
        status: 'Completed',
        icon: Trophy,
        color: 'text-green-600 dark:text-green-400',
        bgColor: 'bg-green-100 dark:bg-green-900/20',
        borderColor: 'border-green-200 dark:border-green-800',
        progressColor: 'from-green-400 to-green-600'
      };
    } else if (progressPercentage > 50) {
      return {
        status: 'In Progress',
        icon: Zap,
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-100 dark:bg-orange-900/20',
        borderColor: 'border-orange-200 dark:border-orange-800',
        progressColor: 'from-orange-400 to-orange-600'
      };
    } else {
      return {
        status: 'Just Started',
        icon: Clock,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/20',
        borderColor: 'border-blue-200 dark:border-blue-800',
        progressColor: 'from-blue-400 to-blue-600'
      };
    }
  };

  const questStatus = getQuestStatus();
  const StatusIcon = questStatus.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 ${questStatus.borderColor} p-6 relative overflow-hidden`}
    >
      {/* Pokemon-themed background pattern */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-red-500 rounded-full transform translate-x-8 -translate-y-8"></div>
      </div>

      {/* Quest Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${questStatus.bgColor}`}>
            <StatusIcon className={`w-6 h-6 ${questStatus.color}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Daily Quest
            </h3>
            <p className={`text-sm font-medium ${questStatus.color}`}>
              {questStatus.status}
            </p>
          </div>
        </div>
        
        {/* Pokemon Pokeball icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center relative">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
          </div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-gray-800 rounded-full"></div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="flex items-center gap-6 mb-6">
        {/* Circular Progress */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              {/* Background circle */}
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              {/* Progress circle */}
              <motion.circle
                cx="40"
                cy="40"
                r="32"
                stroke="url(#progressGradient)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                initial={{ strokeDasharray: "0 201" }}
                animate={{ strokeDasharray: `${(progressPercentage / 100) * 201} 201` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>

        {/* Step Count */}
        <div className="flex-1">
          <div className="mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Progress</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {currentSteps.toLocaleString()} / {dailyGoal.toLocaleString()}
            </p>
          </div>
          
          {!questCompleted && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Target className="w-4 h-4" />
              <span>{remainingSteps.toLocaleString()} steps remaining</span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>0</span>
          <span>{dailyGoal.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Quest Description */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-sm font-bold">P</span>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {questCompleted ? 'Quest Complete!' : 'Daily Step Challenge'}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {questCompleted 
                ? 'Congratulations! You\'ve completed your daily step goal. Claim your Pokemon reward!'
                : `Walk ${dailyGoal.toLocaleString()} steps today to earn a Pokemon card. Keep moving!`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Completion Animation */}
      {questCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="absolute top-4 right-4"
        >
          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">✓</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DailyQuest; 