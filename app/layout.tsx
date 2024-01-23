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
import { publicProvider } from "wagmi/providers/public";

import { base } from "wagmi/chains";
import { jsonRpcProvider } from "@wagmi/core/providers/jsonRpc";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineChain } from "viem";

export const localhost = /*#__PURE__*/ defineChain({
  id: 31337,
  name: "Localhost",
  network: "localhost",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["http://127.0.0.1:8545"] },
    public: { http: ["http://127.0.0.1:8545"] },
  },
});

const merge = require("lodash.merge");

const inter = Inter({ subsets: ["latin"] });

const { chains, publicClient } = configureChains(
  [localhost],
  [publicProvider()] // remove this later
  // [base],
  // [
  //   jsonRpcProvider({
  //     rpc: () => ({
  //       http: process.env.NEXT_PUBLIC_RPC_HTTPS as string,
  //       webSocket: process.env.NEXT_PUBLIC_RPC_WSS as string,
  //     }),
  //   }),
  // ]
);

const { connectors } = getDefaultWallets({
  appName: "StableZ",
  projectId: "05b15c8eb4973e3ebe77fb475b44804e",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeSelected, setThemeSelected] = useState(stablezThemeLight);

  const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    const theme = localStorage.theme as string;
    return ensImage ? (
      <img src={ensImage} width={size} height={size} />
    ) : (
      <img
        src={theme === "dark" ? "/avatar-white.svg" : "/avatar.svg"}
        width={size}
        height={size}
        alt="avatar"
      />
    );
  };

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
      <body className={`dark:bg-[#111827] ${inter.className}`}>
        <ToastContainer
          containerId="toast-notification"
          position="top-right"
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider
            chains={chains}
            theme={themeSelected}
            avatar={CustomAvatar}
          >
            <div className="flex flex-col items-center bg-main dark:bg-main-dark w-full">
              <ToastContainer
                containerId="toast-notification"
                position="top-right"
                autoClose={6000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
              />
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
