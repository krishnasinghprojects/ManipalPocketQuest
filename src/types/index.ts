// src/types/index.ts
export interface Pokemon {
    id: number;
    name: string;
    image: string;
    type: string;
    description: string;
}

export interface QuizQuestion {
    question: string;
    options: string[];
    correctAnswer: string;
}