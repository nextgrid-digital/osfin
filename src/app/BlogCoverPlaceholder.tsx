/** Cover slot for blog cards and posts. Uses the image when provided. */
export default function BlogCoverPlaceholder({
  className = "aspect-[16/10]",
  src,
  alt = "",
}: {
  className?: string;
  src?: string;
  alt?: string;
}) {
  return (
    <div
      aria-hidden={!src}
      className={`flex w-full items-center justify-center overflow-hidden border border-black/15 bg-[#F7F1E3] ${className}`.trim()}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <svg viewBox="0 0 48 48" className="size-10 text-[#5D524B]/20" fill="none">
          <rect x="8" y="12" width="32" height="24" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M8 32l8.5-9 6 6.5 5-4.5L40 32" stroke="currentColor" strokeWidth="1.25" />
          <circle cx="17" cy="19" r="2.2" fill="currentColor" />
        </svg>
      )}
    </div>
  );
}
