import { InductionModule } from '../types/induction';

export const INDUCTION_MODULES: InductionModule[] = [
  {
    id: 'mod-1',
    title: 'Módulo 1: Identidad y Valor Institucional',
    shortTitle: 'Identidad SENA',
    description: 'Conoce la historia, la misión transformadora, los símbolos institucionales y los principios que guían a la entidad más querida por los colombianos.',
    durationMinutes: 25,
    category: 'identidad',
    icon: 'Building2',
    sections: [
      {
        id: 'sec-1-1',
        title: 'Misión, Visión y Origen del SENA',
        content: `El Servicio Nacional de Aprendizaje (SENA) nació en 1957 gracias a la iniciativa visionaria del economista cartagenero Rodolfo Martínez Tono, apoyado por organizaciones sindicales y empresariales de Colombia.

Su propósito fundamental ha sido ofrecer y ejecutar la formación profesional integral para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.

El SENA es una entidad pública tripartita (Gobierno, Empresarios y Trabajadores) adscrita al Ministerio del Trabajo, caracterizada por ser 100% gratuita, incluyente y de alta calidad técnica.`,
        keyPoints: [
          'Fundado el 21 de junio de 1957 por Rodolfo Martínez Tono.',
          'Entidad de carácter público, gratuito y con cobertura en los 32 departamentos de Colombia.',
          'Estructura tripartita: Estado, sector empresarial y trabajadores.',
          'Misión centrada en la Formación Profesional Integral (FPI).'
        ],
        interactiveType: 'timeline',
        interactiveData: [
          { year: '1957', event: 'Creación del SENA mediante Decreto Ley 118 de 1957 por Rodolfo Martínez Tono.' },
          { year: '1960', event: 'Firma de convenios con la OIT e inicio de centros fijos de formación técnica industrial.' },
          { year: '1990', event: 'Modernización tecnológica e incorporación de competencias laborales y telemática.' },
          { year: 'Hoy', event: 'Más de 117 centros de formación, Tecnoparques, Hubs de Innovación y plataforma virtual Zajuna.' }
        ]
      },
      {
        id: 'sec-1-2',
        title: 'Símbolos Institucionales: Escudo, Bandera y Logosímbolo',
        content: `Los símbolos del SENA representan la identidad, el trabajo productivo y el avance técnico de nuestra nación.

1. EL ESCUDO:
Diseñado en los comienzos de la institución, está dividido en tres sectores que representan los sectores de la economía nacional:
- El piñón: Representa al sector industrial y de la construcción.
- El caduceo: Representa al sector de comercio y servicios.
- El café y las espigas: Representa al sector agropecuario.

2. LA BANDERA:
De color blanco inmaculado, simboliza la paz, la tranquilidad, la libertad y la transparencia institucional. En su centro porta el escudo o logosímbolo en verde SENA.

3. EL LOGOSÍMBOLO:
Representa gráficamente una figura humana caminando erguida y decidida hacia el horizonte a través de múltiples senderos del conocimiento y superación personal.`,
        keyPoints: [
          'El piñón simboliza la industria y fuerza motriz.',
          'El caduceo representa el comercio y los servicios.',
          'El café y espiga evocan la riqueza del campo y la agricultura colombiana.',
          'El logosímbolo es el aprendiz avanzando con paso firme hacia su proyecto de vida.'
        ],
        interactiveType: 'symbols'
      },
      {
        id: 'sec-1-3',
        title: 'Himno Institucional del SENA',
        content: `El himno del SENA exalta la juventud trabajadora, el amor patrio y el compromiso con el progreso de Colombia.

Fue compuesto por el maestro Luis Alfredo Sánchez (letra) y el maestro Norberto Gómez (música). Se entona solemnemente en actos institucionales, izadas de bandera e inducciones de aprendices en todo el país.`,
        keyPoints: [
          'Letra: Luis Alfredo Sánchez',
          'Música: Norberto Gómez',
          'Mensaje central: Trabajo con dignidad, ciencia, técnica y patriotismo.'
        ],
        interactiveType: 'hymn'
      },
      {
        id: 'sec-1-4',
        title: 'Valores y Principios Institucionales',
        content: `La comunidad SENA se rige por un decálogo ético enfocado en formar ciudadanos integrales, no solo técnicos capacitados.

- Respeto: Trato cordial reconociendo la dignidad y diversidad de cada persona.
- Libre pensamiento y actitud crítica: Análisis reflexivo, propositivo y responsable.
- Liderazgo: Capacidad de guiar con el ejemplo y generar transformaciones positivas.
- Solidaridad: Empatía y cooperación mutua entre compañeros y la comunidad.
- Justicia y equidad: Imparcialidad e igualdad de oportunidades sin discriminación.
- Transparencia: Honestidad en el uso de los recursos y rendición de cuentas.
- Creatividad e innovación: Búsqueda continua de soluciones a desafíos reales.`,
        keyPoints: [
          'Formación con enfoque humano y ético.',
          'Cero tolerancia a actos de discriminación, acoso o deshonestidad.',
          'Compromiso con el medio ambiente y la sostenibilidad.'
        ]
      }
    ]
  },
  {
    id: 'mod-2',
    title: 'Módulo 2: Derechos, Deberes y Estímulos del Aprendiz',
    shortTitle: 'Derechos y Deberes',
    description: 'Estudia a fondo el Acuerdo 009 de 2024 (Reglamento del Aprendiz SENA vigente, que derogó el Acuerdo 007 de 2012). Conoce tus garantías fundamentales, compromisos éticos y estímulos durante la formación.',
    durationMinutes: 30,
    category: 'derechos_deberes',
    icon: 'Scale',
    sections: [
      {
        id: 'sec-2-1',
        title: 'Derechos del Aprendiz SENA (Artículo 5)',
        content: `El Acuerdo 009 de 2024 en su Capítulo II (Artículo 5) consagra los derechos fundamentales que amparan a todo aprendiz matriculado en el SENA en cualquier modalidad (presencial, virtual o a distancia):

1. Inducción integral: Recibir la inducción general y específica sobre el programa de formación, el reglamento y el funcionamiento de la entidad al iniciar su proceso formativo.
2. Formación Profesional Integral de calidad: Acceder a un proceso formativo acorde con el diseño curricular, en ambientes pedagógicos seguros, dotados con la infraestructura, plataformas tecnológicas (Zajuna) y materiales didácticos necesarios.
3. Trato digno y no discriminación: Ser respetado en su dignidad humana, sin distinción de género, raza, credo, orientación sexual o condición de discapacidad, con derecho a solicitar y recibir ajustes razonables que garanticen la inclusión y permanencia.
4. Servicios de Bienestar al Aprendiz: Disfrutar oportunamente de los programas institucionales de salud integral, deporte, arte, cultura, orientación psicológica y convocatorias de apoyos socioeconómicos.
5. Identificación institucional: Recibir el carné que lo acredita como aprendiz SENA y contar con el acompañamiento de las pólizas de seguro estudiantil durante su formación.
6. Evaluación objetiva y retroalimentación: Ser evaluado con criterios transparentes, conocer los resultados de sus evidencias en tiempos reglamentarios y solicitar revisiones fundamentadas ante discrepancias.
7. Medidas pedagógicas preventivas: Recibir acompañamiento pedagógico y concertar Planes de Mejoramiento antes de la imposición de cualquier medida sancionatoria.
8. Representatividad y participación democrática: Elegir y ser elegido como Vocero de Ficha o Representante de los Aprendices del Centro de Formación (Artículo 7).
9. Estímulos e incentivos formativos: Postularse y recibir reconocimientos a la excelencia académica, monitorías institucionales y distinciones por liderazgo o méritos deportivos/culturales (Artículo 6).
10. Garantía del Debido Proceso: Ejercer plenamente el derecho a la defensa, contradicción y presentación de descargos en cualquier trámite disciplinario o formativo.`,
        keyPoints: [
          'Acuerdo 009 de 2024 (Art. 5): Marco normativo vigente de derechos del aprendiz.',
          'Derecho a inducción completa, formación de calidad y ambientes tecnológicos.',
          'Inclusión garantizada con ajustes razonables para aprendices con discapacidad.',
          'Evaluación formativa transparente y concertación de planes de mejoramiento.',
          'Representatividad democrática (Art. 7) y estímulos/monitorías (Art. 6).'
        ]
      },
      {
        id: 'sec-2-2',
        title: 'Deberes y Prohibiciones (Artículos 8 y 9)',
        content: `El Capítulo III del Acuerdo 009 de 2024 establece los deberes y conductas prohibidas que aseguran la excelencia formativa y la convivencia pacífica:

DEBERES DEL APRENDIZ (Artículo 8):
1. Cumplimiento normativo: Conocer, acatar y cumplir el Reglamento del Aprendiz SENA (Acuerdo 009 de 2024) y las directrices del Centro de Formación.
2. Porte del carné: Portar permanentemente en lugar visible y en óptimo estado el Carné Institucional durante el ingreso y permanencia en las sedes presenciales o eventos institucionales.
3. Asistencia y puntualidad: Participar activa y puntualmente en las sesiones presenciales, talleres prácticos o actividades sincrónicas virtuales.
4. Justificación de inasistencias: Justificar por escrito toda inasistencia dentro de los tres (3) días hábiles siguientes al hecho, adjuntando la incapacidad médica o soporte de fuerza mayor.
5. Honestidad y rigor académico: Desarrollar las evidencias de aprendizaje con autoría propia, rigor ético y estricto respeto a los derechos de autor (cero plagio o uso indebido de IA).
6. Cuidado y uso responsable de bienes: Velar por el buen estado de las maquinarias, computadores, herramientas, talleres, bibliotecas y plataformas digitales del SENA.
7. Normas de Seguridad y Salud en el Trabajo (SST): Usar los Elementos de Protección Personal (EPP) y la indumentaria reglamentaria exigida en talleres y laboratorios.
8. Respeto a la comunidad educativa: Mantener un trato cordial, respetuoso y solidario con instructores, compañeros, personal administrativo y de servicios.
9. Actualización de datos: Mantener permanentemente actualizada la información personal en los aplicativos institucionales (Sofia Plus / Zajuna).

PROHIBICIONES EXPRESAS (Artículo 9):
- Plagiar evidencias, suplantar la identidad de compañeros o alterar calificaciones y registros del sistema.
- Ingresar, consumir o comercializar sustancias psicoactivas o bebidas alcohólicas en las instalaciones del SENA o durante visitas técnicas.
- Portar armas de fuego, armas blancas o elementos cortopunzantes no autorizados.
- Realizar actos de acoso, violencia física, verbal, psicológica o matoneo (bullying / ciberacoso).
- Usar las plataformas informáticas o la imagen corporativa del SENA para fines ilícitos, proselitistas o lucrativos particulares.`,
        keyPoints: [
          'Deberes (Art. 8): Porte de carné, asistencia, puntualidad y honestidad académica.',
          'Máximo tres (3) días hábiles para justificar inasistencias con soporte válido.',
          'Uso obligatorio de EPP según protocolos de Seguridad y Salud en el Trabajo.',
          'Prohibiciones (Art. 9): Cero tolerancia al plagio, consumo de sustancias, porte de armas y acoso.'
        ]
      },
      {
        id: 'sec-2-3',
        title: 'Dinámica Interactiva: Clasifica Derecho vs. Deber',
        content: `Evalúa tu apropiación del Acuerdo 009 de 2024 clasificando cada situación real en DERECHO consagrado (Art. 5) o DEBER obligatorio (Art. 8).`,
        interactiveType: 'classifier',
        interactiveData: [
          { text: 'Portar el carné institucional en lugar visible durante toda la permanencia en el centro.', type: 'deber', explanation: 'Es un deber obligatorio estipulado en el Artículo 8 del Reglamento del Aprendiz (Acuerdo 009 de 2024).' },
          { text: 'Recibir acompañamiento pedagógico y concertar un Plan de Mejoramiento cuando un resultado esté pendiente.', type: 'derecho', explanation: 'Es un derecho fundamental formativo consagrado en el Artículo 5 del Acuerdo 009 de 2024.' },
          { text: 'Radicar la justificación de inasistencias dentro de los 3 días hábiles siguientes con el soporte legal.', type: 'deber', explanation: 'Es un deber del Artículo 8 para mantener la regularidad académica y evitar la declaratoria de deserción.' },
          { text: 'Participar y disfrutar de las convocatorias de apoyos socioeconómicos y servicios de Bienestar al Aprendiz.', type: 'derecho', explanation: 'Es un derecho garantizado por el Artículo 5 del Acuerdo 009 de 2024 para la formación integral.' },
          { text: 'Cuidar las máquinas, laboratorios, software y ambientes de aprendizaje asignados.', type: 'deber', explanation: 'Es un deber de cuidado del patrimonio público según el Artículo 8 del reglamento vigente.' },
          { text: 'Ser evaluado con criterios transparentes y conocer las retroalimentaciones en los tiempos estipulados.', type: 'derecho', explanation: 'Es un derecho explícito del Artículo 5 que garantiza el debido proceso y la objetividad formativa.' }
        ]
      }
    ]
  },
  {
    id: 'mod-3',
    title: 'Módulo 3: Faltas, Medidas Formativas y Debido Proceso',
    shortTitle: 'Faltas y Sanciones',
    description: 'Comprende el régimen de faltas académicas y disciplinarias, las medidas formativas y las plenas garantías del debido proceso según el Capítulo V del Acuerdo 009 de 2024 y el Acuerdo 002 de 2026.',
    durationMinutes: 25,
    category: 'reglamento',
    icon: 'AlertTriangle',
    sections: [
      {
        id: 'sec-3-1',
        title: 'Tipología y Calificación de las Faltas (Capítulo V)',
        content: `El Capítulo V del Acuerdo 009 de 2024 clasifica y califica las conductas que quebrantan el compromiso de aprendizaje o las normas de convivencia institucional:

1. FALTAS ACADÉMICAS:
Se configuran cuando el aprendiz incumple los compromisos propios de su proceso de formación, tales como no entregar evidencias de aprendizaje, inasistencias reiteradas injustificadas a formación presencial o virtual, desatención a planes de mejoramiento o falta de participación en actividades de equipo.

2. FALTAS DISCIPLINARIAS:
Se presentan cuando la conducta vulnera la convivencia armónica, la ética o la integridad de la comunidad SENA: agresiones físicas o verbales, consumo o porte de sustancias psicoactivas o alcohol, daño intencionado a bienes públicos, falsificación de documentos, suplantación en plataformas virtuales o desacato reiterado.

CRITERIOS PARA CALIFICAR LA GRAVEDAD:
Toda falta se califica formalmente como Leve, Grave o Gravísima con base en:
- El grado de culpabilidad (dolo o culpa).
- El número de personas afectadas o el perjuicio causado a la comunidad.
- La reiteración de la conducta (antecedentes disciplinarios).
- La perturbación del normal desarrollo de las actividades del Centro de Formación.`,
        keyPoints: [
          'Faltas Académicas: Afectan el desarrollo de competencias y entrega de evidencias.',
          'Faltas Disciplinarias: Afectan la convivencia, la ética y las normas institucionales.',
          'Criterios de graduación: Leves, Graves o Gravísimas según dolo, impacto y reincidencia.'
        ]
      },
      {
        id: 'sec-3-2',
        title: 'Medidas Formativas Pedagógicas vs. Sanciones',
        content: `Bajo el Acuerdo 009 de 2024, el SENA privilegia la función formativa y preventiva de la educación sobre la sanción punitiva:

MEDIDAS FORMATIVAS (Pedagógicas y Preventivas):
Son acciones orientadas a la reflexión, cambio de actitud y superación de dificultades sin constituir antecedente sancionatorio en la hoja de vida:
1. Llamado de atención verbal reflexivo: Diálogo directo del instructor con el aprendiz para corregir oportunamente una conducta leve.
2. Plan de Mejoramiento Académico: Concertación de actividades pedagógicas complementarias para alcanzar resultados de aprendizaje pendientes en un plazo razonable.
3. Plan de Mejoramiento Disciplinario: Compromiso concertado de conducta y convivencia con seguimiento de la coordinación o instructor líder.

MEDIDAS SANCIONATORIAS (Impuestas mediante Resolución por el Subdirector de Centro):
Solo proceden cuando las medidas formativas no han surtido efecto o ante faltas graves y gravísimas, previo concepto vinculante del Comité de Evaluación y Seguimiento:
1. Llamado de atención escrito: Notificación formal que reposa en el expediente del aprendiz.
2. Condicionamiento de la matrícula: Pérdida temporal de beneficios de bienestar y último apercibimiento antes de la cancelación.
3. Cancelación de la matrícula: Pérdida definitiva del carácter de aprendiz SENA, que acarrea inhabilidad para inscribirse en programas del SENA por un periodo de seis (6) meses hasta tres (3) años según la gravedad.`,
        keyPoints: [
          'Prioridad al enfoque pedagógico: Las medidas formativas buscan corregir oportunamente.',
          'Los planes de mejoramiento son la primera vía de solución ante dificultades de aprendizaje.',
          'Las sanciones solo las decreta el Subdirector de Centro previo Comité de Evaluación.'
        ]
      },
      {
        id: 'sec-3-3',
        title: 'El Debido Proceso y el Artículo 48 (Reforma Acuerdo 002 de 2026)',
        content: `El Acuerdo 002 del 10 de marzo de 2026 (publicado en el Diario Oficial No. 53.490 de mayo de 2026) modificó puntualmente el Artículo 48 del Acuerdo 009 de 2024 para blindar las garantías constitucionales y procesales del aprendiz:

CONFORMACIÓN INSTITUCIONAL DEL COMITÉ DE EVALUACIÓN (Artículo 48 modificado):
1. El Coordinador de Formación del Centro.
2. El Coordinador Académico: Funcionario clave responsable de efectuar la citación formal escrita con traslado previo de todas las pruebas y de levantar el acta motivada de la sesión.
3. El representante del equipo ejecutor de la formación: Instructor formalmente designado por el Subdirector de Centro.
4. El Vocero de la Ficha del aprendiz investigado: Representación estudiantil con voz en la deliberación para asegurar garantías al aprendiz.

ETAPAS CLAVE DEL PROCEDIMIENTO DISCIPLINARIO:
1. Informe o queja fundamentada: Radicada con evidencias ante la Coordinación Académica.
2. Citación formal y traslado: El Coordinador Académico notifica formalmente al aprendiz indicando los hechos, normas presuntamente infringidas y pruebas obrantes, otorgando mínimo cinco (5) días hábiles para estructurar y presentar descargos.
3. Sesión del Comité: Audiencia donde el aprendiz expone su versión, rinde descargos, controvierte pruebas y cuenta con el apoyo de su Vocero de Ficha.
4. Concepto motivado: El Comité recomienda al Subdirector archivar el proceso, concertar una medida pedagógica preventiva o decretar una sanción formal.
5. Resolución motivada: Expedida de manera fundada por el Subdirector de Centro.
6. Recurso de Reposición: El aprendiz dispone de cinco (5) días hábiles improrrogables a partir de la notificación personal para interponer reposición y solicitar que la decisión sea revocada o modificada.`,
        keyPoints: [
          'Acuerdo 002 de 2026: Reforma expresa al Artículo 48 del Reglamento del Aprendiz (Diario Oficial 53.490).',
          'El Coordinador Académico efectúa la citación formal con traslado de pruebas y levanta el acta.',
          'Garantía ineludible de cinco (5) días hábiles para descargos y cinco (5) días para Recurso de Reposición.',
          'Participación activa del Vocero de Ficha del aprendiz en la sesión del Comité.'
        ]
      }
    ]
  },
  {
    id: 'mod-4',
    title: 'Módulo 4: Etapas de Formación y Bienestar (Directrices 2026)',
    shortTitle: 'Etapas y Bienestar',
    description: 'Explora la transición de la Etapa Lectiva a la Etapa Productiva bajo la Circular 45 de 2026, las alternativas de práctica y los apoyos de Bienestar / CampeSENA (Circular 141 de 2026).',
    durationMinutes: 20,
    category: 'etapas_bienestar',
    icon: 'Briefcase',
    sections: [
      {
        id: 'sec-4-1',
        title: 'Etapa Lectiva y Etapa Productiva (Circular 45 de 2026)',
        content: `La Formación Profesional Integral del SENA se consolida a través de dos etapas formativas articuladas, reguladas para 2026 bajo las directrices de la Circular 45 de 2026:

1. ETAPA LECTIVA:
Adquisición y perfeccionamiento de competencias técnicas, humanas y tecnológicas en ambientes de aprendizaje presenciales o mediante la plataforma Zajuna.

2. ETAPA PRODUCTIVA (Directrices Circular 45 de 2026):
Aplicación práctica del conocimiento en contextos reales laborales y productivos. Es requisito de ley indispensable para titularse.

MODALIDADES Y ALTERNATIVAS RECONOCIDAS:
- Contrato de Aprendizaje (Ley 789 de 2002 y lineamientos 2026): Patrocinio de empresas con apoyo de sostenimiento económico regulado (75% a 100% SMLMV) y cobertura obligatoria en EPS y ARL.
- Vínculo Laboral o Contractual: En actividades directamente afines al programa de formación del aprendiz.
- Pasantía Institucional o Concertada: En pymes, ONGs, entidades gubernamentales o unidades productivas familiares.
- Proyecto Productivo: Emprendimiento productivo validado y asesorado por el Fondo Emprender o SENNOVA.
- Monitoría SENA: Apoyo calificado a instructores o áreas especializadas de los Centros de Formación.`,
        keyPoints: [
          'Circular 45 de 2026: Criterios técnicos de cupos y seguimiento a contratos de aprendizaje.',
          'Apoyo de sostenimiento empresarial garantizado durante la etapa práctica.',
          'Obligatoriedad de afiliación a EPS y ARL por parte de la empresa patrocinadora.',
          'Registro y seguimiento digital a través del sistema de información institucional.'
        ]
      },
      {
        id: 'sec-4-2',
        title: 'Bienestar al Aprendiz, Apoyos y CampeSENA (Circular 141 de 2026)',
        content: `El Plan Nacional Integral de Bienestar al Aprendiz, fortalecido por la Circular 141 de 2026, promueve la permanencia estudiantil y el desarrollo humano integral:

LÍNEAS DE ACCIÓN INSTITUCIONAL:
1. Salud integral: Programas de salud física, primeros auxilios psicológicos y prevención de riesgos psicosociales.
2. Apoyos de Sostenimiento Regular (Circular 141 de 2026): Auxilios económicos para transporte y alimentación dirigidos a aprendices de estratos 1 y 2 en condición de vulnerabilidad.
3. Estrategias Especiales CampeSENA y Economía Popular (Circulares 22 y 23 de 2026): Focalización prioritaria para aprendices campesinos, rurales y de unidades populares de sustento.
4. Deporte y Recreación: Torneos deportivos intercentros y actividad física para la salud.
5. Cultura y Liderazgo: Escuelas de vocería, arte, música, danza y formación de representantes estudiantiles.

PLATAFORMAS Y SERVICIOS INSTITUCIONALES 2026:
- ZAJUNA: Plataforma oficial de aprendizaje virtual (LMS) para gestión de guías, foros y evidencias.
- SOFIA Plus / BETOWA: Sistema de registro académico, matrículas y certificaciones.
- Agencia Pública de Empleo (APE): Intermediación laboral gratuita para aprendices y egresados.
- Biblioteca Digital SENA: Millones de recursos bibliográficos técnicos y bases de datos científicas gratuitas.`,
        keyPoints: [
          'Circular 141 de 2026: Parámetros actualizados de asignación de apoyos de sostenimiento.',
          'Prioridad en economía campesina y popular con estrategias CampeSENA (Circulares 22 y 23 de 2026).',
          'Zajuna y Betowa/Sofia Plus como ecosistema tecnológico oficial del SENA en 2026.',
          'Servicios de salud física, psicológica y deporte 100% gratuitos.'
        ]
      }
    ]
  },
  {
    id: 'mod-5',
    title: 'Módulo 5: Reglamento del Aprendiz (Acuerdo 009 de 2024)',
    shortTitle: 'Reglamento 009-2024',
    description: 'Conoce a detalle la estructura normativa del Acuerdo 009 de 2024, desde sus fundamentos éticos hasta el régimen sancionatorio.',
    durationMinutes: 30,
    category: 'reglamento',
    icon: 'BookOpen',
    sections: [
      {
        id: 'sec-5-1',
        title: 'Capítulo I: Definiciones y Generalidades',
        content: `El Capítulo I del Acuerdo 009 de 2024 establece los conceptos fundamentales:

        Artículo 1: Definiciones Clave
        - Formación Profesional Integral (FPI): Proceso teórico-práctico integral para el desarrollo técnico, tecnológico, humano y de habilidades socioemocionales.
        - Comunidad Educativa SENA: Aprendices, instructores, personal administrativo, de apoyo y directivos.
        - Aspirante: Persona en proceso de ingreso.
        - Aprendiz SENA: Eje central, persona matriculada en programas de formación.
        - Grupo: Aprendices en un programa identificado con número de ficha.

        Artículo 2: Alcance del Reglamento
        Aplica a aspirantes (ingreso) y aprendices (durante proceso formativo, etapa productiva y hasta certificación) en todas las sedes, modalidades y entornos (físicos o virtuales).

        Artículo 3: Principios Orientadores
        Autonomía, Dignidad, Inclusión, Enfoque diferencial, Enfoque territorial, Participación, Desarrollo sostenible y Solidaridad.

        Artículo 4: Centro de Convivencia
        Espacio o estrategia que brinda condiciones de bienestar (alojamiento/alimentación) a aprendices en vulnerabilidad o lejanía para garantizar permanencia.`,
        keyPoints: [
          'La norma define claramente quiénes conforman la comunidad educativa.',
          'El reglamento rige en todos los entornos de formación (presencial y virtual).',
          'Los principios de inclusión y equidad son transversales a todo el reglamento.'
        ]
      },
      {
        id: 'sec-5-2',
        title: 'Capítulo II: Derechos del Aprendiz',
        content: `El Capítulo II establece las garantías fundamentales del aprendiz:

        Artículo 5: Derechos del Aprendiz
        Consagra derechos esenciales como:
        - Recibir inducción oportuna y formación integral de calidad.
        - Acceder a servicios de Bienestar al Aprendiz, uso de infraestructura, materiales y EPP.
        - Trato digno, no discriminación, orientación, e inclusión (ajustes razonables).
        - Debido proceso en actuaciones académicas/disciplinarias y derecho a la defensa.
        - Evaluación objetiva, retroalimentación oportuna y revisión de calificaciones.
        - Participación democrática y obtención de certificación al cumplir requisitos.

        Artículo 6: Reconocimientos Formativos
        Estímulos por desempeño sobresaliente en rendimiento académico, investigación, innovación, proyectos productivos, arte, cultura, deporte o liderazgo. Incluye menciones, becas o representaciones.

        Artículo 7: Representatividad
        Garantiza la participación democrática mediante la elección de voceros de ficha y representantes de Centros de Formación, quienes actúan como veedores y puente de comunicación institucional.`,
        keyPoints: [
          'El derecho a la evaluación objetiva garantiza el debido proceso formativo.',
          'El SENA promueve activamente el mérito a través de reconocimientos.',
          'La participación democrática es un derecho fundamental del aprendiz.'
        ]
      },
      {
        id: 'sec-5-3',
        title: 'Capítulo III: Deberes del Aprendiz',
        content: `Establecidos en el Artículo 8, comprenden el cumplimiento normativo, porte del carné, asistencia, puntualidad, justificación de inasistencias, honestidad académica, cuidado de bienes, normas de seguridad y respeto a la comunidad.`,
        keyPoints: [
          'Asistencia y puntualidad rigurosa.',
          'Honestidad académica (cero plagio).',
          'Cuidado de infraestructura y ambientes de formación.'
        ]
      },
      {
        id: 'sec-5-4',
        title: 'Capítulo IV: Estímulos e Incentivos',
        content: `El Artículo 6 reconoce el mérito de los aprendices mediante estímulos como reconocimientos públicos, distinciones por excelencia académica, liderazgo, méritos deportivos, culturales y monitorías institucionales.`,
        keyPoints: [
          'Reconocimiento al liderazgo y excelencia.',
          'Monitorías como oportunidad de crecimiento profesional.'
        ]
      },
      {
        id: 'sec-5-5',
        title: 'Capítulo V: Faltas y Medidas Formativas',
        content: `El Capítulo V regula las faltas académicas y disciplinarias, estableciendo la gradualidad de las medidas pedagógicas (llamados de atención, planes de mejoramiento) y sancionatorias (llamado escrito, condicionamiento, cancelación).`,
        keyPoints: [
          'Enfoque restaurativo y pedagógico.',
          'Garantía del debido proceso en todas las etapas.'
        ]
      }
    ]
  }
];
