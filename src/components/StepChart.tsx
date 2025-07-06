import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { TrendingUp, Target } from 'lucide-react';

interface StepChartProps {
  stepHistory: Array<{ date: string; steps: number }>;
  dailyGoal: number;
  currentSteps: number;
}

const StepChart: React.FC<StepChartProps> = ({ stepHistory, dailyGoal, currentSteps }) => {
  // Prepare chart data with proper formatting
  const chartData = useMemo(() => {
    const today = new Date().toDateString();
    
    // Create last 7 days of data
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      const existingData = stepHistory.find(entry => entry.date === dateString);
      const isToday = dateString === today;
      
      last7Days.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        steps: existingData ? existingData.steps : (isToday ? currentSteps : 0),
        isToday,
        goal: dailyGoal
      });
    }
    
    return last7Days;
  }, [stepHistory, dailyGoal, currentSteps]);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
            Steps: <span className="font-bold">{payload[0].value.toLocaleString()}</span>
          </p>
          <p className="text-green-600 dark:text-green-400">
            Goal: <span className="font-bold">{dailyGoal.toLocaleString()}</span>
          </p>
          {payload[0].value >= dailyGoal && (
            <p className="text-green-600 dark:text-green-400 font-semibold">✓ Goal Achieved!</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
    >
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              7-Day Step Progress
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Track your daily activity
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Steps</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600 dark:text-gray-400">Goal</span>
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              strokeOpacity={0.3}
            />
            
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            
            <Tooltip content={<CustomTooltip />} />
            
            {/* Goal Reference Line */}
            <ReferenceLine
              y={dailyGoal}
              stroke="#10b981"
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: `Goal: ${(dailyGoal / 1000).toFixed(0)}k`,
                position: 'top',
                fill: '#10b981',
                fontSize: 12,
                fontWeight: 'bold'
              }}
            />
            
            {/* Steps Line */}
            <Line
              type="monotone"
              dataKey="steps"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{
                fill: '#3b82f6',
                strokeWidth: 2,
                stroke: '#ffffff',
                r: 4
              }}
              activeDot={{
                r: 6,
                stroke: '#3b82f6',
                strokeWidth: 2,
                fill: '#ffffff'
              }}
              animationDuration={1000}
              animationBegin={0}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart Footer Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Today's Steps</span>
          </div>
          <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            {currentSteps.toLocaleString()}
          </p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">Daily Goal</span>
          </div>
          <p className="text-2xl font-bold text-green-900 dark:text-green-100">
            {dailyGoal.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default StepChart; 