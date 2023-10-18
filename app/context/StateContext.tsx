"use client";
import { usePathname, useParams } from "next/navigation";
import { useState, createContext, useEffect, ReactNode } from "react";

import { routes } from "../../consts";
import { useEthersSigner } from "../utils/ethers";
import { JsonRpcSigner } from "ethers";

export const StateContext = createContext({
  page: "/",
  setPage: (value: string) => {},

  signer: null,
  setSigner: (value: JsonRpcSigner | null) => {},
});

type Props = {
  children?: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const [page, setPage] = useState(routes[0].href);
  const [signer, setSigner] = useState<any>(null);

  const walletSigner = useEthersSigner();

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
        signer,
        setSigner,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
