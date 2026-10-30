import React, { useState } from 'react';
import { SenaLogo, SenaEscudo } from '../SenaLogo';
import { Apprentice, Ficha } from '../../types/induction';
import {
  GraduationCap,
  UserCheck,
  ShieldCheck,
  BookOpen,
  Award,
  ArrowRight,
  Sun,
  Moon,
  Sparkles,
  CheckCircle2,
  FileSpreadsheet,
  Clock,
  Compass,
  Building2,
  AlertCircle,
  Play,
  X
} from 'lucide-react';
import senaFlag from '../../assets/images/sena_flag_asset_1793134486866.jpg';
import { SymbolsExplorer } from '../modules/SymbolsExplorer';

interface Props {
  onLoginAprendiz: (apprenticeId: string) => void;
  onLoginInstructor: (instructorId: string, fichaId: string) => void;
  onRegisterApprentice?: (newApprentice: Apprentice) => void;
  apprentices: Apprentice[];
  fichas: Ficha[];
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const LandingPage: React.FC<Props> = ({
  onLoginAprendiz,
  onLoginInstructor,
  onRegisterApprentice,
  apprentices,
  fichas,
  theme,
  onToggleTheme
}) => {
  // Aprendiz login state
  const [selectedApprenticeId, setSelectedApprenticeId] = useState<string>(
    apprentices[0]?.id || 'app-001'
  );
  const [customDocument, setCustomDocument] = useState<string>('');
  const [docSearchError, setDocSearchError] = useState<string | null>(null);

  // Self-registration state for new apprentices
  const [isRegistering, setIsRegistering] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showSymbolsModal, setShowSymbolsModal] = useState(false);
  const [regDocType, setRegDocType] = useState<'CC' | 'TI' | 'CE' | 'PEP'>('CC');
  const [regDocNumber, setRegDocNumber] = useState('');
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regFichaId, setRegFichaId] = useState(fichas[0]?.id || 'f-2824901');
  const [regError, setRegError] = useState<string | null>(null);

  // Instructor login state
  const [instructorId, setInstructorId] = useState<string>('35419193');
  const [selectedFichaId, setSelectedFichaId] = useState<string>(
    fichas[0]?.id || 'f-2824901'
  );
  const [instructorError, setInstructorError] = useState<string | null>(null);

  // Handle Apprentice login submission
  const handleAprendizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDocSearchError(null);

    if (customDocument.trim()) {
      const match = apprentices.find(
        (a) => a.documentNumber.trim() === customDocument.trim()
      );
      if (match) {
        onLoginAprendiz(match.id);
        return;
      } else {
        setDocSearchError(
          `No se encontró ningún aprendiz con el documento ${customDocument}. Selecciona uno de la lista rápida o intenta con 1014289345.`
        );
        return;
      }
    }

    onLoginAprendiz(selectedApprenticeId);
  };

  // Handle New Apprentice Self-Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError(null);

    if (!regDocNumber.trim() || !regFullName.trim() || !regEmail.trim()) {
      setRegError('Por favor completa todos los campos requeridos (*).');
      return;
    }

    // Check if document already exists
    const exists = apprentices.find((a) => a.documentNumber.trim() === regDocNumber.trim());
    if (exists) {
      setRegError(`El documento ${regDocNumber} ya está registrado a nombre de ${exists.fullName}.`);
      return;
    }

    const newApprentice: Apprentice = {
      id: `app-${Date.now()}`,
      documentType: regDocType,
      documentNumber: regDocNumber.trim(),
      fullName: regFullName.trim(),
      email: regEmail.trim(),
      phone: regPhone.trim() || 'N/A',
      fichaId: regFichaId,
      status: 'sin_iniciar',
      progressPercentage: 0,
      completedModules: [],
      assessmentAttempts: 0
    };

    if (onRegisterApprentice) {
      onRegisterApprentice(newApprentice);
    } else {
      onLoginAprendiz(newApprentice.id);
    }
  };

  // Handle Instructor login submission
  const handleInstructorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInstructorError(null);

    if (!instructorId.trim()) {
      setInstructorError('Por favor ingrese su identificación institucional de instructor.');
      return;
    }

    // Permitir acceso con 35419193 o cualquier ID para facilidad de uso
    onLoginInstructor(instructorId.trim(), selectedFichaId);
  };

  const selectedApprentice = apprentices.find((a) => a.id === selectedApprenticeId);
  const selectedFicha = fichas.find((f) => f.id === selectedFichaId) || fichas[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Institutional Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5">
          <div className="flex items-center gap-3">
            <SenaLogo className="w-8 h-8 text-[#39A900]" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                  SENA <span className="text-[#39A900]">Inducción</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
                  Acuerdo 009 de 2024 · Vigencia 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden md:block">
                Servicio Nacional de Aprendizaje — Dirección de Formación Profesional
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              className="px-3 py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-2 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-slate-700" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Landing Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-emerald-900 via-slate-900 to-slate-950 text-white p-8 sm:p-12 overflow-hidden shadow-xl border border-emerald-800/40">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#39A900]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Portal Oficial de Inducción Institucional SENA</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                Bienvenidos a la Formación Profesional Integral
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Apropia los valores, símbolos, derechos y deberes del SENA según el <strong>Acuerdo 009 de 2024</strong> (reformado por el <strong>Acuerdo 002 de 2026</strong>). Selecciona tu rol para acceder al entorno especializado que te corresponde.
              </p>

              <button
                onClick={() => setShowVideoModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#39A900] hover:bg-[#329400] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-md"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Video Tutorial</span>
              </button>

              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200/90">
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
                  <span>5 Módulos Interactivos</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  <ShieldCheck className="w-4 h-4 text-[#39A900]" />
                  <span>Capítulos I - V del Reglamento</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
                  <Award className="w-4 h-4 text-[#39A900]" />
                  <span>Certificado Digital Oficial con Folio</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="w-36 h-36 flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg mb-3">
                <SenaEscudo className="w-full h-auto object-contain" alt="Escudo Oficial del SENA" />
              </div>
              <span className="text-xs font-bold text-slate-200 text-center uppercase tracking-wide">
                Servicio Nacional de Aprendizaje
              </span>
              <span className="text-[11px] text-emerald-300/80 text-center mt-0.5">
                Ministerio del Trabajo · Colombia
              </span>
            </div>
          </div>
        </div>

        {/* Separated Role Access Section (Cards de Ingreso por Rol) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
              Ingreso Seguro por Perfiles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Selecciona tu Rol Institucional
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Cada perfil cuenta con su propio panel independiente diseñado para sus funciones específicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* CARD 1: INGRESO APRENDIZ */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-emerald-500/40 dark:border-emerald-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-[#39A900]">
                    <GraduationCap className="w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                    Rol Aprendiz
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Portal del Aprendiz
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Realiza tu proceso de inducción, estudia los 5 módulos pedagógicos, clasifica derechos y deberes, y realiza la evaluación interactiva para certificarte.
                </p>

                {/* Segmented Control for Login vs Self-Registration */}
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl mt-5 mb-4 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(false);
                      setRegError(null);
                      setDocSearchError(null);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-center ${
                      !isRegistering
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    Ingresar con Documento
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsRegistering(true);
                      setRegError(null);
                      setDocSearchError(null);
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-center ${
                      isRegistering
                        ? 'bg-[#39A900] text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-[#39A900]'
                    }`}
                  >
                    + Registrar Nuevo Aprendiz
                  </button>
                </div>

                {!isRegistering ? (
                  /* Apprentice Selection / Document Login Form */
                  <form onSubmit={handleAprendizSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                        Seleccionar Aprendiz Matriculado (Acceso Rápido):
                      </label>
                      <select
                        value={selectedApprenticeId}
                        onChange={(e) => {
                          setSelectedApprenticeId(e.target.value);
                          setCustomDocument('');
                          setDocSearchError(null);
                        }}
                        className="w-full text-xs font-medium px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] cursor-pointer"
                      >
                        {apprentices.map((app) => (
                          <option key={app.id} value={app.id}>
                            {app.fullName} ({app.documentType} {app.documentNumber}) · {app.status.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        O ingresar con tu número de documento:
                      </label>
                      <input
                        type="text"
                        placeholder="Ejemplo: 1014289345"
                        value={customDocument}
                        onChange={(e) => {
                          setCustomDocument(e.target.value);
                          setDocSearchError(null);
                        }}
                        className="w-full text-xs px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                      {docSearchError && (
                        <div className="mt-2 p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-[11px] text-rose-700 dark:text-rose-300">
                          <p className="flex items-center gap-1 font-semibold">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {docSearchError}
                          </p>
                          <button
                            type="button"
                            onClick={() => {
                              setIsRegistering(true);
                              setRegDocNumber(customDocument);
                            }}
                            className="mt-1 text-[#39A900] dark:text-[#42c500] font-bold underline cursor-pointer"
                          >
                            ¿Deseas registrar este documento ahora? Haz clic aquí →
                          </button>
                        </div>
                      )}
                    </div>

                    {selectedApprentice && !customDocument && (
                      <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">
                            {selectedApprentice.fullName}
                          </span>
                          <span className="text-[10px] font-mono px-2 py-0.5 bg-white dark:bg-slate-800 rounded text-emerald-800 dark:text-emerald-300 font-bold">
                            {selectedApprentice.progressPercentage}% Progreso
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                          {selectedApprentice.email} · Ficha {selectedApprentice.fichaId.replace('f-', '')}
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#39A900] hover:bg-[#329400] text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
                    >
                      <span>Ingresar como Aprendiz</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  /* Self-Registration Form */
                  <form onSubmit={handleRegisterSubmit} className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Tipo Doc *
                        </label>
                        <select
                          value={regDocType}
                          onChange={(e) => setRegDocType(e.target.value as any)}
                          className="w-full text-xs px-2 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        >
                          <option value="CC">CC</option>
                          <option value="TI">TI</option>
                          <option value="CE">CE</option>
                          <option value="PEP">PEP</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Número Documento *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 1025894102"
                          value={regDocNumber}
                          onChange={(e) => setRegDocNumber(e.target.value)}
                          className="w-full text-xs px-2.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Nombres y Apellidos Completos *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Laura Sofía Martínez Pérez"
                        value={regFullName}
                        onChange={(e) => setRegFullName(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Correo Electrónico *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="usuario@soy.sena.edu.co"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          className="w-full text-xs px-2.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                          Teléfono de Contacto
                        </label>
                        <input
                          type="tel"
                          placeholder="310 123 4567"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          className="w-full text-xs px-2.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Ficha de Caracterización *
                      </label>
                      <select
                        value={regFichaId}
                        onChange={(e) => setRegFichaId(e.target.value)}
                        className="w-full text-xs px-2.5 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white cursor-pointer"
                      >
                        {fichas.map((f) => (
                          <option key={f.id} value={f.id}>
                            Ficha {f.code} - {f.programName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {regError && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {regError}
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#39A900] hover:bg-[#329400] text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                      >
                        <span>Registrar y Guardar en Google Sheets</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Acceso directo a Módulos 1-5, Himno y Símbolos</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Evaluación de conocimientos y certificación inmediata</span>
                </p>
              </div>
            </div>

            {/* CARD 2: INGRESO INSTRUCTOR */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-300 dark:border-slate-700 p-6 sm:p-8 flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/40 dark:bg-slate-800/40 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white">
                    <UserCheck className="w-7 h-7 text-[#39A900]" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    Rol Instructor / Gestor
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Portal del Instructor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                  Supervisa la cohorte de aprendices, revisa el diagnóstico de apropiación por capítulos del reglamento, descarga actas oficiales en CSV y gestiona la evaluación.
                </p>

                {/* Instructor Login Form */}
                <form onSubmit={handleInstructorSubmit} className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Identificación / ID Institucional:
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ingresa tu ID de instructor..."
                        value={instructorId}
                        onChange={(e) => {
                          setInstructorId(e.target.value);
                          setInstructorError(null);
                        }}
                        className="w-full text-xs font-mono font-bold px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                      />
                    </div>
                    <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold block mt-1">
                      ✓ ID autorizado para demostración: <strong>35419193</strong>
                    </span>
                    {instructorError && (
                      <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {instructorError}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Ficha de Caracterización a Administrar:
                    </label>
                    <select
                      value={selectedFichaId}
                      onChange={(e) => setSelectedFichaId(e.target.value)}
                      className="w-full text-xs font-medium px-3 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900] cursor-pointer"
                    >
                      {fichas.map((f) => (
                        <option key={f.id} value={f.id}>
                          Ficha {f.code} - {f.programName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedFicha && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          Líder: {selectedFicha.instructorLeader}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-[#39A900]">
                          Ficha {selectedFicha.code}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block mt-0.5">
                        {selectedFicha.centerName} · {selectedFicha.regional}
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg border border-transparent dark:border-slate-700 cursor-pointer"
                  >
                    <span>Ingresar como Instructor (ID: {instructorId || '35419193'})</span>
                    <ArrowRight className="w-4 h-4 text-[#39A900]" />
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                <p className="flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Métricas de aprobación, actas en CSV y gestión de cohorte</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" />
                  <span>Diagnóstico pedagógico institucional por temas débiles</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Institutional Pillars / Regulation Section */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-xs transition-colors duration-300">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
              Marco Normativo e Identidad
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Estructura Integral del Proceso de Inducción
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Conoce los ejes temáticos contenidos en la formación y el reglamento vigente que ampara tu aprendizaje.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <button
                onClick={() => setShowSymbolsModal(true)}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 w-full text-left transition-all hover:ring-2 hover:ring-[#39A900] hover:shadow-md cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-slate-200 shadow-sm flex-shrink-0">
                    <img src={senaFlag} alt="SENA Flag" className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    1. Identidad y Símbolos
                  </h4>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Historia de Rodolfo Martínez Tono (1957), misión tripartita, escudo (los tres sectores económicos), bandera blanca, logosímbolo e himno.
                </p>
              </button>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                2. Derechos y Deberes
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Capítulos II y III del Acuerdo 009 de 2024: Art. 5 (derechos), Art. 6 (reconocimientos), Art. 7 (representación), Art. 8 (deberes) y Art. 9 (prohibiciones).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                3. Debido Proceso (2026)
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Capítulo V y reforma al Artículo 48 mediante Acuerdo 002 de 2026. Comité de Evaluación, traslado de pruebas, 5 días de descargos y reposición.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                4. Etapas y Bienestar
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Etapa lectiva y productiva bajo la Circular 45 de 2026, apoyos socioeconómicos (Circular 141 de 2026), plataformas Zajuna / Betowa y CampeSENA.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-5 h-5 text-[#39A900]" />
            <span>Servicio Nacional de Aprendizaje — SENA · Formación Profesional Integral Gratuita</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Acuerdo 009 de 2024</span>
            <span aria-hidden="true">·</span>
            <span>Reforma Acuerdo 002 de 2026</span>
            <span aria-hidden="true">·</span>
            <span>Colombia</span>
          </div>
        </div>
      </footer>

        {/* Video Tutorial Modal */}
        {showVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl w-full max-w-4xl relative">
              <button
                onClick={() => setShowVideoModal(false)}
                className="absolute -top-3 -right-3 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full rounded-xl"
                  src="https://drive.google.com/file/d/1jr2YrbGC1Bsz2cz38lVENlV4sSa29eGC4WPHUgj2910/preview"
                  title="Video Tutorial"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Symbols Modal */}
        {showSymbolsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-2 shadow-2xl w-full max-w-4xl relative">
              <button
                onClick={() => setShowSymbolsModal(false)}
                className="absolute -top-3 -right-3 p-1.5 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-lg z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[85vh] overflow-y-auto">
                 <SymbolsExplorer />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
