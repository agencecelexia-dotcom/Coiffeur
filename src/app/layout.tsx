import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Salon Élégance | Coiffeur Premium Paris 8e",
  description:
    "Salon de coiffure haut de gamme au cœur de Paris 8e. Coupes sur-mesure, colorations d'exception et soins capillaires premium. Réservez en ligne.",
  keywords:
    "coiffeur paris 8, salon coiffure premium, balayage paris, coloration paris, coupe femme paris, coiffeur homme paris",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
