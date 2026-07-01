import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
}

export default function SectionContainer({
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <div
      className={`
        relative

        w-full
        max-w-7xl

        mx-auto

        ${className}
      `}
    >
      {children}
    </div>
  );
}
