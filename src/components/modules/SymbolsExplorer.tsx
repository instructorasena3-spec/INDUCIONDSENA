import React, { useState } from 'react';
import { SenaLogo, SenaEscudo } from '../SenaLogo';
import { Info, Sparkles, Shield, Flag, Compass } from 'lucide-react';
import senaFlag from '../../assets/images/sena_flag_asset_1793134486866.jpg';

export const SymbolsExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'escudo' | 'bandera' | 'logosimbolo'>('escudo');
  const [activeSector, setActiveSector] = useState<'pinon' | 'caduceo' | 'cafe' | null>('pinon');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-colors duration-300">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Explorador Interactivo de Símbolos Institucionales</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">Haz clic en cada símbolo y sus componentes para descubrir su significado</p>
        </div>

        {/* Tab buttons adhering to frontend design guidelines: functional segmented control */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setActiveTab('escudo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'escudo'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Escudo SENA
          </button>
          <button
            onClick={() => setActiveTab('bandera')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'bandera'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Bandera
          </button>
          <button
            onClick={() => setActiveTab('logosimbolo')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === 'logosimbolo'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Logosímbolo
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'escudo' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Visual representation of Escudo */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              {/* Escudo del SENA al 50% */}
              <div className="w-full flex flex-col items-center justify-center mb-3">
                <SenaEscudo
                  className="w-1/2 max-w-[190px] h-auto object-contain mx-auto drop-shadow-sm transition-transform hover:scale-105"
                  alt="Escudo Oficial del SENA"
                />
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-2">
                  Escudo Oficial del SENA
                </span>
              </div>

              {/* Selector de sectores */}
              <div className="w-full space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                {/* Sector Agropecuario */}
                <button
                  onClick={() => setActiveSector('cafe')}
                  className={`w-full p-2 rounded-lg text-left transition-all cursor-pointer ${
                    activeSector === 'cafe'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 ring-2 ring-[#39A900] text-emerald-950 dark:text-emerald-200 font-bold'
                      : 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">☕🌾</span>
                    <div className="text-[11px] leading-tight">
                      Sector Agropecuario
                      <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-normal">Café y Espiga</span>
                    </div>
                  </div>
                </button>

                {/* Sector Industrial */}
                <button
                  onClick={() => setActiveSector('pinon')}
                  className={`w-full p-2 rounded-lg text-left transition-all cursor-pointer ${
                    activeSector === 'pinon'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 ring-2 ring-[#39A900] text-emerald-950 dark:text-emerald-200 font-bold'
                      : 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">⚙️🏗️</span>
                    <div className="text-[11px] leading-tight">
                      Sector Industria y Construcción
                      <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-normal">El Piñón Mecánico</span>
                    </div>
                  </div>
                </button>

                {/* Sector Comercio y Servicios */}
                <button
                  onClick={() => setActiveSector('caduceo')}
                  className={`w-full p-2 rounded-lg text-left transition-all cursor-pointer ${
                    activeSector === 'caduceo'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 ring-2 ring-[#39A900] text-emerald-950 dark:text-emerald-200 font-bold'
                      : 'hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">⚕️💼</span>
                    <div className="text-[11px] leading-tight">
                      Sector Comercio y Servicios
                      <span className="block text-[9px] text-slate-500 dark:text-slate-400 font-normal">El Caduceo</span>
                    </div>
                  </div>
                </button>
              </div>

              <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center">
                Haz clic en los sectores para ver su significado
              </span>
            </div>

            {/* Explanatory side */}
            <div className="md:col-span-7 space-y-4">
              <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
                <span className="text-xs font-bold text-[#39A900] uppercase tracking-wide">
                  {activeSector === 'pinon' && 'El Piñón de la Industria y la Construcción'}
                  {activeSector === 'caduceo' && 'El Caduceo del Comercio y los Servicios'}
                  {activeSector === 'cafe' && 'El Café y las Espigas del Sector Agropecuario'}
                </span>
                <h5 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {activeSector === 'pinon' && 'Fuerza Motriz y Desarrollo Tecnológico'}
                  {activeSector === 'caduceo' && 'Intercambio, Gestión y Relaciones Humanas'}
                  {activeSector === 'cafe' && 'Riqueza de la Tierra y Soberanía Alimentaria'}
                </h5>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-2">
                  {activeSector === 'pinon' &&
                    'El piñón simboliza la fuerza motriz, la maquinaria, los procesos manufactureros, la ingeniería y el trabajo manual que dinamiza la industria colombiana en todas sus expresiones.'}
                  {activeSector === 'caduceo' &&
                    'Inspirado en la vara de Hermes con alas y serpientes entrelazadas, representa las actividades de comercio, logística, servicios financieros, administración y conectividad mercantil.'}
                  {activeSector === 'cafe' &&
                    'Representa la vocación rural de Colombia, la producción agrícola, pecuaria y agroindustrial, reconociendo el papel sagrado de los campesinos y la seguridad alimentaria de la nación.'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Dato de Apropiación para la Evaluación:</p>
                <p>
                  El escudo integra los tres grandes sectores económicos fundacionales atendidos por la formación profesional integral del SENA.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bandera' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <div className="w-full h-auto bg-white border border-slate-300 rounded-lg shadow-md flex items-center justify-center overflow-hidden">
                <img src={senaFlag} alt="Bandera Oficial del SENA" className="w-full h-full object-cover" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-3">Bandera Oficial del SENA</span>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h5 className="text-base font-bold text-slate-900 dark:text-white">Significado de la Bandera Blanca</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                La bandera del SENA se destaca por su fondo blanco inmaculado con el escudo o logosímbolo en color verde institucional en el centro.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#39A900] font-bold">✓</span>
                  <span><strong>Fondo Blanco:</strong> Simboliza la paz, la tranquilidad, la rectitud, la libertad y la transparencia ética en la gestión de lo público.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#39A900] font-bold">✓</span>
                  <span><strong>Verde Institucional (#39A900):</strong> Representa la esperanza de la juventud, el crecimiento continuo y el florecimiento del talento humano.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'logosimbolo' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
              <div className="w-36 h-36 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl flex items-center justify-center border border-emerald-200 dark:border-emerald-800 shadow-sm">
                <SenaLogo className="w-20 h-20" />
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-3">Logosímbolo Institucional</span>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h5 className="text-base font-bold text-slate-900 dark:text-white">La Figura Humana y los Senderos</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                El logosímbolo gráfico del SENA representa a una persona erguida que camina hacia el futuro superando caminos y obstáculos.
              </p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1.5">
                <p><strong>Cabeza circular:</strong> La mente abierta, el pensamiento crítico y el conocimiento técnico.</p>
                <p><strong>Cuerpo vertical:</strong> La firmeza de los valores morales y la dignidad del trabajo.</p>
                <p><strong>Senderos diagonales:</strong> Los múltiples caminos de progreso, aprendizaje y empleo que se abren para cada colombiano.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
