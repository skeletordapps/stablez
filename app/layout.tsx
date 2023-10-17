"use client";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import Footer from "./components/footer";
import StateProvider from "./context/StateContext";
import { Roboto_Condensed } from "next/font/google";
import Image from "next/image";
import "@rainbow-me/rainbowkit/styles.css";

const merge = require("lodash.merge");

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

import {
  AvatarComponent,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "StableZ",
//   description:
//     "The main liquidity booster for stable assets and lsdfi exclusively on Base.",
// };

const { chains, publicClient } = configureChains([base], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "StableZ",
  projectId: "034912533f2acb4e9dcd810ae4a2a134",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const stablezTheme = merge(lightTheme(), {
  colors: {
    accentColor: "#0047FF",
    accentColorForeground: "white",
  },
} as Theme);

// const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
//   return (
//     <div className="flex bg-white p-3 rounded-full w-full h-full items-center justify-center">
//       <Image src="/logo.svg" width={38} height={38} alt="avatar" />
//     </div>
//   );
// };

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img
      src={ensImage}
      width={size}
      height={size}
      // style={{ borderRadius: 999 }}
    />
  ) : (
    <img src="/avatar.svg" width={size} height={size} alt="avatar" />
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={stablezTheme}
            avatar={CustomAvatar}
          >
            <div className="flex flex-col items-center bg-main w-full">
              <StateProvider>
                <Nav />
                {children}
                <Footer />
              </StateProvider>
            </div>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
