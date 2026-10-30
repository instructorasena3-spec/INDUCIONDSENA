import { Question } from '../types/induction';

export const QUESTION_BANK: Question[] = [
  {
    id: 'q-1',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    scenario: 'Durante el primer día de inducción, el instructor relata el origen y la razón de ser del Servicio Nacional de Aprendizaje en Colombia.',
    question: '¿En qué año fue fundado el SENA y quién fue su principal promotor?',
    options: [
      'En 1957 por Rodolfo Martínez Tono con respaldo del Gobierno y trabajadores.',
      'En 1975 por el Ministerio de Educación Nacional.',
      'En 1948 por iniciativa de la Organización Internacional del Trabajo únicamente.',
      'En 1991 mediante la promulgación de la nueva Constitución Política.'
    ],
    correctIndex: 0,
    explanation: 'El SENA nació el 21 de junio de 1957 mediante el Decreto Ley 118 de 1957, impulsado por el economista Rodolfo Martínez Tono.',
    normativeReference: 'Decreto Ley 118 de 1957 / Estatuto Orgánico del SENA'
  },
  {
    id: 'q-2',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    scenario: 'Al observar el escudo oficial de la entidad, un aprendiz le pregunta a sus compañeros por el significado de las figuras en sus tres sectores.',
    question: '¿Qué representa el piñón ubicado en el escudo del SENA?',
    options: [
      'El sector industrial y de la construcción.',
      'El sector agropecuario y de alimentos.',
      'El comercio, finanzas y los servicios.',
      'El sector de la tecnología aeroespacial.'
    ],
    correctIndex: 0,
    explanation: 'El piñón representa la industria y la construcción, el caduceo al comercio y servicios, y el café y espiga al sector agropecuario.',
    normativeReference: 'Manual de Identidad Visual Institucional del SENA'
  },
  {
    id: 'q-3',
    category: 'derechos_deberes',
    categoryLabel: 'Derechos y Deberes',
    scenario: 'Laura tuvo una calamidad de salud que le impidió asistir a su jornada de formación técnica el día lunes y martes.',
    question: 'Según el Reglamento del Aprendiz vigente, ¿cuál es el plazo máximo que tiene Laura para radicar la justificación médica ante su instructor o coordinación?',
    options: [
      'Dentro de los tres (3) días hábiles siguientes al hecho con su respectivo soporte.',
      'En cualquier momento antes de culminar el trimestre formativo.',
      'Dentro de las 24 horas siguientes sin necesidad de adjuntar certificados.',
      'Un plazo de quince (15) días calendario mediante llamada telefónica.'
    ],
    correctIndex: 0,
    explanation: 'El Reglamento del Aprendiz SENA (Acuerdo 009 de 2024) estipula con claridad en su Artículo 8 que el aprendiz debe justificar las inasistencias dentro de los 3 días hábiles siguientes.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Art. 8 - Deberes del Aprendiz)'
  },
  {
    id: 'q-4',
    category: 'derechos_deberes',
    categoryLabel: 'Derechos y Deberes',
    scenario: 'Un aprendiz olvida su carné institucional en casa e intenta ingresar a las instalaciones del centro y a los talleres de formación.',
    question: '¿Cuál es la norma obligatoria sobre el carné institucional dentro del SENA según el Acuerdo 009 de 2024?',
    options: [
      'Portarlo permanentemente en un lugar visible de la prenda superior y en óptimas condiciones.',
      'Basta con mostrar una fotografía guardada en el teléfono celular en la entrada.',
      'El carné es obligatorio únicamente para salir del centro al final de la jornada.',
      'Solo los aprendices becados o con contrato de aprendizaje deben portar carné.'
    ],
    correctIndex: 0,
    explanation: 'Portar el carné visible y en buen estado es un deber ineludible por razones de seguridad, identificación y póliza de seguros en los ambientes presenciales.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Art. 8, Numeral de Identificación)'
  },
  {
    id: 'q-5',
    category: 'reglamento',
    categoryLabel: 'Reglamento y Debido Proceso',
    scenario: 'Mateo no logró superar una de las evidencias técnicas requeridas en la competencia de desarrollo de software.',
    question: '¿A qué mecanismo formativo preventivo tiene derecho Mateo antes de que se considere una sanción disciplinaria o académica?',
    options: [
      'A solicitar y concertar un Plan de Mejoramiento Pedagógico con su instructor.',
      'A la cancelación inmediata de matrícula por bajo rendimiento.',
      'A repetir el año formativo completo de manera obligatoria.',
      'A un llamado de atención escrito directamente en su hoja de vida.'
    ],
    correctIndex: 0,
    explanation: 'El Plan de Mejoramiento es una medida formativa que permite concertar actividades pedagógicas complementarias para que el aprendiz alcance los resultados pendientes sin ser sancionado.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Art. 5 y Cap. V - Medidas Formativas)'
  },
  {
    id: 'q-6',
    category: 'reglamento',
    categoryLabel: 'Reglamento y Debido Proceso',
    scenario: 'Un caso disciplinario de falta grave es remitido al Comité de Evaluación y Seguimiento del Centro de Formación.',
    question: 'En caso de que el Subdirector emita una resolución sancionatoria, ¿qué recurso legal le asiste al aprendiz para controvertir la decisión?',
    options: [
      'Interponer recurso de reposición dentro de los cinco (5) días hábiles siguientes a la notificación.',
      'Ninguno, las decisiones del Subdirector son inapelables de forma inmediata.',
      'Presentar una demanda civil en los juzgados en un plazo de tres meses.',
      'Solicitar traslado de sede educativa sin revisión del caso.'
    ],
    correctIndex: 0,
    explanation: 'El debido proceso garantiza el derecho de defensa y contradicción; el aprendiz puede interponer recurso de reposición ante el Subdirector de Centro dentro de 5 días hábiles.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Cap. V y Acuerdo 002 de 2026 - Debido Proceso)'
  },
  {
    id: 'q-7',
    category: 'etapas_bienestar',
    categoryLabel: 'Etapas de Formación',
    scenario: 'Una aprendiz está próxima a finalizar su etapa lectiva y debe seleccionar su alternativa para la etapa productiva.',
    question: '¿Cuál de las siguientes constituye una alternativa legal válida para desarrollar la etapa productiva en el SENA?',
    options: [
      'Todas las siguientes son alternativas válidas reconocidas por el SENA.',
      'Contrato de Aprendizaje con patrocinio empresarial (Ley 789 de 2002).',
      'Vínculo laboral en actividades directamente afines al programa de formación.',
      'Proyecto productivo institucional o asesorado por el Fondo Emprender.'
    ],
    correctIndex: 0,
    explanation: 'El SENA reconoce el Contrato de Aprendizaje, Vínculo laboral afín, Pasantías, Proyectos Productivos, Monitorías y Unidades Productivas Familiares.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Cap. IV - Alternativas de Etapa Productiva)'
  },
  {
    id: 'q-8',
    category: 'etapas_bienestar',
    categoryLabel: 'Bienestar al Aprendiz',
    scenario: 'Un grupo de aprendices con dificultades socioeconómicas necesita apoyo para transporte y alimentación durante sus jornadas de formación.',
    question: '¿A través de qué dependencia institucional se tramitan los programas de apoyo de sostenimiento, deporte, cultura y salud?',
    options: [
      'Coordinación de Bienestar al Aprendiz del Centro de Formación.',
      'Agencia Pública de Empleo (APE) exclusivamente.',
      'Oficina de Tesorería Nacional del Ministerio de Hacienda.',
      'Comité Paritario de Seguridad y Salud en el Trabajo (COPASST).'
    ],
    correctIndex: 0,
    explanation: 'Bienestar al Aprendiz lidera las convocatorias de apoyos de sostenimiento (regular, FIC, monitorías) y programas de salud, deporte y cultura.',
    normativeReference: 'Plan Nacional Integral de Bienestar al Aprendiz SENA (Acuerdo 009 de 2024, Art. 5)'
  },
  {
    id: 'q-9',
    category: 'identidad',
    categoryLabel: 'Identidad Institucional',
    scenario: 'En la entonación del Himno del SENA, se resalta la consigna del progreso social de Colombia a través de la educación técnica.',
    question: '¿Cuáles son los compositores oficiales de la letra y música del Himno del SENA?',
    options: [
      'Luis Alfredo Sánchez (letra) y Norberto Gómez (música).',
      'Rafael Pombo (letra) y Oreste Síndici (música).',
      'Rodolfo Martínez Tono (letra) y Lucho Bermúdez (música).',
      'Gabriel García Márquez (letra) y Jorge Villamil (música).'
    ],
    correctIndex: 0,
    explanation: 'El Himno del SENA fue escrito por Luis Alfredo Sánchez y musicalizado por el maestro Norberto Gómez.',
    normativeReference: 'Patrimonio Cultural e Institucional del SENA'
  },
  {
    id: 'q-10',
    category: 'reglamento',
    categoryLabel: 'Reglamento y Faltas',
    scenario: 'Un aprendiz suplanta a un compañero en la presentación de una evaluación virtual institucional a través de la plataforma Zajuna.',
    question: '¿Cómo está catalogada la conducta de fraude, suplantación o falsedad en documentos en el SENA?',
    options: [
      'Como una Falta Disciplinaria Gravísima que puede derivar en la cancelación de matrícula.',
      'Como una falta leve subsanable con un llamado de atención verbal.',
      'Como un error técnico del sistema que no genera responsabilidad.',
      'Como una falta académica únicamente con repetición de la prueba sin investigación.'
    ],
    correctIndex: 0,
    explanation: 'La suplantación y el fraude académico/disciplinario atentan contra la ética pública institucional y se tipifican como faltas gravísimas según el régimen disciplinario.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Art. 9 - Prohibiciones y Cap. V)'
  },
  {
    id: 'q-11',
    category: 'reglamento',
    categoryLabel: 'Normativa Vigente',
    scenario: 'Durante la inducción a la formación profesional integral, el instructor orienta a los aprendices sobre el marco normativo actual que regula sus derechos, deberes y convivencia.',
    question: '¿Cuál es el acuerdo expedido por el Consejo Directivo Nacional que contiene el Reglamento del Aprendiz SENA actualmente vigente en el país?',
    options: [
      'El Acuerdo 009 de 2024 (que derogó formalmente el anterior Acuerdo 007 de 2012).',
      'El Acuerdo 007 de 2012 como única norma histórica sin modificaciones.',
      'El Decreto Ley 118 de 1957 de manera exclusiva.',
      'La Ley 789 de 2002 únicamente para aprendices de empresa.'
    ],
    correctIndex: 0,
    explanation: 'El Consejo Directivo Nacional del SENA expidió el Acuerdo 009 de 2024 como el nuevo Reglamento del Aprendiz vigente, derogando formalmente el histórico Acuerdo 007 de 2012.',
    normativeReference: 'Acuerdo 009 de 2024 (Consejo Directivo Nacional del SENA)'
  },
  {
    id: 'q-12',
    category: 'derechos_deberes',
    categoryLabel: 'Derechos e Inclusión',
    scenario: 'Un aprendiz en situación de discapacidad visual o motriz requiere adaptaciones técnicas y curriculares para participar en igualdad de condiciones.',
    question: 'Según el Artículo 5 del Acuerdo 009 de 2024, ¿a qué garantía institucional tiene derecho el aprendiz para su permanencia exitosa?',
    options: [
      'A recibir atención diferencial y ajustes razonables concertados para su formación y evaluación.',
      'Debe contratar a su propio asistente pedagógico sin acompañamiento del centro.',
      'A ser exonerado de los resultados de aprendizaje sin adaptaciones pedagógicas.',
      'A ser transferido de manera obligatoria a modalidad virtual sin consentimiento.'
    ],
    correctIndex: 0,
    explanation: 'El Acuerdo 009 de 2024 consagra explícitamente el derecho a ajustes razonables y atención diferencial inclusiva para garantizar que las personas en condición de discapacidad culminen su formación.',
    normativeReference: 'Reglamento del Aprendiz SENA (Acuerdo 009 de 2024, Art. 5 - Atención Diferencial e Inclusión)'
  },
  {
    id: 'q-13',
    category: 'reglamento',
    categoryLabel: 'Actualización 2026',
    scenario: 'Se convoca a un Comité de Evaluación y Seguimiento en un Centro de Formación bajo las disposiciones vigentes de 2026.',
    question: '¿Qué modificación fundamental introdujo el Acuerdo 002 de 2026 (publicado en Diario Oficial No. 53.490) al Artículo 48 del Reglamento del Aprendiz?',
    options: [
      'Designa al Coordinador Académico como responsable de la citación formal con traslado de pruebas y del acta, garantizando el debido proceso junto al Coordinador de Formación, representante del equipo ejecutor y Vocero.',
      'Elimina el derecho a presentar descargos para acelerar las sanciones inmediatas.',
      'Prohíbe la presencia del Vocero de la Ficha en las deliberaciones del Comité.',
      'Transfiere la potestad de juzgamiento disciplinario a las empresas patrocinadoras.'
    ],
    correctIndex: 0,
    explanation: 'El Acuerdo 002 de 2026 modificó el Artículo 48 del Acuerdo 009 de 2024 para optimizar la seguridad jurídica y el debido proceso, asignando al Coordinador Académico la citación formal y el acta motivada, con participación del Vocero de Ficha.',
    normativeReference: 'Acuerdo 002 de 2026 (Consejo Directivo Nacional del SENA - Diario Oficial 53.490)'
  },
  {
    id: 'q-14',
    category: 'etapas_bienestar',
    categoryLabel: 'Directrices 2026',
    scenario: 'Un aprendiz está planificando su etapa productiva y desea postularse a los apoyos socioeconómicos institucionales.',
    question: 'Según las directrices vigentes de 2026 (Circular 45 y Circular 141), ¿cuál de las siguientes afirmaciones es correcta?',
    options: [
      'El contrato de aprendizaje garantiza apoyo de sostenimiento con cobertura en EPS y ARL, y los aprendices en vulnerabilidad pueden acceder a apoyos regulares y de la estrategia CampeSENA.',
      'Los aprendices deben costear sus propios seguros de riesgos laborales (ARL) durante la práctica.',
      'Los apoyos de sostenimiento fueron suspendidos de manera definitiva a nivel nacional.',
      'La etapa productiva no requiere legalización ni registro en los sistemas del SENA.'
    ],
    correctIndex: 0,
    explanation: 'Las Circulares 45 y 141 de 2026 garantizan la protección social y económica del aprendiz en su práctica y fortalecen la focalización de auxilios para aprendices campesinos y de estratos 1 y 2.',
    normativeReference: 'Dirección de Formación Profesional - Circular 45 de 2026 y Circular 141 de 2026'
  }
];
