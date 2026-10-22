const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "50589953348";
if (!/^505\d{8}$/.test(number))
  throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER debe contener 505 y 8 dígitos.");

export const clinicContact = {
  /** Número temporal para las pruebas del flujo de WhatsApp. */
  whatsappNumber: number,
  whatsappDisplay: `${number.slice(3, 7)} ${number.slice(7)}`,
  isTestNumber: number === "50589953348",
} as const;

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message.trim());

  return `https://wa.me/${clinicContact.whatsappNumber}?text=${text}`;
}
