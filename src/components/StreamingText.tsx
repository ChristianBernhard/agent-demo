import { useState, useEffect, useRef } from 'react';

interface StreamingTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  delay?: number;
  className?: string;
}

export function StreamingText({ 
  text, 
  speed = 25, 
  onComplete, 
  delay = 0,
  className = ''
}: StreamingTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const timeoutsRef = useRef<number[]>([]);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    if (!text) return;

    // cleanup any existing timers
    timeoutsRef.current.forEach(id => clearTimeout(id));
    timeoutsRef.current = [];
    isCancelledRef.current = false;

    setDisplayText('');
    setIsComplete(false);
    
    const startTyping = () => {
      let index = 0;
      
      const typeChar = () => {
        if (isCancelledRef.current) return;
        if (index < text.length) {
          setDisplayText(text.slice(0, index + 1));
          index++;
          
          // Variable speed: faster for spaces, slower for punctuation
          let nextDelay = speed;
          const char = text[index - 1];
          if (char === ' ') nextDelay = speed * 0.3;
          else if (char === ',' || char === '.') nextDelay = speed * 2;
          else if (char === '!' || char === '?') nextDelay = speed * 2.5;
          
          const tid = window.setTimeout(typeChar, nextDelay);
          timeoutsRef.current.push(tid);
        } else {
          setIsComplete(true);
          const doneId = window.setTimeout(() => {
            if (!isCancelledRef.current) onComplete?.();
          }, 150); // Small delay after completion
          timeoutsRef.current.push(doneId);
        }
      };
      
      typeChar();
    };

    if (delay > 0) {
      const startId = window.setTimeout(startTyping, delay);
      timeoutsRef.current.push(startId);
    } else {
      startTyping();
    }

    return () => {
      isCancelledRef.current = true;
      timeoutsRef.current.forEach(id => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, [text, speed, delay]);

  return (
    <span className={className}>
      {displayText}
      {!isComplete && displayText && (
        <span className="animate-pulse text-ainleuchtend-primary">|</span>
      )}
    </span>
  );
}
