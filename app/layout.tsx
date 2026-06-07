import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://auctionbidding11.onrender.com"),
  title: "auctionbidding11 - Real-Time IPL Cricket Auction & Bidding Simulator",
  description: "Host private IPL cricket auction rooms with friends or compete with advanced bots on auctionbidding11. Track salary budgets, make strategic bids, and build your championship team.",
  keywords: [
    "auctionbidding11",
    "auctionbidding 11",
    "auction bidding 11",
    "auctionbidding",
    "IPL auction simulator",
    "cricket auction game",
    "online bidding rooms",
    "multiplayer cricket draft",
    "IPL draft simulator",
    "IPL mock auction online",
    "cricket bidding simulator",
    "IPL auction lobby",
    "play IPL auction with friends",
    "cricket auction game multiplayer",
    "IPL fantasy draft simulator",
    "live IPL bidding game",
    "cricket manager game",
    "IPL squad builder",
    "fantasy cricket auction",
    "IPL auction board game",
    "online auction game",
    "cricket card game online",
    "IPL 2026 auction simulator"
  ],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "p2-f7tuet-ThsOqKq1IAZXZWQtBm22uhx26u4efhyb4",
  },
  openGraph: {
    title: "auctionbidding11 - Real-Time IPL Cricket Auction & Bidding Simulator",
    description: "Host private IPL cricket auction rooms with friends or compete with advanced bots on auctionbidding11. Track salary budgets, make strategic bids, and build your championship team.",
    url: "https://auctionbidding11.onrender.com",
    siteName: "auctionbidding11",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "auctionbidding11 - Real-Time IPL Cricket Auction & Bidding Simulator",
    description: "Host private IPL cricket auction rooms with friends or compete with advanced bots on auctionbidding11. Track salary budgets, make strategic bids, and build your championship team.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "auctionbidding11",
              "alternateName": ["Auction Bidding 11", "auctionbidding 11", "IPL Auction Arena"],
              "url": "https://auctionbidding11.onrender.com/",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "auctionbidding11",
              "applicationCategory": "GameApplication",
              "operatingSystem": "All",
              "url": "https://auctionbidding11.onrender.com/",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "INR"
              },
              "description": "Multiplayer real-time IPL cricket auction simulator and bidding game."
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
