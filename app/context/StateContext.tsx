"use client";
import { usePathname, useParams } from "next/navigation";
import { useState, createContext, useEffect, ReactNode } from "react";

import { routes } from "../../consts";
import { useEthersProvider, useEthersSigner } from "../utils/ethers";
import { JsonRpcProvider, JsonRpcSigner } from "ethers";

export const StateContext = createContext({
  page: "/",
  setPage: (value: string) => {},

  provider: null,
  setProvider: (value: JsonRpcProvider | undefined) => {},

  signer: null,
  setSigner: (value: JsonRpcSigner | undefined) => {},
});

type Props = {
  children?: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const [page, setPage] = useState(routes[0].href);
  const [provider, setProvider] = useState<any>(undefined);
  const [signer, setSigner] = useState<any>(undefined);

  const jsonProvider = useEthersProvider();
  const walletSigner = useEthersSigner();

  useEffect(() => {
    if (jsonProvider) {
      setProvider(jsonProvider as JsonRpcProvider);
    }
  }, [jsonProvider]);

  useEffect(() => {
    if (walletSigner) {
      setSigner(walletSigner as JsonRpcSigner);
    }
  }, [walletSigner]);

  useEffect(() => {
    const route = routes.find((item) =>
      params.id
        ? pathname.substring(0, pathname.lastIndexOf("/")) === item.href
        : pathname === item.href
    )!;

    setPage(route.href);
  }, [pathname]);

  return (
    <StateContext.Provider
      value={{
        page,
        setPage,
        provider,
        setProvider,
        signer,
        setSigner,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
