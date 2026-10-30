import { Apprentice, Ficha, EvaluationConfig } from '../types/induction';

export const INITIAL_FICHAS: Ficha[] = [
  {
    id: 'f-2824901',
    code: '2824901',
    programName: 'Tecnología en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital',
    centerName: 'Centro de Servicios Financieros / Tecnologías de la Información',
    instructorLeader: 'Ing. Carlos Alberto Mendoza',
    startDate: '2024-02-05',
    totalHours: 3984
  },
  {
    id: 'f-2901452',
    code: '2901452',
    programName: 'Tecnología en Gestión Empresarial y Talento Humano',
    regional: 'Regional Antioquia',
    centerName: 'Centro de Comercio y Servicios',
    instructorLeader: 'Dra. María Elena Restrepo',
    startDate: '2024-03-11',
    totalHours: 3984
  },
  {
    id: 'f-2781930',
    code: '2781930',
    programName: 'Técnico en Mantenimiento Mecatrónico y Automatización',
    regional: 'Regional Santander',
    centerName: 'Centro Industrial del Mantenimiento Integral',
    instructorLeader: 'Ing. Fernando Pardo Jaimes',
    startDate: '2024-01-22',
    totalHours: 2200
  }
];

export const INITIAL_APPRENTICES: Apprentice[] = [
  {
    id: 'app-001',
    documentType: 'CC',
    documentNumber: '1014289345',
    fullName: 'Valentina Gómez Salazar',
    email: 'vgomez54@soy.sena.edu.co',
    phone: '312 458 9201',
    fichaId: 'f-2824901',
    status: 'en_progreso',
    progressPercentage: 50,
    completedModules: ['mod-1', 'mod-2'],
    assessmentAttempts: 0
  },
  {
    id: 'app-002',
    documentType: 'TI',
    documentNumber: '1075849201',
    fullName: 'Juan David Ramírez Mora',
    email: 'jdramirez01@soy.sena.edu.co',
    phone: '320 891 4322',
    fichaId: 'f-2824901',
    status: 'aprobado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    assessmentScore: 90,
    assessmentAttempts: 1,
    assessmentDate: '2024-02-12T14:30:00Z',
    certificateFolio: 'SENA-IND-2824901-002'
  },
  {
    id: 'app-003',
    documentType: 'CC',
    documentNumber: '1023948512',
    fullName: 'Camila Andrea Torres Rojas',
    email: 'catorres12@soy.sena.edu.co',
    phone: '315 765 2109',
    fichaId: 'f-2824901',
    status: 'aprobado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    assessmentScore: 100,
    assessmentAttempts: 1,
    assessmentDate: '2024-02-13T10:15:00Z',
    certificateFolio: 'SENA-IND-2824901-003'
  },
  {
    id: 'app-004',
    documentType: 'CC',
    documentNumber: '1098273641',
    fullName: 'Mateo Sebastián Ortiz Ruiz',
    email: 'msortiz41@soy.sena.edu.co',
    phone: '311 234 8976',
    fichaId: 'f-2824901',
    status: 'reprobado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    assessmentScore: 60,
    assessmentAttempts: 1,
    assessmentDate: '2024-02-12T16:00:00Z'
  },
  {
    id: 'app-005',
    documentType: 'CC',
    documentNumber: '1032849102',
    fullName: 'Diana Marcela Castro Beltrán',
    email: 'dmcastro02@soy.sena.edu.co',
    phone: '318 642 9811',
    fichaId: 'f-2824901',
    status: 'sin_iniciar',
    progressPercentage: 0,
    completedModules: [],
    assessmentAttempts: 0
  },
  {
    id: 'app-006',
    documentType: 'CC',
    documentNumber: '1047291845',
    fullName: 'Andrés Felipe Morales Cardona',
    email: 'afmorales45@soy.sena.edu.co',
    phone: '300 456 7891',
    fichaId: 'f-2824901',
    status: 'aprobado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    assessmentScore: 80,
    assessmentAttempts: 2,
    assessmentDate: '2024-02-14T09:45:00Z',
    certificateFolio: 'SENA-IND-2824901-006'
  },
  {
    id: 'app-007',
    documentType: 'CC',
    documentNumber: '1019284756',
    fullName: 'Santiago López Echeverri',
    email: 'slopez56@soy.sena.edu.co',
    phone: '314 567 8923',
    fichaId: 'f-2901452',
    status: 'aprobado',
    progressPercentage: 100,
    completedModules: ['mod-1', 'mod-2', 'mod-3', 'mod-4'],
    assessmentScore: 90,
    assessmentAttempts: 1,
    assessmentDate: '2024-03-15T11:20:00Z',
    certificateFolio: 'SENA-IND-2901452-001'
  },
  {
    id: 'app-008',
    documentType: 'TI',
    documentNumber: '1088492019',
    fullName: 'Mariana Duque Gutiérrez',
    email: 'mduque19@soy.sena.edu.co',
    phone: '316 789 1234',
    fichaId: 'f-2901452',
    status: 'en_progreso',
    progressPercentage: 25,
    completedModules: ['mod-1'],
    assessmentAttempts: 0
  }
];

export const DEFAULT_EVALUATION_CONFIG: EvaluationConfig = {
  passingPercentage: 70,
  timeLimitMinutes: 15,
  questionsPerAttempt: 10,
  allowReview: true,
  maxAttempts: 3
};
