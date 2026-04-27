import VideoEmbedBase from "@/components/VideoEmbed";

type Props = {
  src: string;
  caption?: string;
};

export default function VideoEmbed({ src, caption }: Props) {
  return (
    <figure className="my-8 m-0">
      <div
        className="rounded-[12px] overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        <VideoEmbedBase src={src} />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
