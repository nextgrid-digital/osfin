import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import PageTransitionProvider from "./PageTransitionProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const seasonMix = localFont({
  src: "./fonts/SeasonMix-TRIAL-Regular.ttf",
  variable: "--font-season",
  display: "swap",
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "Osfin: AI-native payment operations",
  description:
    "Osfin partners with financial institutions and payment companies to operationalize AI-native payment operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "bg-[#f4f4f4]",
        "font-sans",
        inter.variable,
        seasonMix.variable,
        ibmPlexMono.variable,
      )}
    >
      <body
        className={`${inter.variable} ${seasonMix.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
