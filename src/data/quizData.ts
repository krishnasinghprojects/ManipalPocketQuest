// src/data/quizData.ts
import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
    {
        question: "How many glasses of water should an adult drink per day on average?",
        options: ["1-2", "3-4", "8-10", "15+"],
        correctAnswer: "8-10",
    },
    {
        question: "Which of these is a key component of a healthy diet?",
        options: ["High Sugar", "Balanced Macronutrients", "Low Fiber", "Saturated Fats"],
        correctAnswer: "Balanced Macronutrients",
    },
    {
        question: "How many hours of sleep is recommended for most adults?",
        options: ["2-4 hours", "5-6 hours", "7-9 hours", "10+ hours"],
        correctAnswer: "7-9 hours",
    },
    // Add more health questions here!
];