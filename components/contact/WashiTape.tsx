"use client";

interface WashiTapeProps {
  className?: string;
}

export default function WashiTape({ className = "" }: WashiTapeProps) {
  return (
    <div
      className={`
        absolute
        h-[18px]

        overflow-hidden

        bg-[#ffffff20]

        ${className}
      `}
    >
      <div
        className="
          absolute
          inset-0

          bg-[repeating-linear-gradient(90deg,transparent,transparent_8px,rgba(255,255,255,0.2)_8px,rgba(255,255,255,0.2)_10px)]
        "
      />
    </div>
  );
}
