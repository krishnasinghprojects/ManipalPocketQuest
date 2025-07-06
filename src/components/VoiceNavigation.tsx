import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface VoiceNavigationProps {
  className?: string;
}

const VoiceNavigation: React.FC<VoiceNavigationProps> = ({ className }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const recognitionRef = useRef<any>(null);

  // Voice command mappings
  const voiceCommands = {
    'go to home': '/',
    'go to main page': '/',
    'home': '/',
    'main': '/',
    'catch pokemon': '/catch',
    'catch pokémon': '/catch',
    'go to catch': '/catch',
    'catch page': '/catch',
    'inventory': '/inventory',
    'go to inventory': '/inventory',
    'my pokemon': '/inventory',
    'my pokémon': '/inventory',
    'leaderboard': '/leaderboard',
    'go to leaderboard': '/leaderboard',
    'rankings': '/leaderboard',
    'chatbot': '/chatbot',
    'go to chatbot': '/chatbot',
    'chat': '/chatbot',
    'talk to pokemon': '/chatbot',
    'talk to pokémon': '/chatbot',
    'challenges': '/challenges',
    'go to challenges': '/challenges',
    'outbreak map': '/outbreak-map',
    'go to outbreak map': '/outbreak-map',
    'map': '/outbreak-map',
    'health map': '/outbreak-map',
    'show menu': 'menu',
    'open menu': 'menu',
    'close menu': 'close',
    'stop listening': 'stop',
    'turn off voice': 'stop',
    'help': 'help',
    'what can i say': 'help',
    'voice commands': 'help',
  };

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setLastCommand(transcript);
        processVoiceCommand(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        setFeedback('Voice recognition error. Please try again.');
        setTimeout(() => setFeedback(''), 3000);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const processVoiceCommand = (command: string) => {
    setIsProcessing(true);
    setFeedback(`Processing: "${command}"`);

    // Check for exact matches first
    if (voiceCommands[command as keyof typeof voiceCommands]) {
      const action = voiceCommands[command as keyof typeof voiceCommands];
      executeCommand(action, command);
      return;
    }

    // Check for partial matches
    for (const [key, value] of Object.entries(voiceCommands)) {
      if (command.includes(key) || key.includes(command)) {
        executeCommand(value, command);
        return;
      }
    }

    // No match found
    setFeedback(`Command not recognized: "${command}". Say "help" for available commands.`);
    setTimeout(() => setFeedback(''), 4000);
    setIsProcessing(false);
  };

  const executeCommand = (action: string, command: string) => {
    setTimeout(() => {
      switch (action) {
        case '/':
          navigate('/');
          setFeedback('Navigating to home page');
          break;
        case '/catch':
          navigate('/catch');
          setFeedback('Navigating to catch Pokemon page');
          break;
        case '/inventory':
          navigate('/inventory');
          setFeedback('Navigating to inventory');
          break;
        case '/leaderboard':
          navigate('/leaderboard');
          setFeedback('Navigating to leaderboard');
          break;
        case '/chatbot':
          navigate('/chatbot');
          setFeedback('Opening Pokemon chatbot');
          break;
        case '/challenges':
          navigate('/challenges');
          setFeedback('Navigating to challenges');
          break;
        case '/outbreak-map':
          navigate('/outbreak-map');
          setFeedback('Opening outbreak map');
          break;
        case 'menu':
          setFeedback('Menu toggle command received');
          break;
        case 'stop':
          stopListening();
          setFeedback('Voice navigation stopped');
          break;
        case 'help':
          showHelp();
          break;
        default:
          setFeedback(`Unknown command: ${command}`);
      }
      
      setTimeout(() => setFeedback(''), 3000);
      setIsProcessing(false);
    }, 500);
  };

  const showHelp = () => {
    const helpText = `
      Available voice commands:
      • "Go to home" or "Home"
      • "Catch Pokemon" or "Go to catch"
      • "Inventory" or "My Pokemon"
      • "Leaderboard" or "Rankings"
      • "Chatbot" or "Talk to Pokemon"
      • "Challenges"
      • "Outbreak map" or "Map"
      • "Help" or "What can I say"
      • "Stop listening"
    `;
    setFeedback(helpText);
    setTimeout(() => setFeedback(''), 8000);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setFeedback('Listening... Say a command or "help" for options');
        setTimeout(() => setFeedback(''), 3000);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        setFeedback('Error starting voice recognition');
        setTimeout(() => setFeedback(''), 3000);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
        setIsListening(false);
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className={`voice-navigation ${className || ''}`}>
      {/* Voice Navigation Button */}
      <Button
        onClick={toggleListening}
        size="icon"
        variant="ghost"
        className={`voice-btn ${isListening ? 'listening' : ''}`}
        title={isListening ? 'Stop voice navigation' : 'Start voice navigation'}
      >
        <AnimatePresence mode="wait">
          {isListening ? (
            <motion.div
              key="listening"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MicOff className="h-4 w-4 text-red-500" />
            </motion.div>
          ) : (
            <motion.div
              key="not-listening"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Mic className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      {/* Feedback Display */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="voice-feedback"
          >
            <div className="feedback-content">
              <Volume2 className="h-4 w-4 mr-2" />
              <span>{feedback}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Indicator */}
      {isProcessing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="processing-indicator"
        >
          <div className="processing-dots">
            <div className="dot" style={{ animationDelay: '0ms' }} />
            <div className="dot" style={{ animationDelay: '150ms' }} />
            <div className="dot" style={{ animationDelay: '300ms' }} />
          </div>
        </motion.div>
      )}

      <style jsx>{`
        .voice-navigation {
          position: relative;
          display: inline-block;
        }

        .voice-btn {
          position: relative;
          transition: all 0.3s ease;
        }

        .voice-btn.listening {
          background-color: rgba(239, 68, 68, 0.1);
          border-color: #ef4444;
        }

        .voice-btn.listening::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 2px solid #ef4444;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.7;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .voice-feedback {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          white-space: nowrap;
          z-index: 1000;
          max-width: 300px;
          word-wrap: break-word;
        }

        .feedback-content {
          display: flex;
          align-items: center;
        }

        .processing-indicator {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          z-index: 1000;
        }

        .processing-dots {
          display: flex;
          gap: 4px;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: currentColor;
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default VoiceNavigation; 