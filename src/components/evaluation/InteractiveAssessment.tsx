import React, { useState, useEffect } from 'react';
import { Question, AssessmentResult, EvaluationConfig } from '../../types/induction';
import { QUESTION_BANK } from '../../data/questionBank';
import {
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Award,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  FileText,
  Cloud
} from 'lucide-react';

interface Props {
  config: EvaluationConfig;
  onFinishAssessment: (result: AssessmentResult) => void;
  onSelectAnswer?: (question: Question, optionIndex: number, isCorrect: boolean) => void;
  onOpenCertificate?: () => void;
  hasPassedBefore?: boolean;
}

export const InteractiveAssessment: React.FC<Props> = ({
  config,
  onFinishAssessment,
  onSelectAnswer,
  onOpenCertificate,
  hasPassedBefore = false
}) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: string]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(config.timeLimitMinutes * 60);
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [showReview, setShowReview] = useState(false);

  // Initialize or shuffle questions
  useEffect(() => {
    // Select up to questionsPerAttempt
    const pool = [...QUESTION_BANK].slice(0, config.questionsPerAttempt);
    setQuestions(pool);
    setSecondsRemaining(config.timeLimitMinutes * 60);
    setIsSubmitted(false);
    setSelectedAnswers({});
    setResult(null);
    setCurrentIndex(0);
    setShowReview(false);
  }, [config.questionsPerAttempt, config.timeLimitMinutes]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || questions.length === 0) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSubmitted, questions, selectedAnswers]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    const q = questions.find((item) => item.id === questionId);
    const isCorrect = q ? optionIndex === q.correctIndex : false;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));

    if (q && onSelectAnswer) {
      onSelectAnswer(q, optionIndex, isCorrect);
    }
  };

  const handleSubmit = () => {
    if (isSubmitted) return;

    let correctCount = 0;
    const categoryStats: { [key: string]: { correct: number; total: number; percentage: number } } = {};

    const answersList = questions.map((q) => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctIndex;
      if (isCorrect) correctCount++;

      if (!categoryStats[q.category]) {
        categoryStats[q.category] = { correct: 0, total: 0, percentage: 0 };
      }
      categoryStats[q.category].total++;
      if (isCorrect) categoryStats[q.category].correct++;

      return {
        questionId: q.id,
        selectedIndex: selected !== undefined ? selected : -1,
        isCorrect
      };
    });

    Object.keys(categoryStats).forEach((cat) => {
      const stat = categoryStats[cat];
      stat.percentage = Math.round((stat.correct / stat.total) * 100);
    });

    const percentage = Math.round((correctCount / questions.length) * 100);
    const passed = percentage >= config.passingPercentage;

    const assessmentResult: AssessmentResult = {
      score: percentage,
      totalQuestions: questions.length,
      passed,
      percentage,
      date: new Date().toISOString(),
      categoryScores: categoryStats,
      answers: answersList
    };

    setResult(assessmentResult);
    setIsSubmitted(true);
    onFinishAssessment(assessmentResult);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQuestion = questions[currentIndex];

  if (questions.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 text-sm">
        Cargando banco de preguntas para la evaluación...
      </div>
    );
  }

  // RESULT SCREEN
  if (isSubmitted && result) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
        {/* Header Banner */}
        <div
          className={`p-6 sm:p-8 text-white text-center ${
            result.passed
              ? 'bg-linear-to-r from-emerald-700 via-[#39A900] to-emerald-800'
              : 'bg-linear-to-r from-slate-800 to-amber-900'
          }`}
        >
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xs flex items-center justify-center mx-auto mb-3">
            {result.passed ? (
              <Award className="w-9 h-9 text-white" />
            ) : (
              <HelpCircle className="w-9 h-9 text-amber-200" />
            )}
          </div>

          <span className="text-xs font-semibold tracking-wider uppercase opacity-90">
            {result.passed ? 'Apropiación Institucional Verificada' : 'Requiere Refuerzo de Inducción'}
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            {result.passed ? '¡Felicitaciones! Has Aprobado la Inducción' : 'No alcanzaste el puntaje mínimo'}
          </h3>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto mt-2">
            {result.passed
              ? 'Has demostrado dominio completo de los deberes, derechos, valores e identidad que rigen a la comunidad SENA.'
              : `Obtuviste ${result.percentage}%. El umbral mínimo requerido para certificar la inducción es de ${config.passingPercentage}%. Puedes repasar y volver a intentarlo.`}
          </p>

          <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-white/20">
            <div className="text-center">
              <span className="text-xs text-white/70 block">Calificación</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono">{result.percentage}%</span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <span className="text-xs text-white/70 block">Respuestas Correctas</span>
              <span className="text-2xl sm:text-3xl font-extrabold font-mono">
                {result.answers.filter((a) => a.isCorrect).length}/{result.totalQuestions}
              </span>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="text-center">
              <span className="text-xs text-white/70 block">Estado Oficial</span>
              <span
                className={`text-sm font-bold mt-1 inline-block px-2.5 py-0.5 rounded ${
                  result.passed ? 'bg-white text-emerald-800' : 'bg-amber-400 text-slate-900'
                }`}
              >
                {result.passed ? 'APROBADO' : 'PENDIENTE'}
              </span>
            </div>
          </div>
        </div>

        {/* Content & Action Buttons */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              {result.passed && onOpenCertificate && (
                <button
                  onClick={onOpenCertificate}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#39A900] hover:bg-[#329400] text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" /> Ver y Descargar Certificado
                </button>
              )}
              <button
                onClick={() => setShowReview(!showReview)}
                className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                {showReview ? 'Ocultar Retroalimentación' : 'Revisar Preguntas y Respuestas'}
              </button>
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setSelectedAnswers({});
                setResult(null);
                setCurrentIndex(0);
                setShowReview(false);
                setSecondsRemaining(config.timeLimitMinutes * 60);
              }}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-medium transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Presentar Nuevo Intento
            </button>
          </div>

          {/* Breakdown by competence */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide mb-3">
              Desglose de Conocimiento por Competencia
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(result.categoryScores).map(([category, stats]) => {
                const labels: Record<string, string> = {
                  identidad: 'Identidad SENA',
                  derechos_deberes: 'Derechos y Deberes',
                  reglamento: 'Reglamento y Faltas',
                  etapas_bienestar: 'Etapas y Bienestar'
                };
                return (
                  <div key={category} className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block truncate">
                      {labels[category] || category}
                    </span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-xl font-bold font-mono text-slate-900 dark:text-white">{stats.percentage}%</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {stats.correct}/{stats.total} correctas
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          stats.percentage >= 70 ? 'bg-[#39A900]' : 'bg-amber-500'
                        }`}
                        style={{ width: `${stats.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review */}
          {showReview && (
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wide">
                Retroalimentación Pregunta a Pregunta
              </h4>
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const userAnswer = selectedAnswers[q.id];
                  const isCorrect = userAnswer === q.correctIndex;
                  return (
                    <div
                      key={q.id}
                      className={`p-4 rounded-xl border ${
                        isCorrect
                          ? 'border-emerald-200 dark:border-emerald-800/70 bg-emerald-50/30 dark:bg-emerald-950/20'
                          : 'border-rose-200 dark:border-rose-800/70 bg-rose-50/30 dark:bg-rose-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                          Pregunta {idx + 1} · {q.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Correcta
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-xs font-semibold text-rose-700 dark:text-rose-400">
                              <XCircle className="w-3.5 h-3.5" /> Incorrecta
                            </span>
                          )}
                        </div>
                      </div>

                      {q.scenario && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-1.5">"{q.scenario}"</p>
                      )}
                      <p className="text-xs font-medium text-slate-900 dark:text-white mb-3">{q.question}</p>

                      <div className="space-y-1.5">
                        {q.options.map((opt, optIdx) => {
                          const isOptionCorrect = optIdx === q.correctIndex;
                          const wasSelected = optIdx === userAnswer;
                          return (
                            <div
                              key={optIdx}
                              className={`p-2 rounded text-xs flex items-center justify-between ${
                                isOptionCorrect
                                  ? 'bg-emerald-100/70 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-medium'
                                  : wasSelected
                                  ? 'bg-rose-100/70 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-700 text-rose-950 dark:text-rose-200 font-medium'
                                  : 'text-slate-600 dark:text-slate-300'
                              }`}
                            >
                              <span>{opt}</span>
                              {isOptionCorrect && (
                                <span className="text-[10px] text-emerald-800 dark:text-emerald-300 font-bold ml-2 shrink-0">
                                  Respuesta Correcta
                                </span>
                              )}
                              {wasSelected && !isOptionCorrect && (
                                <span className="text-[10px] text-rose-800 dark:text-rose-300 font-bold ml-2 shrink-0">
                                  Tu Respuesta
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="mt-3 p-2.5 rounded bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
                        <p>
                          <strong className="text-slate-900 dark:text-white">Justificación Formativa:</strong> {q.explanation}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          <strong>Soporte Jurídico:</strong> {q.normativeReference}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ACTIVE TEST QUESTION INTERFACE
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
      {/* Top Bar for Quiz */}
      <div className="p-4 bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#39A900] flex items-center justify-center text-white font-bold text-xs">
            {currentIndex + 1}
          </div>
          <div>
            <span className="text-[11px] text-emerald-400 font-semibold block uppercase">
              Evaluación de Apropiación SENA
            </span>
            <span className="text-xs text-slate-300">
              Pregunta {currentIndex + 1} de {questions.length} · {currentQuestion.categoryLabel}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          {/* Live Sync to Google Sheets Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] font-semibold">
            <Cloud className="w-3.5 h-3.5 text-[#39A900] animate-pulse" />
            <span>Sincronización en vivo con Google Sheets</span>
          </div>

          {/* Answered Counter */}
          <div className="text-xs text-slate-300">
            Respondidas: <strong className="text-white font-mono">{answeredCount}</strong>/{questions.length}
          </div>

          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
              secondsRemaining < 120
                ? 'bg-rose-900/80 text-rose-200 animate-pulse'
                : 'bg-white/10 text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(secondsRemaining)}</span>
          </div>
        </div>
      </div>

      {/* Question Selector Strip */}
      <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto">
        {questions.map((q, idx) => {
          const isAnswered = selectedAnswers[q.id] !== undefined;
          const isCurrent = idx === currentIndex;
          return (
            <button
              key={q.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-7 h-7 rounded text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                isCurrent
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white ring-2 ring-slate-400 dark:ring-emerald-400'
                  : isAnswered
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Main Question Body */}
      <div className="p-6 sm:p-8">
        {currentQuestion.scenario && (
          <div className="mb-4 p-3 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/50 rounded-lg text-xs text-amber-900 dark:text-amber-200">
            <span className="font-bold text-amber-950 dark:text-amber-100 block mb-0.5">Situación Caso Real:</span>
            "{currentQuestion.scenario}"
          </div>
        )}

        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-6 leading-snug">
          {currentQuestion.question}
        </h3>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((optionText, optIndex) => {
            const isSelected = selectedAnswers[currentQuestion.id] === optIndex;
            return (
              <button
                key={optIndex}
                onClick={() => handleSelectOption(currentQuestion.id, optIndex)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                  isSelected
                    ? 'border-[#39A900] bg-emerald-50/80 dark:bg-emerald-950/40 ring-2 ring-[#39A900]/30 shadow-xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/70 dark:hover:bg-slate-800/60'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold ${
                    isSelected
                      ? 'border-[#39A900] bg-[#39A900] text-white'
                      : 'border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {String.fromCharCode(65 + optIndex)}
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                    {optionText}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Navigation & Submit Bar */}
        <div className="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
              currentIndex === 0
                ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Anterior
          </button>

          <div className="flex items-center gap-2">
            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                Siguiente <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={answeredCount === 0}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#39A900] hover:bg-[#329400] text-white rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" /> Finalizar y Calificar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
