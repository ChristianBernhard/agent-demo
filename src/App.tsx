import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from './components/ChatMessage';
import { StreamingText } from './components/StreamingText';
import { HITLCard } from './components/HITLCard';
import { useRunner } from './hooks/useRunner';
import { loadContent } from './utils/content';
import type { AppState } from './types';
import { FileText, Download, Brain, Sparkles, Settings, Zap, Users, Target, Award, Lightbulb, ChevronRight, Play } from 'lucide-react';

function App() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  
  const content = loadContent();
  const runner = useRunner(content);

  const handleStart = async () => {
    if (appState === 'idle') {
      setAppState('running');
      await runner.start();
      setAppState('done');
    }
  };

  const handleReplay = () => {
    setAppState('idle');
    setExpandedMessages(new Set());
    runner.reset();
  };

  const handleAccept = () => {
    setAppState('uploading');
    
    setTimeout(() => {
      setAppState('uploaded');
    }, 3000);
  };

  const toggleExpanded = (messageId: string) => {
    setExpandedMessages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const isBottomBarDisabled = appState !== 'idle';

  const glossaryItems = [
    {
      term: 'Tools',
      description: 'Externe Funktionen/Systeme, die der Agent gezielt nutzt (Websuche, Datenbankabfragen, Kalenderzugriffe, Wetter-APIs …).',
      icon: Settings
    },
    {
      term: 'Action',
      description: 'Der Agent ruft sich oder ein Tool auf, um Informationen zu holen oder etwas auszuführen.',
      icon: Zap
    },
    {
      term: 'Feedback',
      description: 'Das Tool liefert ein Ergebnis zurück - der Agent reflektiert und entscheidet, was als Nächstes passiert.',
      icon: Brain
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Enhanced Header with Logo and Status */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/Logo.svg" 
              alt="AI-nleuchtend Logo" 
              className="h-16 w-auto"
            />
          </div>
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-ainleuchtend-dark">
              Agentic AI Demo
            </h1>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-8 h-8 text-ainleuchtend-primary" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
            <Brain className="w-5 h-5 text-ainleuchtend-primary" />
            Erleben Sie intelligente KI-Agenten in Aktion
          </p>
        </motion.div>

        {/* Enhanced Theory Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-white via-blue-50/20 to-white backdrop-blur-sm rounded-3xl p-8 border border-gray-200/50 shadow-xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-ainleuchtend-dark">
                  Agentic AI – kurz erklärt
                </h2>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-blue-100/50">
                <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
                  Ein klassischer LLM-Aufruf: Du gibst Input, das Modell denkt, und es kommt eine Antwort heraus. 
                  <span className="font-semibold text-ainleuchtend-primary"> Agentic AI geht einen Schritt weiter:</span> Das Modell kann eigenständig Tools nutzen (z. B. Websuche, Datenbank, Kalender), 
                  Actions ausführen und anhand des Feedbacks der Tools den nächsten Schritt planen.
                </p>
              </div>

              {/* Enhanced Glossary Section */}
              <div className="grid md:grid-cols-3 gap-6">
                {glossaryItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={item.term}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-200/30 shadow-lg text-center group hover:shadow-xl transition-all duration-300"
                    >
                      <motion.div 
                        className="w-14 h-14 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:rotate-6 transition-transform duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>
                      <h4 className="font-bold text-ainleuchtend-dark mb-3 text-xl">{item.term}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                      <div className="mt-4 flex justify-center">
                        <ChevronRight className="w-4 h-4 text-ainleuchtend-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div 
          className="border border-gray-200/50 rounded-3xl bg-white/90 backdrop-blur-sm shadow-xl flex flex-col min-h-[70vh]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Enhanced Header with Status */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50 bg-gradient-to-r from-white to-blue-50/30">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div>
                <h2 className="font-bold text-ainleuchtend-dark text-lg">KI-Beratungsagent</h2>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Bereit für Ihre Anfrage
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {(appState !== 'idle' || runner.messages.length > 0) && (
                <button
                  onClick={handleReplay}
                  className="h-9 px-4 rounded-xl text-sm text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200 flex items-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  Neu starten
                </button>
              )}
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {runner.messages.map((message) => {
                const isExpanded = expandedMessages.has(message.id);
                const maxBullets = isExpanded ? message.bullets?.length || 0 : 3;
                const visibleBullets = Math.min(message.visibleBullets, maxBullets);
                const hasMore = (message.bullets?.length || 0) > 3;

                if (message.type === 'user') {
                  return (
                    <ChatMessage
                      key={message.id}
                      role="user"
                    >
                      <div>{message.content}</div>
                    </ChatMessage>
                  );
                }

                return (
                  <ChatMessage
                    key={message.id}
                    role="agent"
                    title={message.title}
                    status={message.status as 'thinking' | 'running' | 'done'}
                    isStreaming={message.status === 'streaming'}
                  >
                    {message.showBullets && visibleBullets > 0 && (
                      <>
                        {message.status === 'streaming' ? (
                          <div className="space-y-2">
                            {message.bullets?.slice(0, visibleBullets).map((bullet, i) => (
                              <div key={i} className="flex items-start space-x-2">
                                <span className="text-gray-400 mt-1 text-xs">•</span>
                                <StreamingText
                                  text={bullet}
                                  speed={15}
                                  delay={0}
                                  className="text-gray-600 flex-1 font-mono text-xs"
                                />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <ul className="space-y-2 list-disc ml-4">
                            {message.bullets?.slice(0, visibleBullets).map((bullet, i) => (
                              <li key={i} className="text-gray-600 font-mono text-xs">{bullet}</li>
                            ))}
                          </ul>
                        )}
                        {hasMore && !isExpanded && message.status === 'done' && (
                          <button
                            onClick={() => toggleExpanded(message.id)}
                            className="text-xs text-gray-500 hover:text-gray-700 mt-2 underline"
                          >
                            Mehr anzeigen
                          </button>
                        )}
                      </>
                    )}
                  </ChatMessage>
                );
              })}
            
              {/* PDF Message as Agent Bubble */}
              {appState === 'done' && (
                <ChatMessage role="agent" title="Strategiedokument erstellt" status="done">
                  <div className="bg-white/80 rounded-xl p-4 border border-gray-200/50">
                    {/* Download badge / pill */}
                    <div className="flex items-center justify-between bg-gray-50/80 border border-gray-200 rounded-lg px-3 py-2 mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md bg-ainleuchtend-primary text-white grid place-items-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-ainleuchtend-dark">
                            KI_Strategie_Mittelstand_2024.pdf
                          </span>
                          <span className="text-xs text-gray-500">~2.1 MB • 3 Seiten</span>
                        </div>
                      </div>
                      <button className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-md bg-ainleuchtend-primary text-white hover:bg-blue-600 transition-all">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>

                    {/* Summary checklist */}
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-ainleuchtend-dark mb-3">
                        Zusammenfassung der durchgeführten Schritte
                      </h4>
                      <div className="bg-gradient-to-br from-emerald-50/80 to-green-50/60 backdrop-blur-sm border border-emerald-200/40 rounded-xl p-4 space-y-3">
                        {[
                          'Unternehmens-Analyse (IT-Systeme & Prozesse)',
                          'KI-Potenzial-Assessment (Anwendungsfälle identifiziert)',
                          'Technologie-Roadmap (3-Phasen-Plan erstellt)',
                          'Schulungskonzept (Mitarbeiter-Weiterbildung)',
                          'Strategiedokument (PDF generiert)'
                        ].map((step, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <motion.div 
                              className="inline-grid place-items-center h-5 w-5 rounded-full bg-emerald-500 flex-shrink-0 mt-0.5"
                              initial={{ scale: 0, rotate: -90 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ 
                                scale: { duration: 0.3, type: 'spring', delay: i * 0.1 },
                                rotate: { duration: 0.5, delay: i * 0.1 + 0.1 }
                              }}
                            >
                              <motion.svg 
                                viewBox="0 0 24 24" 
                                className="h-3 w-3 text-white"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                              >
                                <motion.path 
                                  d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" 
                                  fill="currentColor"
                                  stroke="currentColor"
                                  strokeWidth="0.5"
                                />
                              </motion.svg>
                            </motion.div>
                            <span className="text-sm text-emerald-800 font-medium">
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-3">
                        Möchten Sie die KI-Strategie nun in Ihrem System speichern?
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={handleAccept}
                          className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white text-sm font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-sm"
                        >
                          Ja, speichern
                        </button>
                        <button className="w-full sm:w-auto px-4 py-2.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-200">
                          Änderungsvorschläge
                        </button>
                      </div>
                    </div>
                  </div>
                </ChatMessage>
              )}
            
              {/* Upload Messages */}
              {appState === 'uploading' && (
                <ChatMessage
                  role="agent"
                  title="Speichere im System"
                  status="running"
                >
                  <div>{content.uploadingText}</div>
                </ChatMessage>
              )}
            
              {appState === 'uploaded' && (
                <ChatMessage
                  role="agent"
                  title="Erfolgreich gespeichert"
                  status="done"
                >
                  <div>{content.uploadedText}</div>
                </ChatMessage>
              )}

              {/* Enhanced Welcome State */}
              {runner.messages.length === 0 && (
                <div className="flex justify-center items-center min-h-[400px] py-8">
                  <div className="max-w-3xl w-full mx-4">
                    <motion.div 
                      className="bg-gradient-to-br from-white via-blue-50/30 to-white backdrop-blur-md border border-gray-200/50 rounded-3xl p-10 shadow-2xl relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      
                      <div className="relative z-10">
                        {/* Enhanced Header */}
                        <div className="text-center mb-10">
                          <motion.div 
                            className="w-20 h-20 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-2xl"
                            animate={{ 
                              boxShadow: [
                                "0 10px 30px rgba(37, 99, 235, 0.3)",
                                "0 10px 40px rgba(37, 99, 235, 0.4)",
                                "0 10px 30px rgba(37, 99, 235, 0.3)"
                              ]
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                          >
                            <Brain className="w-10 h-10 text-white" />
                          </motion.div>
                          <h1 className="text-3xl font-bold text-ainleuchtend-dark mb-3 flex items-center justify-center gap-3">
                            KI-Beratungsagent
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <Sparkles className="w-6 h-6 text-ainleuchtend-primary" />
                            </motion.div>
                          </h1>
                          <p className="text-gray-600 text-lg">Intelligente Strategieentwicklung für moderne Unternehmen</p>
                        </div>

                        {/* Enhanced Process Steps */}
                        <div className="mb-10">
                          <div className="flex items-center justify-center gap-2 mb-6">
                            <Target className="w-5 h-5 text-ainleuchtend-primary" />
                            <h3 className="font-semibold text-gray-700 text-lg">So funktioniert's:</h3>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {[
                              { icon: Users, text: 'Analysiert Ihre aktuelle IT-Infrastruktur' },
                              { icon: Target, text: 'Identifiziert KI-Anwendungsfälle und Potenziale' },
                              { icon: Settings, text: 'Entwickelt eine 3-Phasen Technologie-Roadmap' },
                              { icon: Award, text: 'Erstellt ein maßgeschneidertes Schulungskonzept' },
                              { icon: FileText, text: 'Generiert ein umfassendes Strategiedokument' }
                            ].map((step, i) => (
                              <motion.div 
                                key={i} 
                                className="flex items-center gap-3 p-3 rounded-xl bg-white/60 border border-blue-100/50 hover:bg-white/80 transition-all duration-200"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * i }}
                                whileHover={{ x: 5 }}
                              >
                                <div className="w-8 h-8 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                  <step.icon className="w-4 h-4 text-white" />
                                </div>
                                <span className="text-sm text-gray-700">{step.text}</span>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Enhanced Call to Action */}
                        <div className="text-center">
                          <div className="bg-gradient-to-r from-ainleuchtend-primary/10 to-blue-600/10 rounded-2xl p-6 mb-6">
                            <p className="text-gray-700 text-lg mb-2 flex items-center justify-center gap-2">
                              <Play className="w-5 h-5 text-ainleuchtend-primary" />
                              <span className="font-semibold">Klicken Sie Send,</span> um die KI-Beratung zu starten
                            </p>
                            <div className="inline-flex items-center text-sm text-gray-600 bg-white/70 px-4 py-2 rounded-full backdrop-blur-sm border border-blue-200/50">
                              <motion.div 
                                className="w-2 h-2 bg-green-400 rounded-full mr-2"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                              Demo-Modus • Mittelständisches Unternehmen Beispiel
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Enhanced Chat Input */}
          <div className="border-t border-gray-200/50 p-6 bg-gradient-to-r from-white to-blue-50/20">
            <div className="flex gap-4 items-center max-w-4xl mx-auto">
              <div className="flex-1">
                <div className="rounded-2xl px-5 py-4 bg-gradient-to-r from-gray-50 to-blue-50/50 backdrop-blur-sm text-gray-700 text-sm border border-gray-200/50 shadow-sm">
                  {content.prompt}
                </div>
              </div>
              <motion.button
                disabled={isBottomBarDisabled}
                onClick={handleStart}
                className="h-12 px-6 rounded-2xl text-sm text-white disabled:opacity-50 bg-gradient-to-r from-ainleuchtend-primary to-blue-600 hover:shadow-xl transition-all duration-300 font-semibold shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-flex items-center gap-2">
                  <motion.div
                    animate={{ rotate: isBottomBarDisabled ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isBottomBarDisabled ? Infinity : 0, ease: "linear" }}
                  >
                    {isBottomBarDisabled ? (
                      <Brain className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </motion.div>
                  {isBottomBarDisabled ? 'Arbeitet...' : 'Starten'}
                </span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* HITL Card */}
        <HITLCard isCollapsed={true} />

        {/* Footer */}
        <motion.div 
          className="text-center mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>AI-nleuchtend Agent Demo • KI-Beratung Edition • Powered by AI</p>
          <p className="mt-2">
            <a href="https://www.ainleuchtend.de" target="_blank" rel="noopener noreferrer" className="text-ainleuchtend-primary hover:underline">
              www.ainleuchtend.de
            </a> • Tel.: 0177-8028796 • christianbernhard089@gmail.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;