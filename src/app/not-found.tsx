import Link from "next/link";
export default function NotFound() {
  return (
    <main id="contenido" className="page-width text-intro">
      <p className="eyebrow">PÁGINA NO ENCONTRADA</p>
      <h1>Volvamos a encontrarnos.</h1>
      <p>Esta dirección no está disponible.</p>
      <Link className="text-link" href="/">
        Volver al inicio →
      </Link>
    </main>
  );
}
