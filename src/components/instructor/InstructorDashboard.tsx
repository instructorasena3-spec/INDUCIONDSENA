import React, { useState } from 'react';
import { Apprentice, Ficha, EvaluationConfig } from '../../types/induction';
import { AddApprenticeModal } from './AddApprenticeModal';
import { SenaLogo } from '../SenaLogo';
import { User } from 'firebase/auth';
import { getSpreadsheetUrl } from '../../services/googleSheetsService';
import {
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  Search,
  Sliders,
  ShieldCheck,
  UserCheck,
  Award,
  ChevronDown,
  Printer,
  ExternalLink,
  RefreshCw,
  Cloud,
  Check
} from 'lucide-react';

interface Props {
  fichas: Ficha[];
  activeFichaId: string;
  onSelectFicha: (fichaId: string) => void;
  apprentices: Apprentice[];
  onAddApprentice: (apprentice: Apprentice) => void;
  onViewCertificate: (apprentice: Apprentice) => void;
  onSimulateApprentice: (apprentice: Apprentice) => void;
  evaluationConfig: EvaluationConfig;
  onUpdateEvaluationConfig: (config: EvaluationConfig) => void;
  instructorId?: string;
  googleUser: User | null;
  googleAccessToken: string | null;
  onGoogleSignIn: () => Promise<void>;
  onGoogleSignOut: () => Promise<void>;
  activeSpreadsheetId?: string | null;
  onSyncAllToGoogleSheets: () => Promise<void>;
  isSyncingSheets?: boolean;
  lastSyncTime?: string | null;
  lastSyncMessage?: string | null;
}

export const InstructorDashboard: React.FC<Props> = ({
  fichas,
  activeFichaId,
  onSelectFicha,
  apprentices,
  onAddApprentice,
  onViewCertificate,
  onSimulateApprentice,
  evaluationConfig,
  onUpdateEvaluationConfig,
  instructorId = '35419193',
  googleUser,
  googleAccessToken,
  onGoogleSignIn,
  onGoogleSignOut,
  activeSpreadsheetId,
  onSyncAllToGoogleSheets,
  isSyncingSheets = false,
  lastSyncTime,
  lastSyncMessage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aprobado' | 'en_progreso' | 'reprobado' | 'sin_iniciar'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginId, setLoginId] = useState('');

  // Active Ficha
  const activeFicha = fichas.find((f) => f.id === activeFichaId) || fichas[0];
  const fichaApprentices = apprentices.filter((a) => a.fichaId === activeFicha.id);

  // Metrics
  const totalCount = fichaApprentices.length;
  const approvedCount = fichaApprentices.filter((a) => a.status === 'aprobado').length;
  const inProgressCount = fichaApprentices.filter((a) => a.status === 'en_progreso').length;
  const failedCount = fichaApprentices.filter((a) => a.status === 'reprobado').length;
  const unstartedCount = fichaApprentices.filter((a) => a.status === 'sin_iniciar').length;

  const approvalRate = totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;
  const scoresWithValues = fichaApprentices.filter((a) => a.assessmentScore !== undefined);
  const averageScore =
    scoresWithValues.length > 0
      ? Math.round(
          scoresWithValues.reduce((acc, curr) => acc + (curr.assessmentScore || 0), 0) /
            scoresWithValues.length
        )
      : 0;

  // Filtered apprentices
  const filteredApprentices = fichaApprentices.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.documentNumber.includes(searchTerm) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Tipo Doc', 'Documento', 'Nombre Completo', 'Correo', 'Telefono', 'Estado', 'Progreso %', 'Puntaje Evaluacion', 'Intentos', 'Folio Certificado'];
    const rows = fichaApprentices.map((a) => [
      a.documentType,
      a.documentNumber,
      `"${a.fullName}"`,
      a.email,
      a.phone,
      a.status.toUpperCase(),
      `${a.progressPercentage}%`,
      a.assessmentScore !== undefined ? `${a.assessmentScore}%` : 'N/A',
      a.assessmentAttempts,
      a.certificateFolio || 'N/A'
    ]);

    const csvContent =
      '\uFEFF' +
      [
        `"ACTA DE INDUCCION SENA - FICHA ${activeFicha.code} - ${activeFicha.programName}"`,
        `"Instructor Líder: ${activeFicha.instructorLeader} | Centro: ${activeFicha.centerName}"`,
        '',
        headers.join(','),
        ...rows.map((r) => r.join(','))
      ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `SENA_Induccion_Ficha_${activeFicha.code}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Cohort Selector Header */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 flex items-center justify-center p-1.5 shadow-xs">
              <SenaLogo className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Ficha de Caracterización</span>
                <span className="text-xs font-bold font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-800 dark:text-slate-200">
                  {activeFicha.code}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                {activeFicha.programName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeFicha.centerName} · {activeFicha.regional} · Líder: {activeFicha.instructorLeader} · <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">ID: {instructorId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Ficha switcher */}
            <select
              value={activeFichaId}
              onChange={(e) => onSelectFicha(e.target.value)}
              className="text-xs font-medium px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-[#39A900] cursor-pointer"
            >
              {fichas.map((f) => (
                <option key={f.id} value={f.id}>
                  Ficha {f.code} - {f.programName.slice(0, 32)}...
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowConfigModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
              title="Configurar Parámetros de la Evaluación"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Configurar Examen
            </button>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg transition-colors cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-[#39A900]" /> Exportar Acta CSV
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              Ingreso
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-[#39A900] hover:bg-[#329400] rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Nuevo Aprendiz
            </button>
          </div>
        </div>
      </div>

      {/* Google Sheets & Drive Real-Time Synchronization Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-white to-slate-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800/80 p-4 sm:p-5 shadow-xs transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center p-2 text-emerald-600 dark:text-emerald-400 shrink-0 shadow-xs">
              <svg className="w-6 h-6" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Sincronización en la Nube con Google Sheets y Google Drive
                </h3>
                {googleUser && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] animate-pulse" />
                    En Vivo Activo
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {googleUser ? (
                  <>
                    Conectado como <strong>{googleUser.email}</strong>. Cada respuesta y avance de módulo se registra en tiempo real en tu hoja de cálculo institucional.
                  </>
                ) : (
                  <>
                    Conecta tu cuenta institucional de Google para crear y sincronizar automáticamente la hoja de cálculo en Drive a medida que los aprendices responden.
                  </>
                )}
              </p>
              {lastSyncMessage && (
                <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
                  <Check className="w-3.5 h-3.5" />
                  <span>{lastSyncMessage}</span>
                  {lastSyncTime && <span className="text-slate-400">({lastSyncTime})</span>}
                </p>
              )}
            </div>
          </div>

          {/* Action buttons for Google Workspace */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {!googleUser ? (
              <button
                onClick={onGoogleSignIn}
                className="flex items-center gap-2 px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-700 rounded-lg text-xs font-bold shadow-xs transition-colors cursor-pointer"
              >
                <Cloud className="w-4 h-4 text-[#4285F4]" />
                <span>Conectar Google Drive</span>
              </button>
            ) : (
              <>
                {activeSpreadsheetId && (
                  <a
                    href={getSpreadsheetUrl(activeSpreadsheetId)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 bg-[#39A900] hover:bg-[#329400] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
                    title="Abrir la hoja de cálculo generada en Google Drive"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Ver Hoja en Drive ↗</span>
                  </a>
                )}

                <button
                  onClick={onSyncAllToGoogleSheets}
                  disabled={isSyncingSheets}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  title="Sincronizar todos los aprendices de la ficha ahora"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 ${isSyncingSheets ? 'animate-spin' : ''}`} />
                  <span>{isSyncingSheets ? 'Sincronizando...' : 'Sincronizar Ficha'}</span>
                </button>

                <button
                  onClick={onGoogleSignOut}
                  className="px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Desconectar cuenta de Google"
                >
                  Desconectar
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>Total Aprendices</span>
            <Users className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
            {totalCount}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">Matriculados en ficha</span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>Inducción Aprobada</span>
            <CheckCircle2 className="w-4 h-4 text-[#39A900]" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-[#39A900] tabular-nums">
            {approvedCount}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {approvalRate}% de apropiación certificada
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>En Proceso / Pendientes</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {inProgressCount + unstartedCount}
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            {failedCount > 0 ? `${failedCount} requieren reintento` : 'En fase lectiva inicial'}
          </span>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs mb-1">
            <span>Promedio General</span>
            <Award className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white tabular-nums">
            {averageScore}%
          </div>
          <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
            Umbral mínimo: {evaluationConfig.passingPercentage}%
          </span>
        </div>
      </div>

      {/* Thematic Appropriation Diagnostic Box */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors duration-300">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
              Diagnóstico de Apropiación por Ejes Temáticos
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Monitoreo pedagógico institucional para identificar temas que requieren refuerzo presencial
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-700 dark:text-slate-200 block">Identidad e Historia SENA</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">92%</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Apropiación Alta</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#39A900] h-full rounded-full" style={{ width: '92%' }} />
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-700 dark:text-slate-200 block">Derechos y Deberes</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">84%</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Apropiación Óptima</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#39A900] h-full rounded-full" style={{ width: '84%' }} />
            </div>
          </div>

          <div className="p-3 bg-amber-50/60 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-800/60">
            <span className="font-semibold text-amber-950 dark:text-amber-200 block">Reglamento y Debido Proceso</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-bold font-mono text-amber-700 dark:text-amber-400">68%</span>
              <span className="text-[10px] text-amber-800 dark:text-amber-300 font-medium">Reforzar Inasistencias</span>
            </div>
            <div className="w-full bg-amber-200 dark:bg-amber-900/40 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-amber-600 dark:bg-amber-500 h-full rounded-full" style={{ width: '68%' }} />
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <span className="font-semibold text-slate-700 dark:text-slate-200 block">Etapas de FPI y Bienestar</span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-lg font-bold font-mono text-emerald-700 dark:text-emerald-400">88%</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">Apropiación Óptima</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 rounded-full mt-1.5 overflow-hidden">
              <div className="bg-[#39A900] h-full rounded-full" style={{ width: '88%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Apprentices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
        {/* Table Filter Bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por nombre, documento o correo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Status filter tabs adhering to anti-pill rules (functional buttons in container) */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg overflow-x-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos ({fichaApprentices.length})
            </button>
            <button
              onClick={() => setStatusFilter('aprobado')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'aprobado'
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Aprobados ({approvedCount})
            </button>
            <button
              onClick={() => setStatusFilter('en_progreso')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'en_progreso'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              En Curso ({inProgressCount})
            </button>
            <button
              onClick={() => setStatusFilter('reprobado')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === 'reprobado'
                  ? 'bg-white dark:bg-slate-700 text-rose-800 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Reprobados ({failedCount})
            </button>
          </div>
        </div>

        {/* The Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Documento</th>
                <th className="py-3 px-4">Progreso Inducción</th>
                <th className="py-3 px-4">Evaluación</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              {filteredApprentices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    No se encontraron aprendices con los filtros seleccionados.
                  </td>
                </tr>
              ) : (
                filteredApprentices.map((app) => {
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{app.fullName}</div>
                        <div className="text-[11px] text-slate-500">{app.email}</div>
                      </td>

                      <td className="py-3 px-4 font-mono">
                        <span className="text-slate-500 text-[10px] mr-1">{app.documentType}</span>
                        {app.documentNumber}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#39A900] h-full rounded-full"
                              style={{ width: `${app.progressPercentage}%` }}
                            />
                          </div>
                          <span className="font-mono text-slate-800 font-medium">
                            {app.progressPercentage}%
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {app.completedModules.length}/4 módulos
                        </span>
                      </td>

                      <td className="py-3 px-4 font-mono">
                        {app.assessmentScore !== undefined ? (
                          <div>
                            <span
                              className={`font-bold ${
                                app.assessmentScore >= evaluationConfig.passingPercentage
                                  ? 'text-emerald-700'
                                  : 'text-rose-700'
                              }`}
                            >
                              {app.assessmentScore}%
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              {app.assessmentAttempts}{' '}
                              {app.assessmentAttempts === 1 ? 'intento' : 'intentos'}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic">Sin presentar</span>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {app.status === 'aprobado' && (
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#39A900]" /> Aprobado
                          </span>
                        )}
                        {app.status === 'en_progreso' && (
                          <span className="text-blue-700 font-semibold flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-blue-500" /> En Progreso
                          </span>
                        )}
                        {app.status === 'reprobado' && (
                          <span className="text-rose-700 font-semibold flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> Reprobado
                          </span>
                        )}
                        {app.status === 'sin_iniciar' && (
                          <span className="text-slate-400 font-medium">Sin iniciar</span>
                        )}
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {app.status === 'aprobado' && (
                            <button
                              onClick={() => onViewCertificate(app)}
                              className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold transition-colors cursor-pointer"
                              title="Ver Certificado de Inducción"
                            >
                              Certificado
                            </button>
                          )}

                          <button
                            onClick={() => onSimulateApprentice(app)}
                            className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded text-[11px] font-medium transition-colors cursor-pointer"
                            title="Ver vista de inducción como este aprendiz"
                          >
                            Simular
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Apprentice Modal */}
      {showAddModal && (
        <AddApprenticeModal
          fichaId={activeFicha.id}
          onAdd={onAddApprentice}
          onClose={() => setShowAddModal(false)}
        />
      )}

      {/* Evaluation Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">Configuración de Evaluación de Inducción</h3>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Porcentaje Mínimo de Aprobación: <strong className="text-[#39A900]">{evaluationConfig.passingPercentage}%</strong>
                </label>
                <input
                  type="range"
                  min="50"
                  max="100"
                  step="5"
                  value={evaluationConfig.passingPercentage}
                  onChange={(e) =>
                    onUpdateEvaluationConfig({
                      ...evaluationConfig,
                      passingPercentage: Number(e.target.value)
                    })
                  }
                  className="w-full accent-[#39A900] cursor-pointer"
                />
                <span className="text-[11px] text-slate-500">
                  Estándar institucional recomendado: 70% u 80%.
                </span>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tiempo Límite por Intento (minutos)
                </label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={evaluationConfig.timeLimitMinutes}
                  onChange={(e) =>
                    onUpdateEvaluationConfig({
                      ...evaluationConfig,
                      timeLimitMinutes: Math.max(5, Number(e.target.value))
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Número de Preguntas del Banco
                </label>
                <select
                  value={evaluationConfig.questionsPerAttempt}
                  onChange={(e) =>
                    onUpdateEvaluationConfig({
                      ...evaluationConfig,
                      questionsPerAttempt: Number(e.target.value)
                    })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 bg-white"
                >
                  <option value={5}>5 Preguntas (Evaluación Exprés)</option>
                  <option value={8}>8 Preguntas (Estándar)</option>
                  <option value={10}>10 Preguntas (Completa con Casos Reales)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold cursor-pointer"
                >
                  Guardar Ajustes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xs w-full shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <h3 className="text-sm font-semibold">Ingreso Administrativo</h3>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Ingrese ID..."
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
              <button
                onClick={() => {
                  if (loginId === '35419193') {
                    alert('Acceso autorizado como Instructor.');
                    setShowLoginModal(false);
                  } else {
                    alert('ID no autorizado.');
                  }
                }}
                className="w-full px-4 py-2 bg-[#39A900] text-white rounded-lg font-bold text-xs cursor-pointer"
              >
                Ingresar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
