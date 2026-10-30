import React, { useState } from 'react';
import { Search, BookMarked, Scale, AlertCircle, FileText, CheckCircle2, Sparkles, Calendar, ShieldCheck } from 'lucide-react';

interface ArticleItem {
  id: string;
  chapter: string;
  article: string;
  title: string;
  summary: string;
  fullText: string;
  category: 'derechos' | 'deberes' | 'prohibiciones' | 'sanciones' | 'tramites' | 'actualizaciones_2026';
  is2026Update?: boolean;
}

const REGULATION_ARTICLES: ArticleItem[] = [
  {
    id: 'art-48-2026',
    chapter: 'Capítulo V: Procedimiento y Comité (Reforma Acuerdo 002 de 2026)',
    article: 'Artículo 48 (Reforma 2026)',
    title: 'Comité de Evaluación y Garantías del Debido Proceso (Acuerdo 002 de 2026)',
    summary: 'Publicado en Diario Oficial 53.490 de mayo de 2026: precisa la citación formal por Coordinación Académica, levantamiento de acta y conformación institucional.',
    fullText: 'El Acuerdo 002 del 10 de marzo de 2026 (publicado en el Diario Oficial No. 53.490) modificó puntualmente el Artículo 48 del Acuerdo 009 de 2024 para optimizar la seguridad jurídica y el debido proceso. Dispone la conformación oficial del Comité de Evaluación y Seguimiento: 1. El Coordinador de Formación. 2. El Coordinador Académico (quien efectúa la citación formal escrita con traslado previo de pruebas y levanta el acta motivada de la sesión). 3. El representante del equipo ejecutor de la formación designado por el Subdirector de Centro. 4. El Vocero de la Ficha del aprendiz investigado. Garantiza el término improrrogable de cinco (5) días hábiles para presentar descargos y el derecho de contradicción antes de emitir cualquier concepto decisorio.',
    category: 'actualizaciones_2026',
    is2026Update: true
  },
  {
    id: 'circ-45-2026',
    chapter: 'Directrices Nacionales de Formación 2026 · Dirección General',
    article: 'Circular 45 de 2026',
    title: 'Directrices Nacionales de Contratos de Aprendizaje y Práctica 2026',
    summary: 'Lineamientos técnicos 2026 para la asignación y legalización de cupos de contrato de aprendizaje y cuota regulada en etapa productiva.',
    fullText: 'La Circular 45 de 2026 expedida por la Dirección de Formación Profesional fija los criterios operativos para la distribución nacional de contratos de aprendizaje, velando por el cumplimiento de la cuota de sostenimiento empresarial (75% a 100% SMLMV) y la cobertura integral en salud (EPS) y riesgos laborales (ARL). Consolida los canales digitales de registro institucional en las plataformas del SENA para validación de la etapa productiva.',
    category: 'actualizaciones_2026',
    is2026Update: true
  },
  {
    id: 'circ-141-2026',
    chapter: 'Bienestar al Aprendiz y Focalización 2026',
    article: 'Circular 141 de 2026',
    title: 'Estrategia de Apoyos de Sostenimiento y CampeSENA 2026',
    summary: 'Parámetros actualizados de adjudicación de apoyos económicos, focalización en economía campesina/popular y salud integral.',
    fullText: 'La Circular 141 de 2026 reglamenta la convocatoria nacional de apoyos de sostenimiento regular para aprendices de estratos 1 y 2 en condición de vulnerabilidad socioeconómica. Se articula con las estrategias CampeSENA y Formación Especial Popular (Circulares 22 y 23 de 2026), priorizando subsidios para transporte y alimentación, permanencia estudiantil y el programa de acompañamiento psicosocial.',
    category: 'actualizaciones_2026',
    is2026Update: true
  },
  {
    id: 'art-5',
    chapter: 'Capítulo II: Derechos, Estímulos y Representatividad',
    article: 'Artículo 5',
    title: 'Derechos del Aprendiz SENA',
    summary: 'Garantías esenciales: inducción, formación de calidad, inclusión y ajustes razonables, bienestar, evaluación transparente y debido proceso.',
    fullText: 'El derecho es la potestad que asiste a todo aprendiz para asegurar una formación integral digna y de calidad. Comprende: recibir inducción general y del programa, acceder a infraestructura y ambientes tecnológicos (Zajuna), recibir trato digno y libre de discriminación (con ajustes razonables para personas con discapacidad), disfrutar de Bienestar al Aprendiz, portar carné, ser evaluado objetivamente, concertar planes de mejoramiento formativo, participar en representatividades y ejercer el debido proceso en toda actuación.',
    category: 'derechos'
  },
  {
    id: 'art-6',
    chapter: 'Capítulo II: Derechos, Estímulos y Representatividad',
    article: 'Artículo 6',
    title: 'Estímulos e Incentivos Formativos',
    summary: 'Reconocimientos y beneficios para aprendices destacados en rendimiento académico, monitorías, investigación, arte y deporte.',
    fullText: 'El SENA otorgará reconocimientos a los aprendices que sobresalgan por su excelencia académica, proyectos de innovación en SENNOVA, liderazgo o méritos deportivos y culturales. Incluye: designación como monitores de centro, cartas de felicitación a hoja de vida, prelación en pasantías y comisiones institucionales.',
    category: 'derechos'
  },
  {
    id: 'art-7',
    chapter: 'Capítulo II: Derechos, Estímulos y Representatividad',
    article: 'Artículo 7',
    title: 'Representatividad y Vocería de los Aprendices',
    summary: 'Elección democrática y funciones del Vocero de Ficha y del Representante de Aprendices ante los comités de Centro.',
    fullText: 'Los aprendices tienen derecho a elegir y ser elegidos mediante voto democrático como Voceros de Ficha y Representantes de Aprendices del Centro de Formación. Tienen la misión de ser canal de comunicación, velar por la convivencia, participar en los Comités de Evaluación con voz y representar a la comunidad estudiantil.',
    category: 'derechos'
  },
  {
    id: 'art-8',
    chapter: 'Capítulo III: Deberes del Aprendiz y Prohibiciones',
    article: 'Artículo 8',
    title: 'Deberes del Aprendiz SENA',
    summary: 'Obligaciones formativas: porte visible del carné, puntualidad presencial/virtual, justificación de inasistencias en 3 días hábiles y ética académica.',
    fullText: 'Son deberes del aprendiz: cumplir el presente reglamento (Acuerdo 009 de 2024); portar permanentemente en lugar visible el Carné Institucional; asistir puntualmente a todas las actividades formativas; justificar por escrito inasistencias dentro de los 3 días hábiles siguientes con certificado médico o soporte de fuerza mayor; usar los EPP exigidos en normas de SST; actuar con honestidad intelectual (cero plagio); y cuidar el patrimonio público, equipos y ambientes de la institución.',
    category: 'deberes'
  },
  {
    id: 'art-9',
    chapter: 'Capítulo III: Deberes del Aprendiz y Prohibiciones',
    article: 'Artículo 9',
    title: 'Prohibiciones Expresas para los Aprendices',
    summary: 'Conductas vetadas: plagio, suplantación, porte de armas, sustancias psicoactivas o alcohol, acoso (bullying) o alteración informática.',
    fullText: 'Se prohíbe taxativamente: cometer plagio, fraude o suplantación en evidencias de aprendizaje o evaluaciones virtuales; ingresar bajo efectos de sustancias psicoactivas o bebidas alcohólicas; portar armas; realizar conductas de acoso, violencia física, verbal o ciberacoso; y dar uso indebido a los recursos informáticos, redes o plataformas de la institución.',
    category: 'prohibiciones'
  },
  {
    id: 'art-cap5-faltas',
    chapter: 'Capítulo V: Régimen de Faltas, Medidas y Procedimiento',
    article: 'Capítulo V (Art. Faltas)',
    title: 'Clasificación y Calificación de las Faltas',
    summary: 'Faltas académicas y disciplinarias clasificadas en Leves, Graves o Gravísimas según culpabilidad, daño y reincidencia.',
    fullText: 'Las faltas son las acciones u omisiones que transgreden los deberes o incurren en prohibiciones. Se clasifican en Académicas (incumplimiento en evidencias o competencias) y Disciplinarias (conducta y convivencia). Se graduarán como Leves, Graves o Gravísimas valorando el dolo, el número de afectados, la reincidencia y la afectación al servicio educativo.',
    category: 'sanciones'
  },
  {
    id: 'art-cap5-medidas',
    chapter: 'Capítulo V: Régimen de Faltas, Medidas y Procedimiento',
    article: 'Capítulo V (Medidas Formativas)',
    title: 'Medidas Formativas Pedagógicas',
    summary: 'Acciones de carácter pedagógico preventivo: llamado de atención verbal reflexivo y Planes de Mejoramiento concertados.',
    fullText: 'Bajo la primacía del principio formativo, las medidas formativas buscan la corrección oportuna y el fortalecimiento de competencias sin constituir sanción: 1. Llamado de atención verbal reflexivo. 2. Plan de Mejoramiento Académico concertado entre instructor y aprendiz. 3. Plan de Mejoramiento Disciplinario con compromisos específicos de convivencia.',
    category: 'tramites'
  },
  {
    id: 'art-cap5-sanciones',
    chapter: 'Capítulo V: Procedimiento y Sanciones (Acuerdo 002 de 2026)',
    article: 'Capítulo V (Debido Proceso)',
    title: 'Sanciones Formales y Recurso de Reposición',
    summary: 'Sanciones del Subdirector (llamado escrito, condicionamiento y cancelación de matrícula) con pleno derecho a descargos y reposición en 5 días.',
    fullText: 'Las sanciones solo proceden mediante acto motivado del Subdirector de Centro previo concepto del Comité de Evaluación y Seguimiento: 1. Llamado de atención escrito con copia a hoja de vida. 2. Condicionamiento de matrícula. 3. Cancelación de matrícula (con inhabilidad de 6 meses a 3 años según la gravedad). Se garantizan los descargos, contradicción de pruebas y el derecho a interponer Recurso de Reposición en el término legal de cinco (5) días hábiles conforme al Acuerdo 009 de 2024 y Acuerdo 002 de 2026.',
    category: 'sanciones'
  }
];

export const RegulationExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string>('art-48-2026');

  const filtered = REGULATION_ARTICLES.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.article.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.fullText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat =
      selectedCategory === 'all' ||
      art.category === selectedCategory ||
      (selectedCategory === 'actualizaciones_2026' && art.is2026Update);

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* 2026 Updates Notification Banner */}
      <div className="bg-linear-to-r from-emerald-900 to-slate-900 text-white p-5 rounded-2xl border border-emerald-500/40 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-[#39A900] text-white shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded text-emerald-200">
                  Vigencia 2026
                </span>
                <span className="text-xs text-emerald-300 font-semibold">
                  Actualizaciones Normativas Incorporadas
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-1">
                Acuerdo 002 de 2026 (Diario Oficial No. 53.490) & Circulares 2026
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed mt-1 max-w-2xl">
                El prototipo integra la reforma del <strong>Artículo 48</strong> (debido proceso, citación por Coordinación Académica y conformación del Comité), las directrices de la <strong>Circular 45 de 2026</strong> (cupos de contratos de aprendizaje) y la <strong>Circular 141 de 2026</strong> (apoyos de sostenimiento CampeSENA).
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedCategory('actualizaciones_2026')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4" /> Ver Novedades 2026
          </button>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs transition-colors duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-[#39A900] dark:text-emerald-300 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                Reglamento Vigente 2026
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400">
                Acuerdo 009 de 2024 · Modificado por Acuerdo 002 de 2026
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Reglamento del Aprendiz SENA con Reformas 2026
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Marco normativo oficial expedido por el Consejo Directivo Nacional del SENA
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar por artículo o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#39A900] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg mt-4 overflow-x-auto">
          {[
            { id: 'all', label: 'Todos los Artículos' },
            { id: 'actualizaciones_2026', label: '⭐ Novedades 2026' },
            { id: 'derechos', label: 'Derechos (Cap. II)' },
            { id: 'deberes', label: 'Deberes (Cap. III)' },
            { id: 'prohibiciones', label: 'Prohibiciones' },
            { id: 'sanciones', label: 'Faltas y Sanciones' },
            { id: 'tramites', label: 'Medidas Formativas' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1 ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs transition-all"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="w-full text-left p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors flex items-start justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#39A900] mt-0.5">
                    <BookMarked className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                        {item.chapter}
                      </span>
                      <span className="text-[10px] text-slate-300 dark:text-slate-600">·</span>
                      <span className="text-xs font-mono font-bold text-[#39A900]">{item.article}</span>
                      {item.is2026Update && (
                        <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5 text-[#39A900]" /> Actualización 2026
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{item.title}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{item.summary}</p>
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0 mt-1">
                  {isExpanded ? 'Contraer ▲' : 'Ver Texto Completo ▼'}
                </span>
              </button>

              {isExpanded && (
                <div className="p-4 pt-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">Contenido Normativo Oficial:</p>
                    <p>{item.fullText}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
