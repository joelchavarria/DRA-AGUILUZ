import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { clinic } from "@/config/site";
import { allowIndexing, siteUrl } from "@/lib/seo";
import "@/index.css";
import "./site.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl ?? "http://127.0.0.1:5173"),
  title: { default: clinic.name, template: `%s | ${clinic.name}` },
  description:
    "Atención dental personalizada con la Dra. Aguiluz en Granada, Nicaragua.",
  robots: { index: allowIndexing, follow: allowIndexing },
  applicationName: clinic.name,
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-NI">
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
