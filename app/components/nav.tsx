"use client";
import Image from "next/image";
import { useContext } from "react";
import { Inter, Roboto_Condensed } from "next/font/google";
import { routes } from "@/consts";
import Link from "next/link";
import { StateContext } from "../context/StateContext";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
export default function Nav() {
  const { page, setPage } = useContext(StateContext);
  return (
    <>
      {/* DESKTOP */}
      <main className="hidden xl:flex w-full max-w-[1600px] px-[70px]">
        <div
          className={`flex items-center justify-between w-full py-[20px] px-[10px] border-b border-bluex/[24%] ${roboto.className}`}
        >
          <Link href="/" className="hover:opacity-75">
            <Image src="/type-logo2.svg" width={209.5} height={26} alt="logo" />
          </Link>
          <div className="flex items-center justify-center w-full">
            <div className="text-slate-600 flex items-center gap-14 text-[16px]">
              {routes.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-bluex hover:border-b border-bluex ${
                    item.href === page.href && "text-bluex border-b"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <button
            className={`transition-all bg-bluex min-w-[140px] ml-[57.5px] h-[39px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:scale-[1.02] ${roboto.className}`}
          >
            Connect Wallet
          </button>
        </div>
      </main>
      {/* MOBILE */}
      <main className="flex xl:hidden w-full px-4">
        <div
          className={`flex items-center justify-between w-full py-[20px] px-[10px] border-b border-bluex/[24%] ${roboto.className}`}
        >
          <Link href="/" className="hover:opacity-75">
            <Image src="/logo.svg" width={38.25} height={38.25} alt="logo" />
          </Link>
          <div className="hidden flex items-center justify-center w-full">
            <div className="text-slate-600 flex items-center gap-14 text-[16px]">
              {routes.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="hover:text-bluex hover:border-b border-bluex"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <button
            className={`transition-all bg-bluex min-w-[140px] ml-[57.5px] h-[39px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:scale-[1.02] ${roboto.className}`}
          >
            Connect Wallet
          </button>
        </div>
      </main>
    </>
  );
}
