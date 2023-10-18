"use client";
import "./globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import Nav from "./components/nav";
import Footer from "./components/footer";
import StateProvider from "./context/StateContext";
import "@rainbow-me/rainbowkit/styles.css";

import {
  AvatarComponent,
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const merge = require("lodash.merge");

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
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

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <img src={ensImage} width={size} height={size} />
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
      <head>
        <title>StableZ</title>
        <meta
          name="description"
          content="The main liquidity booster for stable assets and lsdfi exclusively on Base."
          key="desc"
        />
      </head>
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
