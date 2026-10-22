import { RequestForm } from "@/components/RequestForm";
import { requestServices, type RequestKind } from "@/config/requests";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata(
    "Solicitar atención dental",
    "Prepará tu consulta o solicitud de cita con la Dra. Aguiluz antes de continuar en WhatsApp.",
    "/solicitud",
  ),
  robots: { index: false, follow: true },
};

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialService =
    typeof params.servicio === "string" &&
    requestServices.some((option) => option.value === params.servicio)
      ? params.servicio
      : "";
  const initialKind: RequestKind | "" =
    params.tipo === "cita" || params.tipo === "consulta" ? params.tipo : "";
  return (
    <main
      id="contenido"
      className="page-width section-space grid items-start gap-9 min-[901px]:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] min-[901px]:gap-[100px]"
    >
      <div className="request-intro">
        <p className="eyebrow">CITAS Y CONSULTAS</p>
        <h1>Contanos qué necesitás.</h1>
        <p>
          Elegí tu atención y prepará un mensaje con los datos que la clínica
          necesita para responderte.
        </p>
        <p className="request-help">
          Sin registros ni pagos. La fecha de una cita siempre queda sujeta a
          confirmación.
        </p>
      </div>
      <RequestForm
        key={`${initialService}:${initialKind}`}
        initialService={initialService}
        initialKind={initialKind}
      />
    </main>
  );
}
