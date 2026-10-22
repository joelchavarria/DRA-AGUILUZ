import Link from "next/link";
import Image from "next/image";

export function Brand({
  variant = "wordmark",
}: {
  variant?: "wordmark" | "header";
}) {
  if (variant === "header") {
    return (
      <Link
        className="brand-logo relative block shrink-0 overflow-hidden"
        href="/"
        aria-label="Clínica Dental Dra. Aguiluz, inicio"
      >
        <Image
          className="brand-logo-image"
          src="/images/aguiluz/logo-aguiluz-original.png"
          alt=""
          width={1200}
          height={1200}
          unoptimized
          loading="eager"
        />
      </Link>
    );
  }

  return (
    <Link
      className="brand"
      href="/"
      aria-label="Clínica Dental Dra. Aguiluz, inicio"
    >
      <span className="brand-name">
        Dra. Aguiluz<span aria-hidden="true">.</span>
      </span>
      <span className="brand-label">CLÍNICA DENTAL · GRANADA</span>
    </Link>
  );
}
