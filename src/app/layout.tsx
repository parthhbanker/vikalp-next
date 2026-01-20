import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { GTMScript, GTMNoScript } from "@/components/analytics/GTMScript";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { OutboundLinkTracker } from "@/components/analytics/OutboundLinkTracker";
import { Topbar, Navbar, Footer } from "@/components/navigation";
import { ScrollToTop } from "@/components/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vikalp - Empowering Agriculture",
  description: "Vikalp NGO - Transforming lives through sustainable agriculture and rural development",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand focus:text-white focus:rounded-md focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
        >
          Skip to main content
        </a>

        <GTMNoScript />
        <Suspense fallback={null}>
          <GTMScript />
        </Suspense>
        <ScrollDepthTracker />
        <OutboundLinkTracker />
        <Topbar />
        <Navbar />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
