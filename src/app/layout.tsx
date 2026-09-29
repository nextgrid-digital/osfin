import type { Metadata } from "next";
import localFont from "next/font/local";
import { IBM_Plex_Mono, Inter } from "next/font/google";
import Script from "next/script";
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
        "bg-[#E4E4E4]",
        "font-sans",
        inter.variable,
        seasonMix.variable,
        ibmPlexMono.variable,
      )}
    >
      <body
        className={`${inter.variable} ${seasonMix.variable} ${ibmPlexMono.variable} antialiased`}
      >
        {process.env.NODE_ENV === "development" ? (
          <Script id="strip-cursor-refs" strategy="beforeInteractive">
            {`(function () {
              var name = "data-cursor-ref";
              function strip(node) {
                if (!node || node.nodeType !== 1 || !node.hasAttribute(name)) return;
                node.removeAttribute(name);
              }
              function stripTree(root) {
                if (!root || !root.querySelectorAll) return;
                strip(root);
                root.querySelectorAll("[" + name + "]").forEach(strip);
              }
              var original = Element.prototype.setAttribute;
              Element.prototype.setAttribute = function (attr, value) {
                if (attr === name) return;
                return original.call(this, attr, value);
              };
              stripTree(document.documentElement);
              var observer = new MutationObserver(function (records) {
                records.forEach(function (record) {
                  if (record.type === "attributes") strip(record.target);
                  record.addedNodes.forEach(stripTree);
                });
              });
              observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: [name],
                childList: true,
                subtree: true,
              });
              queueMicrotask(function () { stripTree(document.documentElement); });
              window.addEventListener("load", function () {
                setTimeout(function () {
                  observer.disconnect();
                  Element.prototype.setAttribute = original;
                }, 0);
              });
            })();`}
          </Script>
        ) : null}
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
