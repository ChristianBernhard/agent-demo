import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage } from './components/ChatMessage';
import { StreamingText } from './components/StreamingText';
import { HITLCard } from './components/HITLCard';
import { useRunner } from './hooks/useRunner';
import { loadContent } from './utils/content';
import type { AppState } from './types';
import { FileText, Download, Bot, Wand2, Hammer } from 'lucide-react';

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
      icon: Hammer
    },
    {
      term: 'Action',
      description: 'Der Agent ruft sich oder ein Tool auf, um Informationen zu holen oder etwas auszuführen.',
      icon: Wand2
    },
    {
      term: 'Feedback',
      description: 'Das Tool liefert ein Ergebnis zurück - der Agent reflektiert und entscheidet, was als Nächstes passiert.',
      icon: Bot
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-slate-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header with Logo */}
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
          <h1 className="text-4xl font-bold text-ainleuchtend-dark mb-2">
            Agentic AI Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Erleben Sie intelligente KI-Agenten in Aktion
          </p>
        </motion.div>

        {/* Theory Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
            <h2 className="text-2xl font-semibold text-ainleuchtend-dark mb-4 text-center">
              Agentic AI – kurz erklärt
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center mb-8">
              Ein klassischer LLM-Aufruf: Du gibst Input, das Modell denkt, und es kommt eine Antwort heraus. 
              Agentic AI geht einen Schritt weiter: Das Modell kann eigenständig Tools nutzen (z. B. Websuche, Datenbank, Kalender), 
              Actions ausführen und anhand des Feedbacks der Tools den nächsten Schritt planen.
            </p>

            {/* Glossary Section */}
            <div className="grid md:grid-cols-3 gap-6">
              {glossaryItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.term}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-xl rounded-xl p-6 border border-blue-200/30 shadow-sm text-center"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-ainleuchtend-dark mb-3 text-lg">{item.term}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
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
          {/* Header with Replay Button */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-semibold text-ainleuchtend-dark">KI-Beratungsagent</h2>
            </div>
            {(appState !== 'idle' || runner.messages.length > 0) && (
              <button
                onClick={handleReplay}
                className="h-8 px-3 rounded-lg text-xs text-gray-600 border border-gray-300 bg-white hover:bg-gray-50 transition-all duration-200"
              >
                Neu starten
              </button>
            )}
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

              {/* Empty State - Welcome */}
              {runner.messages.length === 0 && (
                <div className="flex justify-center items-center min-h-[400px] py-8">
                  <div className="max-w-2xl w-full mx-4">
                    <div className="bg-gradient-to-br from-white to-blue-50/50 backdrop-blur-md border border-gray-200/50 rounded-xl p-8 shadow-lg">
                      {/* Header */}
                      <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-gradient-to-br from-ainleuchtend-primary to-blue-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                          <Bot className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-ainleuchtend-dark mb-2">KI-Beratungsagent</h1>
                        <p className="text-gray-600 text-sm">Intelligente Strategieentwicklung für moderne Unternehmen</p>
                      </div>

                      {/* Process Steps */}
                      <div className="mb-8">
                        <h3 className="font-medium text-gray-700 mb-4 text-center text-sm">So funktioniert's:</h3>
                        <div className="space-y-3 text-sm text-gray-600">
                          {[
                            'Analysiert Ihre aktuelle IT-Infrastruktur',
                            'Identifiziert KI-Anwendungsfälle und Potenziale',
                            'Entwickelt eine 3-Phasen Technologie-Roadmap',
                            'Erstellt ein maßgeschneidertes Schulungskonzept',
                            'Generiert ein umfassendes Strategiedokument'
                          ].map((step, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="w-6 h-6 bg-ainleuchtend-primary/10 rounded-full flex items-center justify-center text-xs text-ainleuchtend-primary font-medium">
                                {i + 1}
                              </span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Call to Action */}
                      <div className="text-center">
                        <p className="text-gray-600 text-sm mb-4">
                          <span className="font-medium">Klicken Sie Send,</span> um die KI-Beratung zu starten
                        </p>
                        <div className="inline-flex items-center text-xs text-gray-500 bg-gray-50/50 px-3 py-1 rounded-full backdrop-blur-sm">
                          <span className="w-2 h-2 bg-green-400/60 rounded-full mr-2"></span>
                          Demo-Modus • Mittelständisches Unternehmen Beispiel
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Chat Input Inside */}
          <div className="border-t border-gray-200/50 p-4">
            <div className="flex gap-3 items-center max-w-4xl mx-auto">
              <div className="flex-1 rounded-xl px-4 py-3 bg-gray-50/80 backdrop-blur-sm text-gray-700 text-sm border border-gray-200/50">
                {content.prompt}
              </div>
              <button
                disabled={isBottomBarDisabled}
                onClick={handleStart}
                className="h-10 px-4 rounded-lg text-sm text-white disabled:opacity-50 bg-gradient-to-r from-ainleuchtend-primary to-blue-600 hover:shadow-lg transition-all duration-200 font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
                  </svg>
                  Send
                </span>
              </button>
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