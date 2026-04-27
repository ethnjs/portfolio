"use client";

type Props = {
  src: string;
  className?: string;
};

export default function VideoEmbed({ src, className }: Props) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      onContextMenu={(e) => e.preventDefault()}
      className={className ?? "w-full h-full object-cover"}
    />
  );
}
