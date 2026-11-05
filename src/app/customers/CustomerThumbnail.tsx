/** Card thumbnail: optional background photo with the company mark centered. */
export default function CustomerThumbnail({
  background,
  logo,
  company,
  className = "aspect-[16/10]",
}: {
  background?: string;
  logo?: string;
  company?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden border border-black/15 bg-[#F7F1E3] ${className}`.trim()}
    >
      {background ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={background} alt="" className="absolute inset-0 size-full object-cover" />
      ) : null}
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt={company ?? ""}
          className="relative z-10 max-h-[42%] max-w-[68%] object-contain"
        />
      ) : (
        <p className="relative z-10 !m-0 max-w-[12rem] px-6 text-center font-[family-name:var(--font-season)] text-[28px] leading-[1.1] tracking-[-0.03em] text-[#5D524B]">
          {company || "Osfin"}
        </p>
      )}
    </div>
  );
}
