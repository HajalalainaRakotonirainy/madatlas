import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MadAtlas",
  description: "Services d'urgence SIG MadAtlas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
