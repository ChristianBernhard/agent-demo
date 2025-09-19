import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle, MessageCircle, Upload, Zap } from 'lucide-react';

interface HITLCardProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export const HITLCard: React.FC<HITLCardProps> = ({ isCollapsed = true, onToggle }) => {
  const [isExpanded, setIsExpanded] = useState(!isCollapsed);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    onToggle?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      {/* Collapsible Header */}
      <button
        onClick={handleToggle}
        className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-blue-100/60 backdrop-blur-sm border border-blue-200/50 rounded-xl hover:from-blue-100/80 hover:to-blue-200/60 transition-all duration-200 group"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">HITL</span>
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-ainleuchtend-dark group-hover:text-blue-800">
              Human-in-the-Loop (HITL)
            </h3>
            <p className="text-xs text-blue-600">
              Manuelle Qualitätskontrolle nach jedem Agent-Schritt
            </p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-blue-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-blue-600" />
          )}
        </motion.div>
      </button>

      {/* Collapsible Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4">
              {/* Main HITL Card */}
              <div className="bg-gradient-to-br from-white via-blue-50/90 to-white rounded-2xl p-8 border border-blue-200/40 shadow-2xl">
                {/* Title */}
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6">
                    <span 
                      className="bg-gradient-to-r from-ainleuchtend-primary via-blue-600 to-ainleuchtend-primary bg-clip-text text-transparent font-black drop-shadow-[0_0_25px_rgba(37,99,235,0.4)]" 
                      style={{textShadow: '0 0 15px rgba(37,99,235,0.2), 0 0 30px rgba(37,99,235,0.1)'}}
                    >
                      Human-in-the-Loop (HITL)
                    </span>
                  </h1>
                  
                  {/* German Explanation */}
                  <div className="max-w-4xl mx-auto">
                    <p className="text-lg text-ainleuchtend-dark leading-relaxed mb-8">
                      Human-in-the-Loop ermöglicht eine <strong className="text-ainleuchtend-primary">manuelle Qualitätskontrolle</strong> nach jedem Agent-Schritt. 
                      Sie prüfen Zwischenergebnisse, geben Feedback und stellen zusätzlichen Input bereit, 
                      um optimale Ergebnisse zu gewährleisten.
                    </p>
                  </div>
                </div>

                {/* Agent State Terminal */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-br from-white via-blue-50/80 to-white backdrop-blur-xl rounded-2xl p-6 border border-blue-200/40 shadow-lg w-full max-w-4xl">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-ainleuchtend-primary rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <div className="font-mono text-lg">
                        <span className="text-ainleuchtend-dark">AGENT_STATE: </span>
                        <span className="text-ainleuchtend-primary animate-pulse font-semibold">WAITING_FOR_USER_INPUT...</span>
                      </div>
                      <div className="border-t border-blue-200 pt-4">
                        <p className="text-ainleuchtend-dark text-sm mb-4">Nächster Schritt zur Bewertung bereit:</p>
                        <div className="flex gap-4 justify-center">
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                            ✓ Lösung akzeptieren
                          </button>
                          <button className="bg-ainleuchtend-primary hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
                            ✏ Änderungswünsche
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* HITL Checkpoints */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-100 shadow-lg max-w-4xl mx-auto overflow-hidden mt-2">
                  <h3 className="text-2xl font-bold text-ainleuchtend-dark mb-8 text-center">HITL Qualitätskontrolle Checkpoints</h3>
                  <div className="grid md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <CheckCircle className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-ainleuchtend-dark mb-2">Ergebnis prüfen</h4>
                      <p className="text-sm text-gray-600 leading-tight">Zwischenergebnisse<br/>bewerten und validieren</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <MessageCircle className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-ainleuchtend-dark mb-2">Feedback geben</h4>
                      <p className="text-sm text-gray-600 leading-tight">Verbesserungsvorschläge<br/>und Korrekturen</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Upload className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-ainleuchtend-dark mb-2">Input hinzufügen</h4>
                      <p className="text-sm text-gray-600 leading-tight">Zusätzliche Daten oder<br/>Profile bereitstellen</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <Zap className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="font-semibold text-ainleuchtend-dark mb-2">Freigabe erteilen</h4>
                      <p className="text-sm text-gray-600 leading-tight">Nächsten Schritt<br/>autorisieren und fortfahren</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
