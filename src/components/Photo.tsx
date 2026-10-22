import Image from "next/image";
import { photos, type PhotoId } from "@/config/photos";

export function Photo({
  id,
  className = "",
  priority = false,
}: {
  id: PhotoId;
  className?: string;
  priority?: boolean;
}) {
  const photo = photos[id];
  if (!("crop" in photo)) {
    return (
      <div className={`photo ${className}`} style={{ height: "auto", containerType: "normal" }}>
        <Image
          src={`/images/aguiluz/${photo.file}`}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 650px) calc(100vw - 40px), (max-width: 1100px) 50vw, 520px"
          preload={priority}
          quality={90}
          className="block h-auto w-full"
        />
      </div>
    );
  }
  const [x, y, width, height] = photo.crop;
  // The browser loads the full source, even when CSS shows only a crop.
  // Account for that scale so responsive images do not load a blurry thumbnail.
  const sourceScale = photo.width / width;
  const sizes = `(max-width: 650px) ${Math.ceil(100 * sourceScale)}vw, (max-width: 1100px) ${Math.ceil(70 * sourceScale)}vw, ${Math.ceil(680 * sourceScale)}px`;
  return (
    <div
      className={`photo ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <div
        className="photo-window"
        style={{
          width: `max(100cqw, ${(100 * width) / height}cqh)`,
          aspectRatio: `${width} / ${height}`,
        }}
      >
        <Image
          src={`/images/aguiluz/${photo.file}`}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes={sizes}
          preload={priority}
          quality={id === "doctor" ? 90 : 75}
          className="source-photo"
          style={{
            width: `${(photo.width / width) * 100}%`,
            maxWidth: "none",
            height: "auto",
            left: `${(-x / width) * 100}%`,
            top: `${(-y / height) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
