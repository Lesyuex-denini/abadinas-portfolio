"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ArchiveContextType {
  isOpen: boolean;
  isUnlocking: boolean;

  openArchive: () => void;
  closeArchive: () => void;
}

const ArchiveContext = createContext<ArchiveContextType | null>(null);

export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);

  const openArchive = () => {
    setIsUnlocking(true);

    setTimeout(() => {
      setIsUnlocking(false);
      setIsOpen(true);
    }, 2200);
  };

  const closeArchive = () => setIsOpen(false);

  return (
    <ArchiveContext.Provider
      value={{
        isOpen,
        isUnlocking,

        openArchive,
        closeArchive,
      }}
    >
      {children}
    </ArchiveContext.Provider>
  );
}

export function useArchive() {
  const context = useContext(ArchiveContext);

  if (!context) {
    throw new Error("useArchive must be used inside ArchiveProvider");
  }

  return context;
}
