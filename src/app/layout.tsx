import type { Metadata } from "next";
import { Crimson_Pro, IBM_Plex_Mono, Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import PageTransitionProvider from "./PageTransitionProvider";
import SmoothScroll from "./SmoothScroll";
import "./globals.css";
import "lenis/dist/lenis.css";
import "react-isokit/styles.css";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-crimson",
  display: "swap",
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
      data-scroll-behavior="smooth"
      className={cn(
        "bg-background",
        "font-sans",
        inter.variable,
        ibmPlexMono.variable,
        crimsonPro.variable,
      )}
    >
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} ${crimsonPro.variable} antialiased`}
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
              function stop() {
                observer.disconnect();
                Element.prototype.setAttribute = original;
                stripTree(document.documentElement);
              }
              window.__osfinStopStrippingCursorRefs = stop;
              queueMicrotask(function () { stripTree(document.documentElement); });
            })();`}
          </Script>
        ) : null}
        <SmoothScroll>
          <PageTransitionProvider>{children}</PageTransitionProvider>
        </SmoothScroll>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
