"use client";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, Maximize2, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Photo } from "@/components/Photo";
import { galleryPhotos, photos } from "@/config/photos";

const categories = ["Todas", "La doctora", "Nuestro día a día", "Tratamientos"];
export function Gallery() {
  const [category, setCategory] = useState("Todas");
  const [active, setActive] = useState<number | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = galleryPhotos.filter(
    (id) => category === "Todas" || photos[id].category === category,
  );
  const move = (delta: number) =>
    setActive((index) =>
      index === null ? null : (index + delta + visible.length) % visible.length,
    );
  const id = active === null ? null : visible[active];
  return (
    <>
      <div
        className="gallery-filters"
        role="group"
        aria-label="Filtrar fotografías"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => {
              setCategory(item);
              setActive(null);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {visible.map((id, index) => (
          <figure key={id}>
            <button
              className="gallery-open"
              onClick={(event) => {
                trigger.current = event.currentTarget;
                setActive(index);
              }}
              aria-label={`Ampliar: ${photos[id].caption}`}
            >
              <Photo id={id} />
              <span className="photo-expand">
                <Maximize2 size={17} />
              </span>
            </button>
            <figcaption>
              <span>{photos[id].caption}</span>
              <small>{photos[id].category}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <DialogContent
          className="photo-dialog"
          showCloseButton={false}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            trigger.current?.focus();
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              move(-1);
            }
            if (event.key === "ArrowRight") {
              event.preventDefault();
              move(1);
            }
          }}
        >
          <DialogTitle className="sr-only">
            {id ? photos[id].caption : "Galería"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Fotografías de la clínica. Usá las flechas para navegar y Escape
            para cerrar.
          </DialogDescription>
          <DialogClose
            className="lightbox-close"
            aria-label="Cerrar fotografía"
          >
            <X />
          </DialogClose>
          {id && <Photo id={id} className="lightbox-photo" />}
          <div className="lightbox-controls">
            <button aria-label="Fotografía anterior" onClick={() => move(-1)}>
              <ArrowLeft />
            </button>
            <p aria-live="polite">
              {id && photos[id].caption}
              <small>
                {active !== null ? active + 1 : 0} / {visible.length}
              </small>
            </p>
            <button aria-label="Fotografía siguiente" onClick={() => move(1)}>
              <ArrowRight />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
