import "./globals.css";
import "./ditto.css";
import "./payments/ditto.css";
import "./demo/demo.css";
import type { ReactNode } from "react";
import SiteHeader from "./components/site-header";
import SiteTransition from "./components/site-transition";
import { SITE_ORIGIN } from "../lib/site";

export const metadata = {
  "metadataBase": new URL(SITE_ORIGIN || "http://localhost:3000"),
  "title": "Osfin: Financial operations, explained",
  "description": "Osfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems.",
  "alternates": {
    "canonical": "/"
  },
  "openGraph": {
    "title": "Osfin: Match at volume. Govern every exception.",
    "description": "Osfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems.",
    "type": "article",
    "siteName": "Osfin",
    "url": "/",
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "Osfin: Match at volume. Govern every exception.",
    "description": "Osfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems.",
      },
  "icons": {
    "icon": [
      {
        "url": "https://aptosnetwork.com/favicon.svg",
        "type": "image/svg+xml",
        "sizes": "any"
      },
      {
        "url": "https://aptosnetwork.com/favicon.ico",
        "type": "image/x-icon"
      },
      {
        "url": "https://aptosnetwork.com/icon-16x16.png",
        "type": "image/png",
        "sizes": "16x16"
      },
      {
        "url": "https://aptosnetwork.com/icon-32x32.png",
        "type": "image/png",
        "sizes": "32x32"
      },
      {
        "url": "https://aptosnetwork.com/icon-48x48.png",
        "type": "image/png",
        "sizes": "48x48"
      },
      {
        "url": "https://aptosnetwork.com/icon-64x64.png",
        "type": "image/png",
        "sizes": "64x64"
      },
      {
        "url": "https://aptosnetwork.com/icon-96x96.png",
        "type": "image/png",
        "sizes": "96x96"
      },
      {
        "url": "https://aptosnetwork.com/icon-180x180.png",
        "type": "image/png",
        "sizes": "180x180"
      },
      {
        "url": "https://aptosnetwork.com/icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "url": "https://aptosnetwork.com/icon-256x256.png",
        "type": "image/png",
        "sizes": "256x256"
      },
      {
        "url": "https://aptosnetwork.com/icon-384x384.png",
        "type": "image/png",
        "sizes": "384x384"
      },
      {
        "url": "https://aptosnetwork.com/icon-512x512.png",
        "type": "image/png",
        "sizes": "512x512"
      },
      {
        "url": "https://aptosnetwork.com/icon-192x192-maskable.png",
        "type": "image/png",
        "sizes": "192x192"
      },
      {
        "url": "https://aptosnetwork.com/icon-512x512-maskable.png",
        "type": "image/png",
        "sizes": "512x512"
      }
    ],
    "apple": [
      {
        "url": "https://aptosnetwork.com/icon-180x180.png",
        "sizes": "180x180"
      },
      {
        "url": "https://aptosnetwork.com/apple-touch-icon.png"
      },
      {
        "url": "https://aptosnetwork.com/apple-touch-icon-precomposed.png"
      }
    ]
  },
  "manifest": "https://aptosnetwork.com/manifest.en.webmanifest"
};
export const viewport = {
  "width": "device-width",
  "initialScale": 1,
  "themeColor": "#D5FAD3"
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={"en"}>
      <head>
        <script
          key="ditto-json-ld-0"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"@id\":\"", "#webpage\",\"url\":\"", "\",\"name\":\"Osfin\",\"headline\":\"Osfin: Financial operations, explained\",\"description\":\"Osfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems.\",\"inLanguage\":\"en\",\"isPartOf\":{\"@type\":\"WebSite\",\"@id\":\"", "#website\",\"url\":\"", "\"},\"publisher\":{\"@type\":\"Organization\",\"@id\":\"", "#organization\"},\"potentialAction\":{\"@type\":\"Action\",\"name\":\"See how it works\",\"target\":\"", "/#workflow\"}}"].join(SITE_ORIGIN) }}
        />
        <script
          key="ditto-json-ld-1"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Osfin: Financial operations, explained\",\"item\":\"", "\"}]}"].join(SITE_ORIGIN) }}
        />
        <script
          key="ditto-json-ld-2"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Osfin industries\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Banking\",\"description\":\"Reconcile deposits, transfers, lending activity and settlement records across core systems.\",\"item\":{\"@type\":\"WebPage\",\"name\":\"Banking\",\"url\":\"", "/#industries\"}},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Payments\",\"description\":\"Trace collections, payouts, refunds, fees and settlement differences across gateways and processors.\",\"item\":{\"@type\":\"WebPage\",\"name\":\"Payments\",\"url\":\"", "/#industries\"}},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Fintech\",\"description\":\"Keep customer balances, partner records and internal ledgers aligned as transaction volume grows.\",\"item\":{\"@type\":\"WebPage\",\"name\":\"Fintech\",\"url\":\"", "/#industries\"}},{\"@type\":\"ListItem\",\"position\":4,\"name\":\"Insurance\",\"description\":\"Connect premiums, claims, commissions and settlement data with clear ownership and evidence.\",\"item\":{\"@type\":\"WebPage\",\"name\":\"Insurance\",\"url\":\"", "/#industries\"}},{\"@type\":\"ListItem\",\"position\":5,\"name\":\"Capital markets\",\"description\":\"Validate trades, positions, cash movements and downstream accounting records.\",\"item\":{\"@type\":\"WebPage\",\"name\":\"Capital markets\",\"url\":\"", "/#industries\"}},{\"@type\":\"ListItem\",\"position\":6,\"name\":\"Marketplaces and gaming\",\"description\":\"Reconcile high-frequency transactions, wallet activity, payouts and partner obligations.\",\"item\":{\"@type\":\"WebPage\",\"name\":\"Marketplaces and gaming\",\"url\":\"", "/#industries\"}}]}"].join(SITE_ORIGIN) }}
        />
        <script
          key="ditto-json-ld-3"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Osfin workflow\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"When a payment settles differently than expected\",\"description\":\"Compare the original transaction, settlement record and ledger entry.\",\"item\":{\"@type\":\"CreativeWork\",\"name\":\"Settlement investigation\",\"url\":\"", "/#settlement\"}},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"When a payout does not match the ledger\",\"description\":\"Trace the payout across gateway, bank and internal records.\",\"item\":{\"@type\":\"CreativeWork\",\"name\":\"Payout resolution\",\"url\":\"", "/#payout\"}},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"When the right action needs a review\",\"description\":\"Apply the relevant policy, route the case to the right approver and preserve the decision.\",\"item\":{\"@type\":\"CreativeWork\",\"name\":\"Approval controls\",\"url\":\"", "/#approvals\"}}]}"].join(SITE_ORIGIN) }}
        />
        <script
          key="ditto-json-ld-4"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"@id\":\"", "#organization\",\"name\":\"Osfin\",\"alternateName\":\"Osfin.ai\",\"description\":\"Osfin is a financial operations and reconciliation platform for teams managing complex transaction records across banks, payment gateways, ERPs, ledgers and internal systems.\",\"url\":\"", "\",\"logo\":\"", "/icon-512x512.png\",\"sameAs\":[]}"].join(SITE_ORIGIN) }}
        />
        <script
          key="ditto-json-ld-5"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ["{\"@context\":\"https://schema.org\",\"@type\":\"WebSite\",\"@id\":\"", "#website\",\"url\":\"", "\",\"name\":\"Osfin\",\"inLanguage\":\"en\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"Osfin\",\"@id\":\"", "#organization\"}}"].join(SITE_ORIGIN) }}
        />
      </head>
      <body className="min-h-screen block text-foreground [font-family:'Season_Serif-4de1940e3ab1f834',_'Season_Serif-4de1940e3ab1f834_fallback:_Arial',_sans-serif] text-base font-normal not-italic leading-6 tracking-[normal] [word-spacing:0px] text-start normal-case whitespace-normal [word-break:normal] [overflow-wrap:normal] indent-0 text-pretty [text-shadow:none] [font-variant-caps:normal] [font-feature-settings:normal] list-outside [writing-mode:horizontal-tb] [direction:ltr] bg-background">
        <SiteHeader />
        <div data-transition="wrapper">
          <div data-transition="container">{children}</div>
        </div>
        <SiteTransition />
      </body>
    </html>
  );
}
