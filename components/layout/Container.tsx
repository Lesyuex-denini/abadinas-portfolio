import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`
        w-full

        max-w-[1600px]

        mx-auto

        px-5
        sm:px-6
        md:px-10
        lg:px-10
        xl:px-12
        2xl:px-20

        ${className}
      `}
    >
      {children}
    </div>
  );
}
