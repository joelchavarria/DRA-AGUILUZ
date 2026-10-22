import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Brand } from "@/components/Brand";
import { clinic, navigation } from "@/config/site";
import { clinicContact } from "@/config/contact";

export function Footer() {
  return (
    <>
      <footer className="site-footer bg-(--footer-background) pt-9 text-(--footer-foreground) min-[651px]:pt-11">
        <div className="page-width footer-grid pb-7">
          <div className="footer-brand">
            <Brand />
            <p className="mt-4!">
              El cuidado de tu sonrisa,
              <br />
              con calma y cercanía.
            </p>
            <div className="social-links mt-3">
              <a
                className="inline-flex min-h-11 items-center gap-2"
                href={clinic.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de la clínica"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  aria-hidden="true"
                  focusable="false"
                  className="shrink-0"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                Instagram
              </a>
              <a
                className="inline-flex min-h-11 items-center gap-2"
                href={clinic.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de la clínica"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  focusable="false"
                  className="shrink-0"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
          <nav aria-label="Navegación del pie de página">
            <h2>Explorá</h2>
            {navigation
              .filter((n) => n.href !== "/")
              .map((item) => (
                <Link href={item.href} key={item.href}>
                  {item.label}
                </Link>
              ))}
          </nav>
          <div className="footer-contact">
            <h2>Te esperamos en Granada</h2>
            <p>{clinic.address}</p>
            <a href={clinic.maps} target="_blank" rel="noreferrer">
              Cómo llegar <ArrowUpRight size={15} />
            </a>
            <p className="footer-hours">
              +505 {clinicContact.whatsappDisplay}
              {clinicContact.isTestNumber && <small> · Pruebas</small>}
            </p>
          </div>
        </div>
        <div className="page-width footer-bottom py-3.5">
          <span>
            © {new Date().getFullYear()} {clinic.name}
          </span>
          <span>
            <MapPin size={13} />
            {clinic.city}
          </span>
        </div>
      </footer>
    </>
  );
}
