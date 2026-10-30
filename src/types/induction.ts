export type UserRole = 'aprendiz' | 'instructor';

export interface Apprentice {
  id: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  fullName: string;
  email: string;
  phone: string;
  fichaId: string;
  status: 'sin_iniciar' | 'en_progreso' | 'aprobado' | 'reprobado';
  progressPercentage: number;
  completedModules: string[];
  assessmentScore?: number;
  assessmentAttempts: number;
  assessmentDate?: string;
  certificateFolio?: string;
}

export interface Ficha {
  id: string;
  code: string;
  programName: string;
  regional: string;
  centerName: string;
  instructorLeader: string;
  startDate: string;
  totalHours: number;
}

export interface InductionModule {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  durationMinutes: number;
  category: 'identidad' | 'derechos_deberes' | 'reglamento' | 'etapas_bienestar';
  icon: string;
  sections: ModuleSection[];
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  interactiveType?: 'hymn' | 'classifier' | 'flashcards' | 'timeline' | 'symbols';
  interactiveData?: any;
}

export interface Question {
  id: string;
  category: 'identidad' | 'derechos_deberes' | 'reglamento' | 'etapas_bienestar';
  categoryLabel: string;
  scenario?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  normativeReference: string;
}

export interface AssessmentResult {
  score: number;
  totalQuestions: number;
  passed: boolean;
  percentage: number;
  date: string;
  categoryScores: {
    [key: string]: { correct: number; total: number; percentage: number };
  };
  answers: {
    questionId: string;
    selectedIndex: number;
    isCorrect: boolean;
  }[];
}

export interface EvaluationConfig {
  passingPercentage: number;
  timeLimitMinutes: number;
  questionsPerAttempt: number;
  allowReview: boolean;
  maxAttempts: number;
}
