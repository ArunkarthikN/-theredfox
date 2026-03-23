import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";
import AmazonPopup from "@/components/AmazonPopup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update the Metadata to include Canonical support
export const metadata: Metadata = {
  metadataBase: new URL("https://theredfox.us"), // Sets the base for all relative URLs
  title: "The Red Fox | Latest News & Insights",
  description: "Explore the intersection of innovation and industry. The Red Fox delivers real-time news, expert analysis, and deep insights into AI, Cryptocurrency, and the evolving world of Technology and Business.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: "/", // This tells Google the main URL is the master version
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Verification Account */}
        <meta name="google-adsense-account" content="ca-pub-9921838148812562" />

        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-BKWFVK4M3K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BKWFVK4M3K');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        {/* Amazon Associate Popup */}
        <AmazonPopup />
      </body>
    </html>
  );
}
