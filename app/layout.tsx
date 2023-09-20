import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import Footer from "./components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable X",
  description:
    "The main liquidity booster for stable assets and lsdfi exclusively on Base built on Aerodrome.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex flex-col items-center bg-main bg-cover bg-center-top ${inter.className}`}
      >
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
