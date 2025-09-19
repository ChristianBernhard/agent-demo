import { motion } from 'framer-motion';
import React from 'react';
import { Bot } from 'lucide-react';

interface ChatMessageProps {
  role: 'user' | 'agent';
  title?: string;
  children?: React.ReactNode;
  status?: 'thinking' | 'running' | 'done';
  showAvatar?: boolean;
  isStreaming?: boolean;
}

export function ChatMessage({ 
  role, 
  title, 
  children, 
  status, 
  showAvatar = true,
  isStreaming = false
}: ChatMessageProps) {
  const isUser = role === 'user';
  
  return (
    <motion.div 
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }}
    >
      {/* Avatar for agent messages (left side) */}
      {!isUser && showAvatar && (
        <div className="shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-lg flex items-center justify-center text-white mt-1">
          <Bot className="w-3 h-3" />
        </div>
      )}

      {/* Message Bubble */}
      <div className={`${
        isUser 
          ? 'bg-white/80 backdrop-blur-md text-neutral-900 border border-white/30 max-w-[65%] shadow-sm' 
          : 'bg-gradient-to-br from-white/75 to-white/60 backdrop-blur-md text-neutral-900 border border-white/20 w-[500px] min-h-[120px] shadow-sm'
      } rounded-xl px-4 py-3 relative`} style={{
        boxShadow: isUser 
          ? '0 4px 16px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)'
          : '0 4px 16px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.1)'
      }}>
        
        {/* Status Token - Fixed Position */}
        {!isUser && (
          <div className="absolute top-3 right-3">
            <StatusToken status={status} isStreaming={isStreaming} />
          </div>
        )}

        {/* Header with title */}
        {title && (
          <div className="mb-2 pr-8">
            <div className="font-semibold text-sm">{title}</div>
          </div>
        )}
        
        {/* Content */}
        <div className="text-sm leading-relaxed text-neutral-900">
          {status === 'thinking' && !children ? (
            <ThinkingDots />
          ) : (
            children
          )}
        </div>
      </div>

      {/* Avatar for user messages (right side) */}
      {isUser && showAvatar && (
        <div className="shrink-0 w-6 h-6 rounded-full bg-ainleuchtend-primary grid place-items-center text-white mt-1">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"/>
          </svg>
        </div>
      )}
    </motion.div>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-neutral-600">Thinking</span>
      <div className="flex space-x-1">
        <motion.div
          className="w-1 h-1 bg-neutral-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
        />
        <motion.div
          className="w-1 h-1 bg-neutral-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
        />
        <motion.div
          className="w-1 h-1 bg-neutral-400 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

function StatusToken({ status, isStreaming }: { status?: 'thinking' | 'running' | 'done'; isStreaming?: boolean }) {
  if (status === 'done') {
    return (
      <motion.div 
        className="inline-grid place-items-center h-5 w-5 rounded-full bg-emerald-500"
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          scale: { duration: 0.3, type: 'spring' },
          rotate: { duration: 0.5, delay: 0.1 }
        }}
      >
        <motion.svg 
          viewBox="0 0 24 24" 
          className="h-3 w-3 text-white"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <motion.path 
            d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" 
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </motion.svg>
      </motion.div>
    );
  }
  
  if (status === 'running' || isStreaming) {
    return (
      <motion.div
        className="h-5 w-5 border-2 border-neutral-300 border-t-ainleuchtend-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    );
  }
  
  return null;
}
