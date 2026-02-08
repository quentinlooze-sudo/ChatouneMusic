import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChatouneMusic — Trouvez la musique de votre humeur",
  description:
    "Découvrez des morceaux Spotify adaptés à l'humeur de votre couple. Sélectionnez votre mood et laissez la musique faire le reste.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${poppins.variable} ${inter.variable} font-body bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#FFF0F5] min-h-screen text-text-main antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                     focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2
                     focus:rounded-full focus:shadow-cta"
        >
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
