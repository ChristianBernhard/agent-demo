import type { AppContent, StepContent } from '../types';

// AI-nleuchtend specific content adapted for the company
const promptMd = "Erstelle eine KI-Beratungsstrategie für ein mittelständisches Unternehmen basierend auf deren aktueller IT-Infrastruktur und Geschäftsprozessen";

const step01Md = "# Unternehmens-Analyse\n## Analysiere die aktuelle IT-Landschaft\n\n• 🔍 Scanne vorhandene Systeme und Prozesse …\n• … Haupttechnologien: SAP, Microsoft 365, Legacy-Systeme\n• … Digitalisierungsgrad: 60% der Prozesse bereits digitalisiert";

const step02Md = "# KI-Potenzial-Assessment\n## Identifiziere KI-Anwendungsfälle\n\n• 🧠 Analysiere Geschäftsprozesse für KI-Optimierung …\n• … Potenzielle Bereiche: Kundenservice, Dokumentenverarbeitung, Qualitätskontrolle\n• … ROI-Schätzung: 25-40% Effizienzsteigerung in identifizierten Bereichen";

const step03Md = "# Technologie-Roadmap\n## Entwickle Implementierungsplan\n\n• 📊 Erstelle schrittweise KI-Einführungsstrategie …\n• … Phase 1: Chatbot für Kundenservice (3 Monate)\n• … Phase 2: Dokumenten-KI für Rechnungsverarbeitung (6 Monate)\n• … Phase 3: Predictive Analytics für Lagerhaltung (12 Monate)";

const step04Md = "# Schulungskonzept\n## Plane Mitarbeiter-Weiterbildung\n\n• 📚 Entwickle maßgeschneiderte KI-Schulungen …\n• … Grundlagen-Workshops für alle Mitarbeiter\n• … Spezialisierte Trainings für IT-Team und Führungskräfte\n• … Change Management für erfolgreiche KI-Adoption";

const step05Md = "# Strategiedokument\n## Finalisiere KI-Roadmap\n\n• ✅ Erstelle umfassendes Strategiepapier …\n• … PDF generiert: KI_Strategie_Mittelstand_2024.pdf\n• … Budgetplanung und Zeitplan enthalten\n• … Ready for Management Presentation";

const step08Md = "**Perfekt!** Ihre KI-Beratungsstrategie ist fertig.\n\n**Folgende Schritte wurden ausgeführt:**\n• 🔍 Unternehmens-Analyse (IT-Systeme & Prozesse)\n• 🧠 KI-Potenzial-Assessment (Anwendungsfälle identifiziert)\n• 📊 Technologie-Roadmap (3-Phasen-Plan erstellt)\n• 📚 Schulungskonzept (Mitarbeiter-Weiterbildung)\n• ✅ Strategiedokument (PDF generiert)\n\n👉 **Das Dokument ist optimiert für Management-Präsentationen.**\n\n**Möchten Sie, dass ich es zusätzlich in Ihrem Dokumentenmanagementsystem speichere?**";

const uploadingMd = "Speichere in Ihrem DMS...\n\nÜbertrage die KI-Strategie sicher in Ihr Dokumentenmanagementsystem und benachrichtige die Geschäftsführung.";

const uploadedMd = "✅ Erfolgreich gespeichert!\n\nDie KI-Beratungsstrategie wurde in Ihrem System hinterlegt und die Geschäftsführung wurde automatisch benachrichtigt. Die Strategie kann jetzt umgesetzt werden.";

const footerMd = "AI-nleuchtend Agent Demo • KI-Beratung Edition • Powered by AI";

function parseStepContent(markdown: string): StepContent {
  const lines = markdown.trim().split('\n');
  const title = lines[0].replace('# ', '');
  const summary = lines[1].replace('## ', '');
  const bullets = lines.slice(3).filter(line => line.startsWith('•')).map(line => line.replace('• ', ''));
  
  return { title, summary, bullets };
}

export function loadContent(): AppContent {
  return {
    prompt: promptMd.trim(),
    steps: [
      parseStepContent(step01Md),
      parseStepContent(step02Md),
      parseStepContent(step03Md),
      parseStepContent(step04Md),
      parseStepContent(step05Md),
    ],
    finalPdfText: step08Md.trim(),
    uploadingText: uploadingMd.trim(),
    uploadedText: uploadedMd.trim(),
    footer: footerMd.trim(),
  };
}
