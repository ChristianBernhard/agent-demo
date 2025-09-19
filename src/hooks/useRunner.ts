import { useState, useCallback } from 'react';
import type { AppContent } from '../types';

export interface ChatMessage {
  id: string;
  type: 'user' | 'agent';
  title?: string;
  content?: string;
  bullets?: string[];
  status: 'pending' | 'thinking' | 'processing' | 'streaming' | 'done';
  showBullets: boolean;
  visibleBullets: number;
}

export interface RunnerState {
  messages: ChatMessage[];
  isRunning: boolean;
  currentMessageIndex: number;
}

const STEP_TITLES = [
  "Unternehmens-Analyse",
  "KI-Potenzial-Assessment", 
  "Technologie-Roadmap",
  "Schulungskonzept",
  "Strategiedokument"
];

const STEP_DELAYS = [400, 500, 450, 550, 400];
const THINKING_DELAY = 600;
const PROCESSING_DELAY = 200;
const BULLET_DELAY = 100;
const BREATHE_DELAY = 200;

export function useRunner(content: AppContent) {
  const [state, setState] = useState<RunnerState>({
    messages: [],
    isRunning: false,
    currentMessageIndex: -1,
  });

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const addUserMessage = useCallback(() => {
    const userMessage: ChatMessage = {
      id: 'user-prompt',
      type: 'user',
      content: content.prompt,
      status: 'done',
      showBullets: false,
      visibleBullets: 0,
    };

    setState(prev => ({
      ...prev,
      messages: [userMessage],
    }));
  }, [content.prompt]);

  const runSteps = useCallback(async () => {
    setState(prev => ({ ...prev, isRunning: true, currentMessageIndex: 0 }));

    for (let i = 0; i < content.steps.length; i++) {
      const stepData = content.steps[i];
      const messageId = `agent-${i}`;
      
      // Add message in thinking state
      const newMessage: ChatMessage = {
        id: messageId,
        type: 'agent',
        title: STEP_TITLES[i],
        bullets: stepData.bullets,
        status: 'thinking',
        showBullets: false,
        visibleBullets: 0,
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, newMessage],
        currentMessageIndex: i,
      }));

      await delay(THINKING_DELAY);

      // Switch to processing
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === messageId ? { ...msg, status: 'processing' } : msg
        ),
      }));

      await delay(PROCESSING_DELAY);

      // Switch to streaming and show bullets
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === messageId 
            ? { ...msg, status: 'streaming', showBullets: true }
            : msg
        ),
      }));

      // Stream bullets one by one with longer delay
      for (let j = 0; j < stepData.bullets.length; j++) {
        setState(prev => ({
          ...prev,
          messages: prev.messages.map(msg =>
            msg.id === messageId 
              ? { ...msg, visibleBullets: j + 1 }
              : msg
          ),
        }));
        
        // Wait for current bullet to finish streaming before showing next
        const currentBulletLength = stepData.bullets[j].length;
        const streamingTime = currentBulletLength * 20 + 400; // character speed + buffer
        await delay(Math.max(BULLET_DELAY, streamingTime));
      }

      await delay(STEP_DELAYS[i]);

      // Mark as done
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.id === messageId ? { ...msg, status: 'done' } : msg
        ),
      }));

      // Breathe before next step
      await delay(BREATHE_DELAY);
    }

    setState(prev => ({ ...prev, isRunning: false, currentMessageIndex: -1 }));
  }, [content.steps]);

  const start = useCallback(async () => {
    addUserMessage();
    await delay(500);
    await runSteps();
  }, [addUserMessage, runSteps]);

  const reset = useCallback(() => {
    setState({
      messages: [],
      isRunning: false,
      currentMessageIndex: -1,
    });
  }, []);

  return {
    ...state,
    start,
    reset,
  };
}
