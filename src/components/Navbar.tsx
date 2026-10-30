import React from 'react';
import { SenaLogo } from './SenaLogo';
import { UserRole } from '../types/induction';
import { ShieldCheck, UserCheck, Sun, Moon, LogOut, BookOpen, Award, FileSpreadsheet } from 'lucide-react';

interface Props {
  currentTab: 'modulos' | 'reglamento' | 'evaluacion' | 'instructor';
  onSelectTab: (tab: 'modulos' | 'reglamento' | 'evaluacion' | 'instructor') => void;
  role: UserRole;
  onLogout: () => void;
  activeApprenticeName: string;
  instructorId?: string;
  activeFichaCode?: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<Props> = ({
  currentTab,
  onSelectTab,
  role,
  onLogout,
  activeApprenticeName,
  instructorId = '35419193',
  activeFichaCode = '2824901',
  theme,
  onToggleTheme
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
        {/* Zone 1: Institutional Brand with logo */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <SenaLogo className="w-8 h-8 text-[#39A900]" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectTab(role === 'instructor' ? 'instructor' : 'modulos')}
              className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 cursor-pointer text-left flex items-center gap-1.5"
            >
              <span>SENA <span className="text-[#39A900]">{role === 'instructor' ? 'Gestión' : 'Inducción'}</span></span>
            </button>
            <span className="hidden xl:inline-block text-[9px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-700">
              Vigencia 2026
            </span>
          </div>
        </div>

        {/* Zone 2: Role-Specific Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-semibold">
          {role === 'aprendiz' ? (
            <>
              <button
                onClick={() => onSelectTab('modulos')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  currentTab === 'modulos'
                    ? 'text-[#39A900] dark:text-[#42c500] font-bold underline underline-offset-4 decoration-2 decoration-[#39A900]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Módulos de Inducción</span>
              </button>

              <button
                onClick={() => onSelectTab('reglamento')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  currentTab === 'reglamento'
                    ? 'text-[#39A900] dark:text-[#42c500] font-bold underline underline-offset-4 decoration-2 decoration-[#39A900]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Reglamento (Acuerdo 009)</span>
              </button>

              <button
                onClick={() => onSelectTab('evaluacion')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  currentTab === 'evaluacion'
                    ? 'text-[#39A900] dark:text-[#42c500] font-bold underline underline-offset-4 decoration-2 decoration-[#39A900]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#39A900]" />
                <span>Evaluación y Certificado</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onSelectTab('instructor')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  currentTab === 'instructor'
                    ? 'text-[#39A900] dark:text-[#42c500] font-bold underline underline-offset-4 decoration-2 decoration-[#39A900]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Panel de Seguimiento y Fichas</span>
              </button>

              <button
                onClick={() => onSelectTab('reglamento')}
                className={`flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer ${
                  currentTab === 'reglamento'
                    ? 'text-[#39A900] dark:text-[#42c500] font-bold underline underline-offset-4 decoration-2 decoration-[#39A900]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Auditoría de Normatividad</span>
              </button>
            </>
          )}
        </nav>

        {/* Zone 3: Active User Identification, Theme Toggle & Logout */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Active Profile Info */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs border border-slate-200 dark:border-slate-700">
            {role === 'aprendiz' ? (
              <>
                <div className="w-2 h-2 rounded-full bg-[#39A900]" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">Aprendiz:</span>
                <span className="font-bold text-slate-900 dark:text-white truncate max-w-[130px]">
                  {activeApprenticeName}
                </span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">Instructor ID:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {instructorId}
                </span>
                <span className="text-slate-400">·</span>
                <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                  Ficha {activeFichaCode}
                </span>
              </>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200 dark:border-slate-700 text-xs font-medium"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline text-slate-300 font-semibold">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span className="hidden sm:inline text-slate-600 font-semibold">Oscuro</span>
              </>
            )}
          </button>

          {/* Exit / Logout to Landing Page Portal */}
          <button
            onClick={onLogout}
            title="Cerrar sesión y volver al Portal de Ingreso"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/60 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Salir al Portal</span>
          </button>
        </div>
      </div>
    </header>
  );
};
