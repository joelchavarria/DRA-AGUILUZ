import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Brand } from "@/components/Brand";
import { clinic, navigation } from "@/config/site";
import { clinicContact } from "@/config/contact";

export function Footer() {
  return (
    <>
      <footer className="site-footer">
        <div className="page-width footer-grid">
          <div className="footer-brand">
            <Brand />
            <p>
              El cuidado de tu sonrisa,
              <br />
              con calma y cercanía.
            </p>
            <div className="social-links">
              <a
                href={clinic.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram de la clínica"
              >
                Instagram
              </a>
              <a
                href={clinic.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook de la clínica"
              >
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
        <div className="page-width footer-bottom">
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
