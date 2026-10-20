import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

const title = `${brand.nome} — Sites, lojas online e sistemas para empresas`;
const description = "Descreve o teu negócio em 2 minutos, vê o preço na hora e envia o pedido pelo WhatsApp. Site pronto em 24 a 48 horas. Pagas só depois de pronto.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: title, template: `%s · ${brand.nome}` },
  description,
  applicationName: brand.nome,
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.png", apple: "/android-chrome-512x512.png" },
  openGraph: {
    type: "website",
    locale: "pt_AO",
    siteName: brand.nome,
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: brand.nome }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = { themeColor: "#0A0B0D", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
