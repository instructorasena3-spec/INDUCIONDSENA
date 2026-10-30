import React, { useState } from 'react';
import { Scale, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

interface ScenarioItem {
  text: string;
  type: 'derecho' | 'deber';
  explanation: string;
}

interface Props {
  scenarios: ScenarioItem[];
}

export const RightsDutiesClassifier: React.FC<Props> = ({ scenarios }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSelection, setUserSelection] = useState<'derecho' | 'deber' | null>(null);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentScenario = scenarios[currentIndex];

  const handleSelect = (choice: 'derecho' | 'deber') => {
    if (userSelection !== null) return; // Prevent double click
    setUserSelection(choice);
    const isCorrect = choice === currentScenario.type;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    setAnsweredCount((prev) => prev + 1);
  };

  const handleNext = () => {
    setUserSelection(null);
    if (currentIndex + 1 < scenarios.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserSelection(null);
    setScore(0);
    setAnsweredCount(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const perfectScore = score === scenarios.length;
    return (
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 text-center shadow-xs transition-colors duration-300">
        <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-[#39A900] flex items-center justify-center mx-auto mb-3">
          <Award className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900 dark:text-white">
          {perfectScore ? '¡Excelente Apropiación del Reglamento!' : '¡Práctica Completada!'}
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Identificaste correctamente <span className="font-bold text-slate-900 dark:text-white">{score}</span> de{' '}
          <span className="font-bold text-slate-900 dark:text-white">{scenarios.length}</span> situaciones del Reglamento del Aprendiz (Acuerdo 009 de 2024 - vigente).
        </p>

        <div className="mt-4 flex justify-center">
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer border border-transparent dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Repetir Dinámica
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-[#39A900]" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            Reto Interactivo: Clasifica la Situación ({currentIndex + 1} de {scenarios.length})
          </span>
        </div>
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Aciertos: <span className="font-mono text-slate-800 dark:text-white font-semibold">{score}</span>
        </div>
      </div>

      <div className="p-6">
        <p className="text-sm md:text-base font-semibold text-slate-900 dark:text-white text-center mb-6 max-w-xl mx-auto leading-relaxed">
          "{currentScenario.text}"
        </p>

        {/* Choice buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto">
          <button
            onClick={() => handleSelect('derecho')}
            disabled={userSelection !== null}
            className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              userSelection === null
                ? 'border-blue-200 dark:border-blue-800/60 bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-100/70 dark:hover:bg-blue-950/50 text-blue-800 dark:text-blue-300 hover:border-blue-400'
                : userSelection === 'derecho'
                ? currentScenario.type === 'derecho'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-400'
                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 ring-2 ring-rose-400'
                : currentScenario.type === 'derecho'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60'
            }`}
          >
            <span>⚖️ Es un DERECHO</span>
          </button>

          <button
            onClick={() => handleSelect('deber')}
            disabled={userSelection !== null}
            className={`p-3 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
              userSelection === null
                ? 'border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/30 hover:bg-amber-100/70 dark:hover:bg-amber-950/50 text-amber-800 dark:text-amber-300 hover:border-amber-400'
                : userSelection === 'deber'
                ? currentScenario.type === 'deber'
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-400'
                  : 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 ring-2 ring-rose-400'
                : currentScenario.type === 'deber'
                ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60'
            }`}
          >
            <span>📜 Es un DEBER</span>
          </button>
        </div>

        {/* Feedback after choice */}
        {userSelection !== null && (
          <div
            className={`mt-5 p-4 rounded-lg border text-xs leading-relaxed max-w-lg mx-auto ${
              userSelection === currentScenario.type
                ? 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold mb-1">
              {userSelection === currentScenario.type ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>¡Correcto! Es un {currentScenario.type.toUpperCase()}</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>¡Atención! En realidad es un {currentScenario.type.toUpperCase()}</span>
                </>
              )}
            </div>
            <p className="text-slate-700 dark:text-slate-300">{currentScenario.explanation}</p>

            <div className="mt-3 flex justify-end">
              <button
                onClick={handleNext}
                className="px-4 py-1.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-semibold rounded text-xs transition-colors cursor-pointer border border-transparent dark:border-slate-700"
              >
                {currentIndex + 1 < scenarios.length ? 'Siguiente Situación →' : 'Ver Resultado Final'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
