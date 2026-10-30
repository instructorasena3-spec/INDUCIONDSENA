import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Music, CheckCircle } from 'lucide-react';

export const HymnPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [audioSupported, setAudioSupported] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const lyrics = [
    { text: 'Estudiantes del SENA, ¡adelante!', section: 'CORO' },
    { text: 'Por Colombia luchad con amor,', section: 'CORO' },
    { text: 'Con el ánimo noble y radiante,', section: 'CORO' },
    { text: 'Transformemos el mundo en mejor.', section: 'CORO' },
    { text: 'De la patria el futuro destino,', section: 'ESTROFA I' },
    { text: 'En las manos del joven está,', section: 'ESTROFA I' },
    { text: 'El trabajo es seguro camino,', section: 'ESTROFA I' },
    { text: 'Que la paz y el progreso nos da.', section: 'ESTROFA I' },
    { text: 'En la forja del SENA se forman,', section: 'ESTROFA II' },
    { text: 'Hombres libres que saben triunfar,', section: 'ESTROFA II' },
    { text: 'Con la técnica y ciencia transforman,', section: 'ESTROFA II' },
    { text: 'El esfuerzo en fecundo sembrar.', section: 'ESTROFA II' },
  ];

  // Notes frequencies for a solemn march melodic line in C major
  const melodyNotes = [
    261.63, 329.63, 392.0, 523.25, 392.0, 329.63, 261.63, 293.66, 329.63, 392.0, 349.23, 329.63,
  ];

  const playTone = (freq: number, duration: number) => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      setAudioSupported(false);
    }
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      // Play note immediately
      const note = melodyNotes[currentLineIndex % melodyNotes.length];
      playTone(note, 2.2);

      intervalRef.current = window.setInterval(() => {
        setCurrentLineIndex((prev) => {
          const next = prev + 1;
          if (next >= lyrics.length) {
            setIsPlaying(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 0;
          }
          const nextNote = melodyNotes[next % melodyNotes.length];
          playTone(nextNote, 2.2);
          return next;
        });
      }, 3000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, currentLineIndex]);

  const handleReset = () => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentLineIndex(0);
  };

  return (
    <div className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-xl p-5 text-white border border-emerald-700/40 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#39A900] flex items-center justify-center text-white shadow-inner">
            <Music className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-base text-white">Himno Oficial del SENA</h4>
            <p className="text-xs text-emerald-200/80">Letra: Luis Alfredo Sánchez · Música: Norberto Gómez</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-2 px-4 py-2 bg-[#39A900] hover:bg-[#329400] text-white rounded-lg text-xs font-semibold tracking-wide transition-colors shadow-sm cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" /> Pausar Entonación
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" /> Entonar Himno
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            title="Reiniciar Himno"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Synchronized Teleprompter Lyric Display */}
      <div className="py-4 px-3 bg-black/30 rounded-lg border border-white/5 text-center min-h-[90px] flex flex-col items-center justify-center">
        <span className="text-[11px] font-semibold text-[#39A900] tracking-wider uppercase mb-1">
          {lyrics[currentLineIndex].section}
        </span>
        <p className="text-lg md:text-xl font-bold tracking-tight text-white transition-all duration-300">
          "{lyrics[currentLineIndex].text}"
        </p>
        <div className="flex items-center gap-1.5 mt-3">
          {lyrics.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentLineIndex
                  ? 'w-6 bg-[#39A900]'
                  : i < currentLineIndex
                  ? 'w-2 bg-emerald-500/60'
                  : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/80">
        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
          <span className="font-semibold text-emerald-400 block mb-1">Coro Patriótico</span>
          <p className="text-white/70 italic leading-relaxed">
            "Estudiantes del SENA, ¡adelante! Por Colombia luchad con amor..."
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
          <span className="font-semibold text-emerald-400 block mb-1">Estrofa I - Esperanza</span>
          <p className="text-white/70 italic leading-relaxed">
            "De la patria el futuro destino, en las manos del joven está..."
          </p>
        </div>
        <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
          <span className="font-semibold text-emerald-400 block mb-1">Estrofa II - Técnica y Triunfo</span>
          <p className="text-white/70 italic leading-relaxed">
            "En la forja del SENA se forman, hombres libres que saben triunfar..."
          </p>
        </div>
      </div>
    </div>
  );
};
