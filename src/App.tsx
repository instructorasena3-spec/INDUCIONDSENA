import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/landing/LandingPage';
import { Navbar } from './components/Navbar';
import { ModuleViewer } from './components/modules/ModuleViewer';
import { RegulationExplorer } from './components/modules/RegulationExplorer';
import { InteractiveAssessment } from './components/evaluation/InteractiveAssessment';
import { CertificateModal } from './components/evaluation/CertificateModal';
import { InstructorDashboard } from './components/instructor/InstructorDashboard';
import { SenaLogo } from './components/SenaLogo';
import { INDUCTION_MODULES } from './data/inductionContent';
import { INITIAL_FICHAS, INITIAL_APPRENTICES, DEFAULT_EVALUATION_CONFIG } from './data/initialCohorts';
import { Apprentice, Ficha, UserRole, EvaluationConfig, AssessmentResult, Question } from './types/induction';
import {
  initAuth,
  googleSignIn,
  logoutGoogle,
  getAccessToken
} from './services/googleAuthService';
import {
  syncApprenticeToGoogleSheet,
  syncQuestionAnswerToGoogleSheet,
  syncAllApprenticesToGoogleSheet,
  getStoredSpreadsheetId,
  getSpreadsheetUrl
} from './services/googleSheetsService';
import { User } from 'firebase/auth';
import {
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  UserCheck,
  FileSpreadsheet,
  LogOut,
  Sparkles,
  ArrowLeft,
  Cloud,
  Check,
  ExternalLink
} from 'lucide-react';

export default function App() {
  // Theme state with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('sena_theme');
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const [isBlurTransition, setIsBlurTransition] = useState(false);

  // Apply theme class to document element on load and change
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sena_theme', theme);
  }, [theme]);

  // Handler: Toggle theme with smooth blur transition
  const handleToggleTheme = () => {
    setIsBlurTransition(true);

    setTimeout(() => {
      setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, 100);

    setTimeout(() => {
      setIsBlurTransition(false);
    }, 450);
  };

  // State initialized with localStorage or defaults
  const [fichas, setFichas] = useState<Ficha[]>(() => {
    const saved = localStorage.getItem('sena_fichas');
    return saved ? JSON.parse(saved) : INITIAL_FICHAS;
  });

  const [apprentices, setApprentices] = useState<Apprentice[]>(() => {
    const saved = localStorage.getItem('sena_apprentices');
    return saved ? JSON.parse(saved) : INITIAL_APPRENTICES;
  });

  const [evaluationConfig, setEvaluationConfig] = useState<EvaluationConfig>(() => {
    const saved = localStorage.getItem('sena_eval_config');
    return saved ? JSON.parse(saved) : DEFAULT_EVALUATION_CONFIG;
  });

  // Session state: 'portal' | 'aprendiz' | 'instructor'
  const [session, setSession] = useState<'portal' | 'aprendiz' | 'instructor'>(() => {
    const saved = localStorage.getItem('sena_session_role');
    if (saved === 'aprendiz' || saved === 'instructor') return saved;
    return 'portal';
  });

  const [instructorId, setInstructorId] = useState<string>(() => {
    return localStorage.getItem('sena_instructor_id') || '35419193';
  });

  const [activeFichaId, setActiveFichaId] = useState<string>('f-2824901');
  const [activeApprenticeId, setActiveApprenticeId] = useState<string>('app-001');
  const [role, setRole] = useState<UserRole>('aprendiz');
  const [currentTab, setCurrentTab] = useState<'modulos' | 'reglamento' | 'evaluacion' | 'instructor'>('modulos');
  const [certificateModalApprentice, setCertificateModalApprentice] = useState<Apprentice | null>(null);
  const [isSimulatingFromInstructor, setIsSimulatingFromInstructor] = useState<boolean>(false);

  // Google Workspace state
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleAccessToken, setGoogleAccessToken] = useState<string | null>(null);
  const [isSyncingSheets, setIsSyncingSheets] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [lastSyncMessage, setLastSyncMessage] = useState<string | null>(null);
  const [showSyncToast, setShowSyncToast] = useState<string | null>(null);

  // Active spreadsheet ID for current ficha
  const activeSpreadsheetId = getStoredSpreadsheetId(activeFichaId);

  // Google Auth listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleAccessToken(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleAccessToken(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('sena_fichas', JSON.stringify(fichas));
  }, [fichas]);

  useEffect(() => {
    localStorage.setItem('sena_apprentices', JSON.stringify(apprentices));
  }, [apprentices]);

  useEffect(() => {
    localStorage.setItem('sena_eval_config', JSON.stringify(evaluationConfig));
  }, [evaluationConfig]);

  // Derived current apprentice and ficha
  const currentApprentice =
    apprentices.find((a) => a.id === activeApprenticeId) || apprentices[0];
  const currentFicha =
    fichas.find((f) => f.id === currentApprentice.fichaId) ||
    fichas.find((f) => f.id === activeFichaId) ||
    fichas[0];

  // Helper: Trigger background sync to Google Sheets for a specific apprentice
  const triggerApprenticeBackgroundSync = (ficha: Ficha, updatedApp: Apprentice) => {
    const token = googleAccessToken || getAccessToken();
    if (!token) return;

    syncApprenticeToGoogleSheet(ficha, updatedApp, token)
      .then((res) => {
        if (res.success) {
          setShowSyncToast(`Sincronizado en tiempo real con Google Sheets (${updatedApp.fullName.split(' ')[0]})`);
          setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
          setTimeout(() => setShowSyncToast(null), 3500);
        }
      })
      .catch((err) => {
        console.warn('Sincronización en segundo plano pospuesta:', err);
      });
  };

  // Handler: Toggle module completion for the active apprentice
  const handleToggleModuleCompletion = (moduleId: string) => {
    let updatedApprentice: Apprentice | null = null;

    setApprentices((prev) =>
      prev.map((app) => {
        if (app.id !== currentApprentice.id) return app;

        const isCompleted = app.completedModules.includes(moduleId);
        const updatedModules = isCompleted
          ? app.completedModules.filter((id) => id !== moduleId)
          : [...app.completedModules, moduleId];

        const progressPercentage = Math.round(
          (updatedModules.length / INDUCTION_MODULES.length) * 100
        );

        let newStatus = app.status;
        if (newStatus !== 'aprobado') {
          newStatus = progressPercentage === 0 ? 'sin_iniciar' : 'en_progreso';
        }

        updatedApprentice = {
          ...app,
          completedModules: updatedModules,
          progressPercentage,
          status: newStatus
        };

        return updatedApprentice;
      })
    );

    // Trigger real-time sync with Google Sheets if token is active
    if (updatedApprentice) {
      triggerApprenticeBackgroundSync(currentFicha, updatedApprentice);
    }
  };

  // Handler: Finish assessment
  const handleFinishAssessment = (result: AssessmentResult) => {
    let updatedApprentice: Apprentice | null = null;

    setApprentices((prev) =>
      prev.map((app) => {
        if (app.id !== currentApprentice.id) return app;

        const newAttempts = app.assessmentAttempts + 1;
        const passed = result.passed;
        const newStatus = passed ? 'aprobado' : 'reprobado';
        const folio =
          passed && !app.certificateFolio
            ? `SENA-IND-${currentFicha.code}-${app.documentNumber.slice(-4)}`
            : app.certificateFolio;

        updatedApprentice = {
          ...app,
          assessmentScore: result.percentage,
          assessmentAttempts: newAttempts,
          status: newStatus,
          assessmentDate: result.date,
          certificateFolio: folio,
          progressPercentage: passed ? 100 : app.progressPercentage
        };

        return updatedApprentice;
      })
    );

    // Trigger real-time sync with Google Sheets if token is active
    if (updatedApprentice) {
      triggerApprenticeBackgroundSync(currentFicha, updatedApprentice);
    }
  };

  // Handler: Add new apprentice
  const handleAddApprentice = (newApp: Apprentice) => {
    setApprentices((prev) => [newApp, ...prev]);

    // Sync newly added apprentice to Google Sheet
    triggerApprenticeBackgroundSync(currentFicha, newApp);
  };

  // Handler: Live sync individual question answers to Google Sheets in Tab 2 (Respuestas en Vivo)
  const handleAnswerQuestionSync = (
    question: Question,
    selectedIndex: number,
    isCorrect: boolean
  ) => {
    const token = googleAccessToken || getAccessToken();
    if (!token) return;

    syncQuestionAnswerToGoogleSheet(
      currentFicha,
      currentApprentice,
      question,
      selectedIndex,
      isCorrect,
      token
    )
      .then((res) => {
        if (res.success) {
          setShowSyncToast(`Respuesta registrada en vivo en Google Sheets (Pregunta #${question.id})`);
          setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
          setTimeout(() => setShowSyncToast(null), 3000);
        }
      })
      .catch((err) => {
        console.warn('Sync en vivo de respuesta pospuesto:', err);
      });
  };

  // Google Sign-In Handler
  const handleGoogleSignIn = async () => {
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleAccessToken(res.accessToken);

        // Immediately sync the active Ficha to Google Sheets so the sheet is created right away!
        setIsSyncingSheets(true);
        const syncRes = await syncAllApprenticesToGoogleSheet(currentFicha, apprentices, res.accessToken);
        setIsSyncingSheets(false);
        setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
        setLastSyncMessage(syncRes.message || 'Hoja de cálculo creada y sincronizada con éxito en Drive.');

        setShowSyncToast('Conexión exitosa: Hoja creada y sincronizada en Google Drive');
        setTimeout(() => setShowSyncToast(null), 4000);
      }
    } catch (err: any) {
      console.error('Error Google Sign In:', err);
      alert('No se pudo completar el inicio de sesión con Google: ' + (err.message || 'Error desconocido'));
    }
  };

  // Google Sign-Out Handler
  const handleGoogleSignOut = async () => {
    await logoutGoogle();
    setGoogleUser(null);
    setGoogleAccessToken(null);
    setLastSyncMessage(null);
  };

  // Manual Bulk Sync to Google Sheets
  const handleSyncAllToGoogleSheets = async () => {
    const token = googleAccessToken || getAccessToken();
    if (!token) {
      await handleGoogleSignIn();
      return;
    }

    setIsSyncingSheets(true);
    try {
      const res = await syncAllApprenticesToGoogleSheet(currentFicha, apprentices, token);
      setLastSyncTime(new Date().toLocaleTimeString('es-CO'));
      setLastSyncMessage(res.message || 'Sincronización completa');

      if (res.success) {
        setShowSyncToast(`Se sincronizaron ${res.updatedRows} aprendices en Google Sheets`);
        setTimeout(() => setShowSyncToast(null), 4000);
      }
    } catch (e: any) {
      setLastSyncMessage('Error: ' + e.message);
    } finally {
      setIsSyncingSheets(false);
    }
  };

  // Login Handlers from Landing Page
  const handleLoginAprendiz = (apprenticeId: string) => {
    setActiveApprenticeId(apprenticeId);
    setSession('aprendiz');
    setRole('aprendiz');
    setCurrentTab('modulos');
    setIsSimulatingFromInstructor(false);
    localStorage.setItem('sena_session_role', 'aprendiz');
  };

  const handleLoginInstructor = (id: string, fichaId: string) => {
    setInstructorId(id);
    setActiveFichaId(fichaId);
    setSession('instructor');
    setRole('instructor');
    setCurrentTab('instructor');
    setIsSimulatingFromInstructor(false);
    localStorage.setItem('sena_session_role', 'instructor');
    localStorage.setItem('sena_instructor_id', id);
  };

  // Logout back to landing page portal
  const handleLogout = () => {
    setSession('portal');
    setIsSimulatingFromInstructor(false);
    localStorage.removeItem('sena_session_role');
  };

  // Switch to apprentice simulation from instructor view
  const handleSimulateApprentice = (app: Apprentice) => {
    setActiveApprenticeId(app.id);
    setActiveFichaId(app.fichaId);
    setRole('aprendiz');
    setCurrentTab('modulos');
    setIsSimulatingFromInstructor(true);
  };

  // Return to instructor dashboard from simulation
  const handleReturnToInstructor = () => {
    setRole('instructor');
    setCurrentTab('instructor');
    setIsSimulatingFromInstructor(false);
  };

  // RENDER 1: LANDING PAGE PORTAL
  if (session === 'portal') {
    return (
      <LandingPage
        onLoginAprendiz={handleLoginAprendiz}
        onLoginInstructor={handleLoginInstructor}
        onRegisterApprentice={(newApp) => {
          handleAddApprentice(newApp);
          handleLoginAprendiz(newApp.id);
        }}
        apprentices={apprentices}
        fichas={fichas}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // RENDER 2: SEPARATED ROLE VIEW (APRENDIZ OR INSTRUCTOR)
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300 relative">
      {/* Blur transition overlay effect */}
      {isBlurTransition && (
        <div
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-md bg-white/20 dark:bg-black/30 transition-all duration-300"
          aria-hidden="true"
        />
      )}

      {/* Floating Real-Time Sync Toast */}
      {showSyncToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900/90 dark:bg-slate-800/95 text-white text-xs font-semibold rounded-xl shadow-xl border border-emerald-500/40 backdrop-blur-md animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Cloud className="w-4 h-4 text-[#39A900] animate-pulse" />
          <span>{showSyncToast}</span>
          <Check className="w-4 h-4 text-[#39A900]" />
        </div>
      )}

      {/* Top Bar with clear role context and logout */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'instructor') {
            setRole('instructor');
          } else if (session === 'aprendiz') {
            setRole('aprendiz');
          }
        }}
        role={role}
        onLogout={handleLogout}
        activeApprenticeName={currentApprentice.fullName}
        instructorId={instructorId}
        activeFichaCode={currentFicha.code}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* Main Container */}
      <main
        className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6 transition-all duration-300 ${
          isBlurTransition ? 'filter blur-[1.5px]' : 'filter blur-0'
        }`}
      >
        {/* Simulation Banner if instructor is simulating an apprentice */}
        {isSimulatingFromInstructor && (
          <div className="p-3 bg-amber-500/15 border border-amber-500/40 rounded-xl flex items-center justify-between text-xs text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>
                <strong>Modo Simulación de Aprendiz:</strong> Estás auditando la experiencia de <strong>{currentApprentice.fullName}</strong> (Ficha {currentFicha.code}).
              </span>
            </div>
            <button
              onClick={handleReturnToInstructor}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Volver a Panel de Instructor</span>
            </button>
          </div>
        )}

        {/* ----------------- ROL APRENDIZ EXCLUSIVE VIEW ----------------- */}
        {role === 'aprendiz' && (
          <div className="space-y-6">
            {/* Apprentice Welcome Hero Banner */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Content */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span>SENA Regional {currentFicha.regional.replace('Regional ', '')}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono">Ficha {currentFicha.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>Inducción 2026</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#39A900] font-semibold">Acuerdo 009 de 2024</span>
                    </div>

                    <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                      Bienvenido(a), {currentApprentice.fullName}
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                      Estás cursando la inducción en <strong>{currentFicha.programName}</strong>. Conoce la historia, derechos, deberes y normatividad del SENA y certifica tu proceso mediante la evaluación interactiva.
                    </p>
                  </div>

                  {/* Progress bar & Quick Stats */}
                  <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Progreso General de Inducción</span>
                      <span className="font-mono font-bold text-[#39A900]">
                        {currentApprentice.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#39A900] h-full rounded-full transition-all duration-500"
                        style={{ width: `${currentApprentice.progressPercentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-3 mt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">Módulos:</span>
                        <strong className="text-slate-900 dark:text-white">
                          {currentApprentice.completedModules.length}/5 completados
                        </strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 dark:text-slate-400">Estado:</span>
                        {currentApprentice.status === 'aprobado' ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                            <CheckCircle className="w-3.5 h-3.5 text-[#39A900]" /> Inducción Aprobada
                          </span>
                        ) : (
                          <span className="text-amber-700 dark:text-amber-400 font-medium">Pendiente Certificación</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {currentApprentice.status === 'aprobado' ? (
                          <button
                            onClick={() => setCertificateModalApprentice(currentApprentice)}
                            className="px-3 py-1.5 bg-[#39A900] hover:bg-[#329400] text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" /> Descargar Certificado
                          </button>
                        ) : (
                          <button
                            onClick={() => setCurrentTab('evaluacion')}
                            className="px-3 py-1.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            Presentar Evaluación <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Hero Image */}
                <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src="/src/assets/images/sena_induction_welcome_1793115122101.jpg"
                    alt="Aprendices del SENA en jornada de inducción institucional"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex items-end p-4">
                    <span className="text-[11px] text-white/90 font-medium">
                      Centro de Formación Profesional Integral · Inducción SENA
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Apprentice Sub-Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
              <button
                onClick={() => setCurrentTab('modulos')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'modulos'
                    ? 'bg-slate-900 dark:bg-slate-800 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" /> 1. Contenidos de Inducción (5 Módulos)
              </button>

              <button
                onClick={() => setCurrentTab('reglamento')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'reglamento'
                    ? 'bg-slate-900 dark:bg-slate-800 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> 2. Explorador del Reglamento
              </button>

              <button
                onClick={() => setCurrentTab('evaluacion')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'evaluacion'
                    ? 'bg-slate-900 dark:bg-slate-800 text-white'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#39A900]" /> 3. Evaluación de Apropiación
              </button>
            </div>

            {/* Tab 1: Induction Modules */}
            {currentTab === 'modulos' && (
              <ModuleViewer
                modules={INDUCTION_MODULES}
                completedModuleIds={currentApprentice.completedModules}
                onToggleModuleCompletion={handleToggleModuleCompletion}
                onGoToEvaluation={() => setCurrentTab('evaluacion')}
              />
            )}

            {/* Tab 2: Regulation Explorer */}
            {currentTab === 'reglamento' && <RegulationExplorer />}

            {/* Tab 3: Interactive Assessment */}
            {currentTab === 'evaluacion' && (
              <InteractiveAssessment
                config={evaluationConfig}
                onFinishAssessment={handleFinishAssessment}
                onSelectAnswer={handleAnswerQuestionSync}
                onOpenCertificate={() => setCertificateModalApprentice(currentApprentice)}
                hasPassedBefore={currentApprentice.status === 'aprobado'}
              />
            )}
          </div>
        )}

        {/* ----------------- ROL INSTRUCTOR EXCLUSIVE VIEW ----------------- */}
        {role === 'instructor' && (
          <div className="space-y-6">
            {/* Instructor Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('instructor')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentTab === 'instructor'
                      ? 'bg-slate-900 dark:bg-slate-800 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" /> 1. Panel de Seguimiento y Fichas
                </button>

                <button
                  onClick={() => setCurrentTab('reglamento')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
                    currentTab === 'reglamento'
                      ? 'bg-slate-900 dark:bg-slate-800 text-white'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> 2. Auditoría del Reglamento (Acuerdo 009)
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Salir al Portal</span>
                </button>
              </div>
            </div>

            {/* Tab 1: Cohort Tracking & Evaluation Management */}
            {currentTab === 'instructor' && (
              <InstructorDashboard
                fichas={fichas}
                activeFichaId={activeFichaId}
                onSelectFicha={(id) => setActiveFichaId(id)}
                apprentices={apprentices}
                onAddApprentice={handleAddApprentice}
                onViewCertificate={(app) => setCertificateModalApprentice(app)}
                onSimulateApprentice={handleSimulateApprentice}
                evaluationConfig={evaluationConfig}
                onUpdateEvaluationConfig={(cfg) => setEvaluationConfig(cfg)}
                instructorId={instructorId}
                googleUser={googleUser}
                googleAccessToken={googleAccessToken}
                onGoogleSignIn={handleGoogleSignIn}
                onGoogleSignOut={handleGoogleSignOut}
                activeSpreadsheetId={activeSpreadsheetId}
                onSyncAllToGoogleSheets={handleSyncAllToGoogleSheets}
                isSyncingSheets={isSyncingSheets}
                lastSyncTime={lastSyncTime}
                lastSyncMessage={lastSyncMessage}
              />
            )}

            {/* Tab 2: Regulation Explorer for Auditing */}
            {currentTab === 'reglamento' && <RegulationExplorer />}
          </div>
        )}
      </main>

      {/* Certificate Modal */}
      {certificateModalApprentice && (
        <CertificateModal
          apprentice={certificateModalApprentice}
          ficha={
            fichas.find((f) => f.id === certificateModalApprentice.fichaId) || currentFicha
          }
          score={certificateModalApprentice.assessmentScore || 90}
          onClose={() => setCertificateModalApprentice(null)}
        />
      )}

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-5 h-5 text-[#39A900]" />
            <span>Servicio Nacional de Aprendizaje — SENA · Formación Profesional Integral Gratuita</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] flex-wrap">
            <span>Reglamento del Aprendiz (Acuerdo 009 de 2024 · Reformado por Acuerdo 002 de 2026)</span>
            <span aria-hidden="true">·</span>
            <span>Sincronización en la Nube (Google Sheets & Drive)</span>
            <span aria-hidden="true">·</span>
            <span>Plataforma Zajuna</span>
            <span aria-hidden="true">·</span>
            <span>Colombia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
