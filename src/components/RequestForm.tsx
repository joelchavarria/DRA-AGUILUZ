"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { buildWhatsAppUrl, clinicContact } from "@/config/contact";
import {
  careRequestMessage,
  changeRequestKind,
  inquiryTopics,
  preferredTimes,
  requestServices,
  validateCareRequest,
  type CareRequest,
  type RequestErrors,
  type RequestKind,
} from "@/config/requests";

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function RequestForm({
  initialService = "",
  initialKind = "",
}: {
  initialService?: string;
  initialKind?: RequestKind | "";
}) {
  const [data, setData] = useState<CareRequest>({
    kind: initialKind,
    service: initialService,
    name: "",
    date: "",
    time: "",
    topic: "",
    comment: "",
  });
  const [errors, setErrors] = useState<RequestErrors>({});
  const [review, setReview] = useState(false);
  const reviewHeading = useRef<HTMLHeadingElement>(null);
  const firstField = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (review) reviewHeading.current?.focus();
  }, [review]);

  function update<K extends keyof CareRequest>(
    field: K,
    value: CareRequest[K],
  ) {
    setData((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }
  function chooseKind(kind: RequestKind) {
    setData((current) => changeRequestKind(current, kind));
    setErrors({});
  }
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateCareRequest(data, localToday());
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0];
    if (firstError) {
      const field = event.currentTarget.elements.namedItem(firstError);
      if (field instanceof HTMLElement) field.focus();
      else if (field instanceof RadioNodeList)
        (field.item(0) as HTMLElement | null)?.focus();
      return;
    }
    setReview(true);
  }
  function error(field: keyof CareRequest) {
    return errors[field] ? (
      <span className="field-error" id={`${field}-error`} role="alert">
        {errors[field]}
      </span>
    ) : null;
  }

  return (
    <div className="request-flow min-w-0">
      <ol
        className="request-progress mb-[30px] flex list-none flex-wrap gap-x-[30px] gap-y-4 p-0"
        aria-label="Pasos de la solicitud"
      >
        <li
          className="flex items-center gap-2"
          aria-current={!review ? "step" : undefined}
        >
          <span>01</span> Tu solicitud
        </li>
        <li
          className="flex items-center gap-2"
          aria-current={review ? "step" : undefined}
        >
          <span>02</span> Revisá y continuá
        </li>
      </ol>
      <form
        className={`request-form grid-cols-1 gap-[22px] min-[651px]:grid-cols-2 min-[651px]:gap-x-5 min-[651px]:gap-y-6 ${review ? "hidden" : "grid"}`}
        onSubmit={submit}
        noValidate
        hidden={review}
      >
        <fieldset className="request-kind col-span-full min-w-0 border-0 p-0">
          <legend>¿Qué necesitás?</legend>
          <div className="request-kind-options grid">
            <label>
              <input
                type="radio"
                name="kind"
                value="cita"
                checked={data.kind === "cita"}
                onChange={() => chooseKind("cita")}
                required
                aria-invalid={Boolean(errors.kind)}
                aria-describedby={errors.kind ? "kind-error" : undefined}
              />
              <CalendarDays size={20} aria-hidden />
              <span>
                <strong>Agendar una cita</strong>
                <small>Elegir un servicio y proponer una fecha.</small>
              </span>
            </label>
            <label>
              <input
                type="radio"
                name="kind"
                value="consulta"
                checked={data.kind === "consulta"}
                onChange={() => chooseKind("consulta")}
                required
                aria-invalid={Boolean(errors.kind)}
                aria-describedby={errors.kind ? "kind-error" : undefined}
              />
              <MessageCircle size={20} aria-hidden />
              <span>
                <strong>Hacer una consulta</strong>
                <small>Pedir información antes de reservar.</small>
              </span>
            </label>
          </div>
          {error("kind")}
        </fieldset>
        <div className="form-field full col-span-full grid gap-2">
          <Label htmlFor="request-service">
            Servicio de interés <span>*</span>
          </Label>
          <select
            id="request-service"
            name="service"
            value={data.service}
            onChange={(e) => update("service", e.target.value)}
            required
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? "service-error" : undefined}
          >
            <option value="" disabled>
              Seleccioná un servicio
            </option>
            {requestServices.map((service) => (
              <option value={service.value} key={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {error("service")}
        </div>
        <div className="form-field full col-span-full grid gap-2">
          <Label htmlFor="request-name">
            Tu nombre <span>*</span>
          </Label>
          <Input
            ref={firstField}
            id="request-name"
            name="name"
            autoComplete="name"
            placeholder="¿Cómo te llamás?"
            value={data.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={90}
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {error("name")}
        </div>
        {data.kind === "cita" && (
          <>
            <div className="form-field grid min-w-0 gap-2">
              <Label htmlFor="request-date">
                Fecha preferida <small>(opcional)</small>
              </Label>
              <Input
                id="request-date"
                name="date"
                type="date"
                min={localToday()}
                value={data.date}
                onInput={(e) => update("date", e.currentTarget.value)}
                onChange={(e) => update("date", e.target.value)}
                aria-invalid={Boolean(errors.date)}
                aria-describedby={errors.date ? "date-error" : undefined}
              />
              {error("date")}
            </div>
            <div className="form-field grid min-w-0 gap-2">
              <Label htmlFor="request-time">
                Horario preferido <small>(opcional)</small>
              </Label>
              <select
                id="request-time"
                name="time"
                value={data.time}
                onChange={(e) => update("time", e.target.value)}
                aria-invalid={Boolean(errors.time)}
                aria-describedby={errors.time ? "time-error" : undefined}
              >
                <option value="">Sin preferencia</option>
                {preferredTimes
                  .filter((time) => time !== "Sin preferencia")
                  .map((time) => (
                    <option key={time}>{time}</option>
                  ))}
              </select>
              {error("time")}
            </div>
          </>
        )}
        {data.kind === "consulta" && (
          <div className="form-field full col-span-full grid gap-2">
            <Label htmlFor="request-topic">
              ¿Sobre qué querés consultar? <span>*</span>
            </Label>
            <select
              id="request-topic"
              name="topic"
              value={data.topic}
              onChange={(e) => update("topic", e.target.value)}
              required
              aria-invalid={Boolean(errors.topic)}
              aria-describedby={errors.topic ? "topic-error" : undefined}
            >
              <option value="" disabled>
                Seleccioná un tema
              </option>
              {inquiryTopics.map((topic) => (
                <option key={topic}>{topic}</option>
              ))}
            </select>
            {error("topic")}
          </div>
        )}
        {data.kind && (
          <div className="form-field full col-span-full grid gap-2">
            <Label htmlFor="request-comment">
              {data.kind === "consulta" ? "Tu pregunta" : "Comentario"}{" "}
              <small>
                {data.kind === "consulta" && data.topic === "Otra consulta"
                  ? "(obligatorio)"
                  : "(opcional)"}
              </small>
            </Label>
            <textarea
              id="request-comment"
              name="comment"
              rows={3}
              maxLength={300}
              value={data.comment}
              onChange={(e) => update("comment", e.target.value)}
              placeholder={
                data.kind === "consulta"
                  ? "Por ejemplo: ¿cuál es el precio de la valoración?"
                  : "Por ejemplo: la cita es para mi hija."
              }
              required={
                data.kind === "consulta" && data.topic === "Otra consulta"
              }
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={`request-privacy${errors.comment ? " comment-error" : ""}`}
            />
            {error("comment")}
          </div>
        )}
        <p className="form-privacy col-span-full" id="request-privacy">
          No incluyás diagnósticos ni información clínica sensible. Este sitio
          no guarda tu solicitud. Al continuar, el mensaje y los datos que
          incluyás se abrirán en WhatsApp.
        </p>
        <Button
          className="primary-button form-submit col-span-full inline-flex min-h-11 w-full items-center justify-center gap-2.5"
          type="submit"
        >
          Revisar mi solicitud <ArrowRight size={17} aria-hidden />
        </Button>
        <p className="form-note col-span-full">
          Todavía no se abrirá WhatsApp ni se enviará ningún mensaje.
        </p>
      </form>
      {review && (
        <section className="request-review" aria-labelledby="review-heading">
          <h2 id="review-heading" ref={reviewHeading} tabIndex={-1}>
            Revisá tu mensaje
          </h2>
          <p>
            Este mensaje se abrirá en WhatsApp. Podés corregir los datos antes
            de continuar.
          </p>
          <div
            className="request-message"
            aria-label="Vista previa del mensaje"
          >
            {careRequestMessage(data)
              .split("\n")
              .map((line, index) => (
                <div key={index}>
                  {line.startsWith("*") && line.endsWith("*") ? (
                    <strong>{line.slice(1, -1)}</strong>
                  ) : (
                    line || <br />
                  )}
                </div>
              ))}
          </div>
          <p className="request-destination">
            Destino: Clínica Dental Dra. Aguiluz · +505{" "}
            {clinicContact.whatsappDisplay}
            {clinicContact.isTestNumber && (
              <small>Número temporal de pruebas</small>
            )}
          </p>
          <Button
            asChild
            className="primary-button form-submit inline-flex min-h-11 w-full items-center justify-center gap-2.5"
          >
            <a
              href={buildWhatsAppUrl(careRequestMessage(data))}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continuar en WhatsApp <ArrowRight size={17} aria-hidden />
            </a>
          </Button>
          <button
            className="text-link edit-request inline-flex items-center gap-2"
            type="button"
            onClick={() => {
              setReview(false);
              requestAnimationFrame(() => firstField.current?.focus());
            }}
          >
            <ArrowLeft size={15} aria-hidden />
            Corregir mis datos
          </button>
          <p className="form-note">
            El último paso es enviar el mensaje en WhatsApp.
            {data.kind === "cita" && " La clínica debe confirmar tu cita."}
          </p>
        </section>
      )}
    </div>
  );
}
