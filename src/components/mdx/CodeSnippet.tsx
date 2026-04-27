type Props = {
  language?: string;
  label?: string;
  children: string;
};

export default function CodeSnippet({ label, children }: Props) {
  return (
    <div className="my-6">
      {label && (
        <p className="font-mono text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 m-0">
          {label}
        </p>
      )}
      <pre
        className="font-mono text-sm text-[var(--text-secondary)] rounded-[8px] p-5 overflow-x-auto m-0"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
