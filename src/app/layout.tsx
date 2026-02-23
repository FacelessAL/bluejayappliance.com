import type { Metadata } from "next";
import { Poppins, Figtree } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCallBar from "@/components/MobileCallBar";
import HeaderSpacer from "@/components/HeaderSpacer";
import { getBusiness } from "@/lib/data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const biz = getBusiness();

export const metadata: Metadata = {
  title: {
    default: `${biz.name} | ${biz.serviceCategory} in ${biz.address.city}, ${biz.address.state} | Same-Day Service`,
    template: `%s | ${biz.name}`,
  },
  description: biz.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: biz.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${biz.name} | ${biz.serviceCategory} in ${biz.address.city}, ${biz.address.state} | Same-Day Service`,
    description: biz.description,
  },
  alternates: {
    canonical: biz.url,
  },
  metadataBase: new URL(biz.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${figtree.variable} antialiased font-[family-name:var(--font-poppins)]`}
      >
        <header className="fixed top-0 left-0 right-0 z-50">
          <TopBar />
          <Navbar />
        </header>
        <HeaderSpacer />
        <main className="main-content">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  );
}
