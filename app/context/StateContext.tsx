"use client";
import { usePathname } from "next/navigation";
import { useState, createContext, useEffect, ReactNode } from "react";

import { route, routes } from "../../consts";

export const StateContext = createContext({
  page: routes[0] as route,
  setPage: (value: route) => {},
});

type Props = {
  children?: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const [page, setPage] = useState(routes[0]);

  useEffect(() => {
    const route = routes.find((item) => item.href === pathname)!;
    setPage(route);
  }, [pathname]);

  return (
    <StateContext.Provider
      value={{
        page,
        setPage,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateProvider;
