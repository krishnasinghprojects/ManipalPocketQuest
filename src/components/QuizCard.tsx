// src/components/QuizCard.tsx
import React, { useRef, useState, MouseEvent } from 'react';
import { QuizQuestion } from '../types';

const styles: { [key: string]: React.CSSProperties } = {
    card: {
        width: 320,
        height: 450,
        borderRadius: '20px',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
    },
    cardInner: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(15px)',
        border: '1.5px solid rgba(255, 255, 255, 0.2)',
        transformStyle: 'preserve-3d',
        padding: '25px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
    },
    quizQuestion: {
        fontSize: '24px',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.5)',
        transform: 'translateZ(60px)',
        marginBottom: '20px',
       fontWeight: '200',
    },
    optionsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        transform: 'translateZ(40px)',
    },
    optionButton: {
        background: 'rgba(255, 255, 255, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '15px',
        padding: '15px',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.2s, transform 0.2s',
        backdropFilter: 'blur(5px)',
    },
};

interface QuizCardProps {
    question: QuizQuestion;
    onAnswer: (isCorrect: boolean) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswer }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [style, setStyle] = useState<React.CSSProperties>({});



    return (
        <div
            ref={cardRef}
            style={{ ...styles.card, ...style }}
        >
            <div style={styles.cardInner}>
                <h2 style={styles.quizQuestion}>{question.question}</h2>
                <div style={styles.optionsContainer}>
                    {question.options.map((option) => (
                        <button
                            key={option}
                            style={styles.optionButton}
                            onClick={() => onAnswer(option === question.correctAnswer)}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuizCard;