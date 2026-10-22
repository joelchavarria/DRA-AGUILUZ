import type { Metadata } from "next";
import { clinic } from "@/config/site";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = configuredUrl ? new URL(configuredUrl).origin : null;
export const allowIndexing = Boolean(
  siteUrl &&
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER &&
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER !== "50589953348",
);
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const url = siteUrl ? `${siteUrl}${path}` : undefined;
  return {
    title,
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: `${title} | ${clinic.name}`,
      description,
      siteName: clinic.name,
      locale: "es_NI",
      type: "website",
      url,
      images: [
        {
          url: "/images/aguiluz/dra-aguiluz-retrato.jpg",
          width: 480,
          height: 480,
          alt: clinic.doctor,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/aguiluz/dra-aguiluz-retrato.jpg"],
    },
  };
}
export const dentistSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: clinic.name,
  ...(siteUrl
    ? {
        url: siteUrl,
        image: `${siteUrl}/images/aguiluz/dra-aguiluz-retrato.jpg`,
      }
    : {}),
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Calle El Consulado, del Ministerio Público 25 varas al Este",
    addressLocality: "Granada",
    addressCountry: "NI",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 11.9300494,
    longitude: -85.957051,
  },
  areaServed: "Granada, Nicaragua",
  sameAs: [clinic.facebook, clinic.instagram],
};
