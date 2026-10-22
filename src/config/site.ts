export const clinic = {
  name: "Clínica Dental Dra. Aguiluz",
  doctor: "Dra. Aguiluz",
  city: "Granada, Nicaragua",
  address:
    "Calle El Consulado, del Ministerio Público 25 varas al Este, Granada, Nicaragua.",
  schedule: "Horarios por confirmar con la clínica.",
  facebook: "https://www.facebook.com/aguiluzclinicadental/",
  instagram: "https://www.instagram.com/aguiluz_clinicadental/",
  maps: "https://www.google.com/maps/search/?api=1&query=11.9300494,-85.957051",
  generalMessage:
    "Hola, doctora. Vi su página web y me gustaría recibir información para agendar una consulta odontológica. Muchas gracias.",
  // Completar solo después de verificar con la doctora.
  fullName: null,
  qualifications: [],
  paymentMethods: null,
} as const;

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "La doctora", href: "/dra-aguiluz" },
  { label: "Servicios", href: "/servicios" },
  { label: "Preguntas", href: "/preguntas-frecuentes" },
  { label: "Contacto", href: "/contacto" },
];

export const homeContent = {
  eyebrow: "ODONTOLOGÍA CERCANA · GRANADA",
  title: "Tu sonrisa merece",
  titleAccent: "un cuidado especial.",
  description:
    "Atención dental personalizada para vos y tu familia. Un espacio para sentirte escuchado, resolver tus dudas y cuidar tu sonrisa con tranquilidad.",
  heroCaption: "Dra. Aguiluz · Atención personal, en cada visita",
  welcome: {
    eyebrow: "EL CUIDADO EMPIEZA AL ESCUCHARTE",
    title: "Una consulta a tu ritmo.",
    description:
      "Sabemos que una visita al dentista puede generar preguntas. Por eso empezamos por conocerte, explicarte cada paso y acompañarte con paciencia.",
    principles: [
      "Tiempo para conversar",
      "Explicaciones claras",
      "Atención para toda la familia",
    ],
  },
  doctor: {
    eyebrow: "CONOCÉ A TU DOCTORA",
    title: "Profesional, cercana. Siempre comprensiva.",
    description:
      "Detrás de cada consulta está la Dra. Aguiluz. Su forma de atender combina el cuidado de tu salud bucal con algo igual de importante: que te sintás en confianza.",
  },
  closing: {
    title: "Conversemos sobre tu próxima visita.",
    description:
      "Un mensaje es suficiente para empezar. Te ayudamos a coordinar tu valoración.",
  },
};

export const pageContent = {
  services: {
    eyebrow: "NUESTROS SERVICIOS",
    title: "Cuidar tu sonrisa, en cada etapa.",
    description:
      "Desde la primera visita de los pequeños hasta tu cuidado periódico. Encontrá la atención que necesitás y consultanos con confianza.",
  },
  doctor: {
    eyebrow: "DRA. AGUILUZ",
    title: "Una persona cercana. Una atención cuidadosa.",
    description:
      "La consulta es un espacio para escucharte, responder preguntas y acompañarte. Una forma de cuidar que pone a cada persona en el centro.",
    philosophyTitle: "La confianza se construye antes de empezar.",
    philosophy:
      "No todas las personas llegan sintiéndose tranquilas. Por eso, escuchar, explicar y respetar el ritmo de cada paciente forma parte de nuestra manera de atender.",
    familyTitle: "Cada sonrisa tiene su propia historia.",
    family:
      "Las necesidades cambian con la edad. Con los pequeños, paciencia y familiarización. Con adolescentes y adultos, una conversación clara para decidir los siguientes pasos.",
  },
  contact: {
    eyebrow: "CONTACTO Y UBICACIÓN",
    title: "Encontranos en Granada.",
    description:
      "Para coordinar una visita o pedir información, prepará tu solicitud. Podrás revisarla antes de enviarla a la clínica.",
  },
  faq: {
    eyebrow: "ANTES DE TU VISITA",
    title: "Antes de tu visita.",
    description:
      "Información sobre citas, precios y preparación para la consulta.",
  },
};

export type Faq = { question: string; answer: string };
export const faqs: Faq[] = [
  {
    question: "¿Cómo puedo agendar una cita?",
    answer:
      "En Solicitar atención, elegí Agendar una cita, seleccioná el servicio y completá tus preferencias. Revisá el mensaje y continuá en WhatsApp. La cita queda confirmada cuando la clínica te responda.",
  },
  {
    question: "¿Atienden niñas y niños?",
    answer:
      "Sí. La clínica comparte atención odontopediátrica con un acompañamiento paciente y adaptado a cada edad. Al escribirnos podés indicar que la consulta es para tu hijo o hija.",
  },
  {
    question: "¿Qué debo llevar a mi primera consulta?",
    answer:
      "Al coordinar tu cita, preguntanos si necesitás llevar algún documento o estudio previo. Compartí cualquier información clínica directamente con la doctora, no en el formulario de la web.",
  },
  {
    question: "¿Cómo puedo consultar precios?",
    answer:
      "En Solicitar atención, elegí Hacer una consulta y el tema Precios y formas de pago. El presupuesto de un tratamiento depende de la valoración de cada caso.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Los métodos de pago deben confirmarse con la clínica antes de la visita. Podés incluir esta pregunta en tu solicitud de información.",
  },
  {
    question: "¿Es necesario reservar con anticipación?",
    answer:
      "Sí, coordiná tu visita con anticipación. La fecha elegida en el formulario es una preferencia y no una reserva automática.",
  },
];

export const pendingVerification = [
  "Nombre completo y formación académica",
  "Horarios fijos y métodos de pago",
  "Servicios adicionales del brief",
  "Fotos originales de instalaciones y recepción, sin afiches",
  "Resultados de tratamientos y consentimientos específicos",
  "Reseñas verificadas de Google",
  "Dominio definitivo y número público de WhatsApp",
];
