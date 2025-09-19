export interface StepContent {
  title: string;
  summary: string;
  bullets: string[];
}

export type AppState = 'idle' | 'running' | 'done' | 'uploading' | 'uploaded';

export interface AppContent {
  prompt: string;
  steps: StepContent[];
  finalPdfText: string;
  uploadingText: string;
  uploadedText: string;
  footer: string;
}
