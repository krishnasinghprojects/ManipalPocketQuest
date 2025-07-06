import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Volume1, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NarratorProps {
  text?: string;
  className?: string;
  autoRead?: boolean;
  children?: React.ReactNode;
}

interface NarratorSettings {
  rate: number;
  pitch: number;
  volume: number;
  voice: string;
}

const Narrator: React.FC<NarratorProps> = ({ 
  text, 
  className = '', 
  autoRead = false,
  children 
}) => {
  const [isReading, setIsReading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<NarratorSettings>({
    rate: 1,
    pitch: 1,
    volume: 1,
    voice: ''
  });
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const textToRead = text || (typeof children === 'string' ? children : '');

  // Initialize speech synthesis and load available voices
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      // Load available voices
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        setAvailableVoices(voices);
        
        // Set default voice to first English voice
        if (voices.length > 0 && !settings.voice) {
          const englishVoice = voices.find(voice => 
            voice.lang.startsWith('en') && voice.default
          ) || voices[0];
          setSettings(prev => ({ ...prev, voice: englishVoice.name }));
        }
      };

      // Load voices immediately if available
      loadVoices();
      
      // Load voices when they become available
      window.speechSynthesis.onvoiceschanged = loadVoices;

      // Auto-read if enabled
      if (autoRead && textToRead) {
        setTimeout(() => {
          speak(textToRead);
        }, 1000);
      }
    }

    return () => {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, [autoRead, textToRead]);

  const speak = (content: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new window.SpeechSynthesisUtterance(content);
    
    // Apply settings
    utterance.rate = settings.rate;
    utterance.pitch = settings.pitch;
    utterance.volume = settings.volume;
    
    // Set voice if available
    if (settings.voice) {
      const selectedVoice = availableVoices.find(voice => voice.name === settings.voice);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
    }

    // Event handlers
    utterance.onstart = () => {
      setIsReading(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsReading(false);
      setIsPaused(false);
    };

    utterance.onpause = () => {
      setIsPaused(true);
    };

    utterance.onresume = () => {
      setIsPaused(false);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      setIsReading(false);
      setIsPaused(false);
    };

    // Store reference and start speaking
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const pause = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resume = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      setIsPaused(false);
      utteranceRef.current = null;
    }
  };

  const toggleReading = () => {
    if (isReading) {
      if (isPaused) {
        resume();
      } else {
        pause();
      }
    } else {
      speak(textToRead);
    }
  };

  const handleSettingsChange = (key: keyof NarratorSettings, value: number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Get selected text from page
  const readSelectedText = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      speak(selection.toString().trim());
    } else {
      speak(textToRead);
    }
  };

  return (
    <div className={`narrator-container ${className}`}>
      {/* Narrator Controls */}
      <div className="narrator-controls">
        <Button
          onClick={toggleReading}
          size="icon"
          variant="ghost"
          className={`narrator-btn ${isReading ? 'reading' : ''}`}
          title={isReading ? (isPaused ? 'Resume reading' : 'Pause reading') : 'Read aloud'}
        >
          <AnimatePresence mode="wait">
            {isReading ? (
              isPaused ? (
                <motion.div
                  key="paused"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Volume1 className="h-4 w-4 text-orange-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="reading"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Volume2 className="h-4 w-4 text-green-500" />
                </motion.div>
              )
            ) : (
              <motion.div
                key="not-reading"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Volume2 className="h-4 w-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>

        {isReading && (
          <Button
            onClick={stop}
            size="icon"
            variant="ghost"
            className="narrator-stop-btn"
            title="Stop reading"
          >
            <VolumeX className="h-4 w-4 text-red-500" />
          </Button>
        )}

        <Button
          onClick={() => setShowSettings(!showSettings)}
          size="icon"
          variant="ghost"
          className="narrator-settings-btn"
          title="Narrator settings"
        >
          <Settings className="h-4 w-4" />
        </Button>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="narrator-settings"
          >
            <div className="settings-content">
              <h4 className="settings-title">Narrator Settings</h4>
              
              {/* Voice Selection */}
              <div className="setting-group">
                <label className="setting-label">Voice:</label>
                <select
                  value={settings.voice}
                  onChange={(e) => handleSettingsChange('voice', e.target.value)}
                  className="setting-select"
                >
                  {availableVoices.map((voice) => (
                    <option key={voice.name} value={voice.name}>
                      {voice.name} ({voice.lang})
                    </option>
                  ))}
                </select>
              </div>

              {/* Speed Control */}
              <div className="setting-group">
                <label className="setting-label">Speed: {settings.rate}x</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.rate}
                  onChange={(e) => handleSettingsChange('rate', parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>

              {/* Pitch Control */}
              <div className="setting-group">
                <label className="setting-label">Pitch: {settings.pitch}</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={settings.pitch}
                  onChange={(e) => handleSettingsChange('pitch', parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>

              {/* Volume Control */}
              <div className="setting-group">
                <label className="setting-label">Volume: {Math.round(settings.volume * 100)}%</label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => handleSettingsChange('volume', parseFloat(e.target.value))}
                  className="setting-slider"
                />
              </div>

              {/* Quick Actions */}
              <div className="setting-actions">
                <Button
                  onClick={readSelectedText}
                  size="sm"
                  variant="outline"
                  className="setting-action-btn"
                >
                  Read Selected Text
                </Button>
                <Button
                  onClick={() => speak(textToRead)}
                  size="sm"
                  variant="outline"
                  className="setting-action-btn"
                >
                  Read This Content
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {children && (
        <div className="narrator-content">
          {children}
        </div>
      )}

      <style jsx>{`
        .narrator-container {
          position: relative;
          display: inline-block;
        }

        .narrator-controls {
          display: flex;
          gap: 0.5rem;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .narrator-btn {
          position: relative;
          transition: all 0.3s ease;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .narrator-btn:hover {
          background: var(--color-primary-orange);
          color: white;
          transform: scale(1.05);
        }

        .narrator-btn.reading {
          background-color: rgba(34, 197, 94, 0.1);
          border-color: #22c55e;
          animation: pulse 2s infinite;
        }

        .narrator-btn.reading::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border: 2px solid #22c55e;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .narrator-stop-btn,
        .narrator-settings-btn {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .narrator-stop-btn:hover,
        .narrator-settings-btn:hover {
          background: var(--color-primary-orange);
          color: white;
          transform: scale(1.05);
        }

        .narrator-settings {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 8px;
          background: rgba(0, 0, 0, 0.95);
          color: white;
          padding: 1rem;
          border-radius: 8px;
          z-index: 1000;
          min-width: 280px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .settings-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .settings-title {
          font-size: 1rem;
          font-weight: 600;
          margin: 0;
          color: white;
        }

        .setting-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .setting-label {
          font-size: 0.875rem;
          color: #d1d5db;
        }

        .setting-select {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 0.5rem;
          border-radius: 4px;
          font-size: 0.875rem;
        }

        .setting-slider {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
          outline: none;
          -webkit-appearance: none;
        }

        .setting-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          background: var(--color-primary-orange);
          border-radius: 50%;
          cursor: pointer;
        }

        .setting-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: var(--color-primary-orange);
          border-radius: 50%;
          cursor: pointer;
          border: none;
        }

        .setting-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .setting-action-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          font-size: 0.75rem;
          padding: 0.25rem 0.5rem;
        }

        .setting-action-btn:hover {
          background: var(--color-primary-orange);
          color: white;
        }

        .narrator-content {
          position: relative;
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

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .narrator-settings {
            right: -100px;
            min-width: 250px;
          }
          
          .setting-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Narrator; 