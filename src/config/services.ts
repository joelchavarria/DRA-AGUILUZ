import type { PhotoId } from "@/config/photos";
import { services } from "@/site-data";

const servicePhotos: Record<string, PhotoId> = {
  odontopediatria: "pediatricCare",
  "evaluacion-integral": "care",
  ortodoncia: "consultation",
  "prevencion-limpieza": "prevention",
  "cuidado-encias": "gums",
  "orientacion-familiar": "child",
  "restauraciones-dentales": "restorations",
};
export const serviceContent = services.map((service) => ({
  ...service,
  photo: servicePhotos[service.slug],
}));
