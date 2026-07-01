import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  DM_Sans,
} from "next/font/google";
import "./globals.css";

import SmoothScrolling from "@/components/providers/SmoothScrolling";
import CustomCursor from "@/components/motion/CustomCursor";
import Loader from "@/components/motion/Loader";
import { ArchiveProvider } from "@/context/ArchiveContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Mila — Digital Experience Portfolio",
  description: "Cinematic interactive portfolio built by Mila.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`
    ${geistSans.variable}
    ${geistMono.variable}
    ${cormorant.variable}
    ${dmSans.variable}
    h-full
    antialiased
  `}
    >
      <body className="min-h-full flex flex-col">
        <ArchiveProvider>
          <SmoothScrolling>
            <Loader />
            <CustomCursor />
            {children}
          </SmoothScrolling>
        </ArchiveProvider>
      </body>
    </html>
  );
}
