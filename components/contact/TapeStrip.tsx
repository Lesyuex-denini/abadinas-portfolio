"use client";

interface TapeStripProps {
  className?: string;
}

export default function TapeStrip({ className = "" }: TapeStripProps) {
  return (
    <div
      className={`
        absolute
        h-[22px]
        w-[70px]
        z-20
        rounded-[3px]

        bg-[#ecc4c399]

        shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]

        ${className}
      `}
    />
  );
}
