"use client";
import { usePathname, useParams } from "next/navigation";
import { useState, createContext, useEffect, ReactNode } from "react";

import { route, routes } from "../../consts";

export const StateContext = createContext({
  page: "/",
  setPage: (value: string) => {},
});

type Props = {
  children?: ReactNode;
};

export const StateProvider = ({ children }: Props) => {
  const pathname = usePathname();
  const params = useParams();
  const [page, setPage] = useState(routes[0].href);

  useEffect(() => {
    const route = routes.find((item) =>
      params.id
        ? pathname.substring(0, pathname.lastIndexOf("/")) === item.href
        : pathname === item.href
    )!;

    console.log(route);
    setPage(route.href);
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
