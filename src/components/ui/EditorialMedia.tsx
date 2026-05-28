import Image from "next/image";

type EditorialMediaProps = {
  label: string;
  imageUrl?: string | null;
  variant?: "land" | "home" | "investment" | "commercial";
};

export default function EditorialMedia({
  label,
  imageUrl,
  variant = "land",
}: EditorialMediaProps) {
  return (
    <div className={`dpr-editorial-media dpr-media-${variant}`}>
      {imageUrl ? (
        <Image src={imageUrl} alt={label} fill className="dpr-media-image" />
      ) : (
        <div className="dpr-media-frame">
          <span className="dpr-media-line line-a" />
          <span className="dpr-media-line line-b" />
          <span className="dpr-media-line line-c" />
          <span className="dpr-media-mark" />
        </div>
      )}

      <span className="dpr-media-label">{label}</span>
    </div>
  );
}