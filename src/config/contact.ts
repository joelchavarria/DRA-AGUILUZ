const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "50557450031";
if (!/^505\d{8}$/.test(number))
  throw new Error("NEXT_PUBLIC_WHATSAPP_NUMBER debe contener 505 y 8 dígitos.");

export const clinicContact = {
  /** Número público de WhatsApp de la clínica. */
  whatsappNumber: number,
  whatsappDisplay: `${number.slice(3, 7)} ${number.slice(7)}`,
} as const;

export function buildWhatsAppUrl(message: string) {
  const text = encodeURIComponent(message.trim());

  return `https://wa.me/${clinicContact.whatsappNumber}?text=${text}`;
}
