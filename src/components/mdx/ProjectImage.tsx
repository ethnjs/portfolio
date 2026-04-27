type Props = {
  src: string;
  alt?: string;
  caption?: string;
};

export default function ProjectImage({ src, alt = "", caption }: Props) {
  return (
    <figure className="my-8 m-0">
      <div
        className="rounded-[12px] overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        <img src={src} alt={alt} className="w-full object-cover block" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center font-mono text-xs text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
