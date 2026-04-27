type Props = {
  url: string;
  caption?: string;
};

function toEmbedUrl(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=)([A-Za-z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function VideoEmbed({ url, caption }: Props) {
  return (
    <figure className="my-8 m-0">
      <div
        className="rounded-[12px] overflow-hidden"
        style={{ border: "1px solid var(--border)", aspectRatio: "16/9", position: "relative" }}
      >
        <iframe
          src={toEmbedUrl(url)}
          title={caption ?? "Project demo"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
