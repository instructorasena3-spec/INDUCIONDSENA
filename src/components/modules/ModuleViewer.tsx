import React, { useState } from 'react';
import { InductionModule, ModuleSection } from '../../types/induction';
import { HymnPlayer } from '../audio/HymnPlayer';
import { SymbolsExplorer } from './SymbolsExplorer';
import { RightsDutiesClassifier } from './RightsDutiesClassifier';
import {
  Building2,
  Scale,
  AlertTriangle,
  Briefcase,
  CheckCircle,
  Clock,
  ArrowRight,
  BookOpen,
  ChevronRight,
  Award
} from 'lucide-react';

interface Props {
  modules: InductionModule[];
  completedModuleIds: string[];
  onToggleModuleCompletion: (moduleId: string) => void;
  onGoToEvaluation: () => void;
}

export const ModuleViewer: React.FC<Props> = ({
  modules,
  completedModuleIds,
  onToggleModuleCompletion,
  onGoToEvaluation
}) => {
  const [activeModuleId, setActiveModuleId] = useState<string>(modules[0].id);
  const [activeSectionId, setActiveSectionId] = useState<string>(modules[0].sections[0].id);

  const activeModule = modules.find((m) => m.id === activeModuleId) || modules[0];
  const activeSection =
    activeModule.sections.find((s) => s.id === activeSectionId) || activeModule.sections[0];

  const isModuleCompleted = completedModuleIds.includes(activeModule.id);
  const allModulesCompleted = modules.every((m) => completedModuleIds.includes(m.id));

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-4 h-4" />;
      case 'Scale':
        return <Scale className="w-4 h-4" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Briefcase':
        return <Briefcase className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Module Navigation Tabs adhering to frontend guidelines */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {modules.map((module, idx) => {
          const isSelected = module.id === activeModule.id;
          const isDone = completedModuleIds.includes(module.id);
          return (
            <button
              key={module.id}
              onClick={() => {
                setActiveModuleId(module.id);
                setActiveSectionId(module.sections[0].id);
              }}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-white dark:bg-slate-900 border-[#39A900] shadow-xs ring-1 ring-[#39A900]'
                  : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                    isSelected
                      ? 'bg-[#39A900] text-white'
                      : isDone
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {idx + 1}
                </span>

                {isDone ? (
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-[#39A900]" /> Visto
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                    {module.durationMinutes}m
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{module.shortTitle}</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{module.sections.length} lecciones</p>
            </button>
          );
        })}
      </div>

      {/* Main Study Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Subnav: Sections in current module */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100 dark:border-slate-800">
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900]">
                {getModuleIcon(activeModule.icon)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">{activeModule.title}</h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Temario del Módulo</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">{activeModule.description}</p>

            <div className="space-y-1.5">
              {activeModule.sections.map((sec, i) => {
                const isCurrentSec = sec.id === activeSection.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                      isCurrentSec
                        ? 'bg-[#39A900]/10 dark:bg-[#39A900]/20 text-[#2c8300] dark:text-[#4bd10a] font-bold border border-[#39A900]/30'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {i + 1}. {sec.title}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-70" />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onToggleModuleCompletion(activeModule.id)}
                className={`w-full py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isModuleCompleted
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900'
                    : 'bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700'
                }`}
              >
                <CheckCircle className="w-4 h-4 text-[#39A900]" />
                {isModuleCompleted ? 'Módulo Completado (Haz clic para desmarcar)' : 'Marcar Módulo como Completado'}
              </button>
            </div>
          </div>

          {/* Quick CTA to evaluation if ready */}
          <div className="bg-linear-to-br from-emerald-50 to-slate-50 dark:from-slate-900 dark:to-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-900/50 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-4 h-4 text-[#39A900]" />
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">Evaluación de Apropiación</h4>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              {allModulesCompleted
                ? '¡Has completado todos los temas! Estás listo para certificar tu inducción.'
                : 'Puedes presentar la prueba interactiva cuando desees para medir tus conocimientos.'}
            </p>
            <button
              onClick={onGoToEvaluation}
              className="w-full py-2 px-3 bg-[#39A900] hover:bg-[#329400] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Ir a la Evaluación Interactiva <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Content Area: Detailed lesson content & Interactive elements */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs">
            <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-semibold text-[#39A900] tracking-wide uppercase">
                {activeModule.shortTitle}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                {activeSection.title}
              </h2>
            </div>

            {/* Prose Content */}
            <div className="prose prose-slate dark:prose-invert max-w-none pt-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line space-y-3">
              {activeSection.content}
            </div>

            {/* Key takeaways box */}
            {activeSection.keyPoints && activeSection.keyPoints.length > 0 && (
              <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-2">
                  Puntos Clave para Recordar:
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {activeSection.keyPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#39A900] font-bold">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Embedded Interactive Components when required */}
          {activeSection.interactiveType === 'symbols' && (
            <SymbolsExplorer />
          )}

          {activeSection.interactiveType === 'hymn' && (
            <HymnPlayer />
          )}

          {activeSection.interactiveType === 'classifier' && activeSection.interactiveData && (
            <RightsDutiesClassifier scenarios={activeSection.interactiveData} />
          )}

          {activeSection.interactiveType === 'timeline' && activeSection.interactiveData && (
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs transition-colors duration-300">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-4">
                Hitos Históricos de la Creación y Evolución del SENA
              </h4>
              <div className="relative border-l-2 border-emerald-500 ml-3 space-y-6 pl-5">
                {activeSection.interactiveData.map((item: any, i: number) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full bg-[#39A900] ring-4 ring-emerald-50 dark:ring-emerald-950" />
                    <span className="text-xs font-extrabold text-[#39A900] font-mono block">
                      {item.year}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
