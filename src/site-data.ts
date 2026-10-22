export type Service = {
  slug: string
  name: string
  shortName: string
  summary: string
  intro: string
  explanation: string
  image: string
  imageAlt: string
  imagePosition?: string
  idealFor: string[]
  includes: string[]
  note: string
}

export const services: Service[] = [
  {
    slug: 'odontopediatria',
    name: 'Odontopediatría',
    shortName: 'Niñas y niños',
    summary: 'Acompañamiento paciente y respetuoso para construir una relación tranquila con el cuidado dental.',
    intro: 'Cada visita se adapta a la edad, el ritmo y las necesidades de tu niña o niño. Nuestro objetivo es cuidar su salud bucal y ayudarle a vivir la consulta con más confianza.',
    explanation: 'En la revisión observamos los dientes de leche y los permanentes, las encías y la salida de nuevos dientes. También conversamos sobre la higiene y la alimentación para identificar hábitos que pueden favorecer la caries. A partir de estos hallazgos, explicamos a la familia qué cuidados necesita cada paciente y cómo darles seguimiento durante su crecimiento.',
    image: '/images/aguiluz/odontopediatria-dientes-leche.webp',
    imageAlt: 'Material educativo de la clínica sobre la importancia de los dientes de leche',
    idealFor: ['Primera visita al dentista', 'Revisiones preventivas', 'Orientación de higiene para la familia'],
    includes: ['Conversación previa con la familia', 'Revisión adaptada a su edad', 'Explicaciones sencillas y recomendaciones'],
    note: 'Si tu niña o niño ha tenido una experiencia difícil antes, podés contárnoslo al agendar para preparar una visita más amable.',
  },
  {
    slug: 'evaluacion-integral',
    name: 'Evaluación dental integral',
    shortName: 'Valoración completa',
    summary: 'Una revisión cuidadosa para comprender tu salud bucal y orientarte con claridad.',
    intro: 'La evaluación es el punto de partida para conocer el estado de dientes y encías, conversar sobre tus molestias y definir los siguientes pasos sin apresurarte.',
    explanation: 'Durante la consulta revisamos los dientes, las encías y otros tejidos de la boca. También conversamos sobre tus antecedentes de salud y tratamientos previos. Buscamos señales de caries, desgaste o inflamación y, si necesitás estudios complementarios, te explicamos su finalidad antes de organizar un plan de atención con prioridades claras.',
    image: '/images/aguiluz/calidad-servicio.jpg',
    imageAlt: 'Dra. Aguiluz realizando una evaluación dental a un paciente adulto',
    imagePosition: 'center 72%',
    idealFor: ['Primera consulta', 'Molestias o cambios recientes', 'Revisión antes de iniciar un tratamiento'],
    includes: ['Conversación sobre tus necesidades', 'Revisión clínica', 'Orientación sobre opciones de atención'],
    note: 'La recomendación final depende de la valoración clínica de cada paciente.',
  },
  {
    slug: 'ortodoncia',
    name: 'Valoración de ortodoncia',
    shortName: 'Alineación y función',
    summary: 'Valoración y seguimiento profesional para cuidar la alineación, la mordida y la función.',
    intro: 'Revisamos tus necesidades de alineación y mordida para orientarte sobre el camino adecuado. Cada caso requiere una valoración individual antes de definir un tratamiento.',
    explanation: 'La ortodoncia estudia la posición de los dientes y cómo encajan al cerrar la boca. En la valoración observamos si hay apiñamiento, espacios entre los dientes o alteraciones de la mordida. También explicamos si hacen falta estudios complementarios. Esta información permite plantear opciones de atención y conversar sobre los cuidados y controles que requeriría un tratamiento.',
    image: '/images/aguiluz/atencion-adultos.jpg',
    imageAlt: 'Paciente adulto durante una consulta de valoración en la clínica dental',
    imagePosition: 'center 70%',
    idealFor: ['Dientes desalineados', 'Cambios en la mordida', 'Consulta sobre opciones de ortodoncia'],
    includes: ['Valoración inicial', 'Explicación del caso', 'Orientación sobre los siguientes pasos'],
    note: 'La duración y el tipo de tratamiento solo pueden definirse después de una valoración profesional.',
  },
  {
    slug: 'prevencion-limpieza',
    name: 'Prevención y limpieza dental',
    shortName: 'Cuidado periódico',
    summary: 'Cuidado periódico para mantener dientes y encías saludables y detectar cambios a tiempo.',
    intro: 'Las visitas preventivas ayudan a conservar la salud bucal y a identificar señales importantes antes de que se conviertan en molestias mayores.',
    explanation: 'La limpieza profesional permite retirar la placa y el sarro acumulados en los dientes. El sarro no se elimina únicamente con el cepillado. Según la revisión, definimos el cuidado que corresponde y te orientamos sobre la limpieza entre los dientes. Este cuidado complementa la higiene diaria en casa; su frecuencia se adapta a tus necesidades.',
    image: '/images/aguiluz/prevencion-caries-placa.webp',
    imageAlt: 'Material de la clínica sobre prevención de caries, manchas y placa',
    idealFor: ['Control periódico', 'Acumulación de placa o sarro', 'Refuerzo de hábitos de higiene'],
    includes: ['Revisión de rutina', 'Limpieza según valoración', 'Recomendaciones para el cuidado diario'],
    note: 'La frecuencia ideal de limpieza varía de acuerdo con la salud bucal de cada persona.',
  },
  {
    slug: 'cuidado-encias',
    name: 'Cuidado de encías',
    shortName: 'Encías saludables',
    summary: 'Atención a señales como inflamación, sensibilidad o sangrado durante el cepillado.',
    intro: 'Las encías también necesitan atención. Una valoración oportuna permite comprender el origen de las molestias y orientar el cuidado adecuado.',
    explanation: 'Durante la revisión observamos el estado de las encías y revisamos la acumulación de placa o sarro, el sangrado y otros cambios alrededor de los dientes. Estos hallazgos ayudan a distinguir una inflamación superficial de problemas que pueden afectar los tejidos que sostienen los dientes. Te explicamos qué cuidados, tratamientos o evaluaciones adicionales corresponden según tu caso.',
    image: '/images/aguiluz/cuidado-encias.webp',
    imageAlt: 'Detalle de dientes y encías para el servicio de cuidado de encías',
    imagePosition: 'center 36%',
    idealFor: ['Sangrado al cepillarte', 'Inflamación o sensibilidad', 'Seguimiento preventivo'],
    includes: ['Revisión de encías', 'Orientación de higiene', 'Plan de seguimiento según necesidad'],
    note: 'El sangrado frecuente no debe normalizarse; una consulta ayuda a identificar su causa.',
  },
  {
    slug: 'orientacion-familiar',
    name: 'Orientación para familias',
    shortName: 'Hábitos en casa',
    summary: 'Recomendaciones prácticas para que el cuidado de la sonrisa continúe todos los días en casa.',
    intro: 'Acompañamos a madres, padres y cuidadores con recomendaciones sencillas para crear hábitos de higiene adecuados a cada etapa.',
    explanation: 'Te orientamos para acompañar el cepillado, elegir un cepillo y una pasta con flúor adecuados para cada edad e incorporar la limpieza entre los dientes cuando corresponda. También resolvemos dudas sobre los dientes de leche y los hábitos de alimentación. El objetivo es convertir estas recomendaciones en una rutina práctica que la familia pueda mantener en casa.',
    image: '/images/aguiluz/odontopediatria-comodidad.jpg',
    imageAlt: 'Paciente infantil sonriendo con tranquilidad en el sillón dental',
    imagePosition: 'center 40%',
    idealFor: ['Primeros hábitos de higiene', 'Dudas sobre cepillado', 'Acompañamiento entre controles'],
    includes: ['Recomendaciones por edad', 'Consejos para el cepillado', 'Resolución de dudas de la familia'],
    note: 'Los hábitos pequeños y constantes hacen una gran diferencia a largo plazo.',
  },
  {
    slug: 'restauraciones-dentales',
    name: 'Restauraciones dentales',
    shortName: 'Forma y función',
    summary: 'Valoración de dientes que necesitan recuperar su forma o función mediante una restauración.',
    intro: 'Las restauraciones ayudan a recuperar la forma y la función de dientes afectados por caries, fracturas o desgaste. La revisión de cada diente permite explicar las alternativas y definir cuáles corresponden a tu caso.',
    explanation: 'Una obturación o empaste repone una parte del diente. Las incrustaciones y las coronas pueden ser opciones cuando se necesita una restauración más amplia. Para elegir la opción adecuada, valoramos cuánto tejido dental sano queda, la ubicación del diente y las fuerzas que recibe al morder. Antes de comenzar, conversamos sobre el procedimiento y sus cuidados posteriores.',
    image: '/images/aguiluz/restauraciones-dentales.webp',
    imageAlt: 'Material de la clínica sobre restauraciones dentales',
    idealFor: ['Revisión de un diente con daño o desgaste', 'Valoración de una restauración existente', 'Información sobre opciones de restauración'],
    includes: ['Revisión del diente', 'Explicación de las opciones según la valoración', 'Orientación sobre el procedimiento y presupuesto'],
    note: 'El tipo de restauración se define después de una valoración individual.',
  },
]

export const patientComments = [
  'La Dra. fue súper paciente y cuidadosa.',
  'Me encantó la forma en la que atendió a mi hijo.',
  'Quedó mejor de lo que yo imaginaba.',
  'Te recomendé con una amiga.',
  'No dolió nada.',
]

export const clinicAddress = 'Calle El Consulado, del Ministerio Público 25 varas al Este, Granada, Nicaragua.'
export const mapDirectionsUrl = 'https://www.google.com/maps/search/?api=1&query=11.9300494,-85.957051'
export const mapEmbedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4838.888391583281!2d-85.95705099999999!3d11.930049399999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f740d9c3789cf21%3A0x208be172027cc5c9!2sCl%C3%ADnica%20Dental%20Dra.%20Aguiluz!5e1!3m2!1ses-419!2sni!4v1792682797866!5m2!1ses-419!2sni'

