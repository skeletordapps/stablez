"use client";
import "./globals.css";
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
  midnightTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { base } from "wagmi/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { useEffect, useState } from "react";

const merge = require("lodash.merge");

const inter = Inter({ subsets: ["latin"] });

const { chains, publicClient } = configureChains(
  [base],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: process.env.NEXT_PUBLIC_RPC_HTTPS as string,
        webSocket: process.env.NEXT_PUBLIC_RPC_WSS as string,
      }),
    }),
  ]
);

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

const stablezThemeLight = merge(lightTheme(), {
  colors: {
    accentColor: "#0047FF",
    accentColorForeground: "white",
  },
} as Theme);

const stablezThemeDark = merge(midnightTheme(), {
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
  const [themeSelected, setThemeSelected] = useState(stablezThemeLight);

  useEffect(() => {
    const theme = localStorage.theme as string;
    theme === "dark"
      ? setThemeSelected(stablezThemeDark)
      : setThemeSelected(stablezThemeLight);
    const mutationObserver = new MutationObserver((mutations) => {
      const hasDarkClass = document.querySelector(".dark") !== null;

      hasDarkClass
        ? setThemeSelected(stablezThemeDark)
        : setThemeSelected(stablezThemeLight);
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }, []);

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
            theme={themeSelected}
            avatar={CustomAvatar}
          >
            <div className="flex flex-col items-center bg-main dark:bg-main-dark w-full">
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
