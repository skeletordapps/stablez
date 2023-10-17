import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import Footer from "./components/footer";
import StateProvider from "./context/StateContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StableZ",
  description:
    "The main liquidity booster for stable assets and lsdfi exclusively on Base.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col items-center bg-main">
          <StateProvider>
            <Nav />
            {children}
            <Footer />
          </StateProvider>
        </div>
      </body>
    </html>
  );
}
