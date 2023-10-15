"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { Inter, Roboto_Condensed } from "next/font/google";
import { routes } from "@/consts";
import Link from "next/link";
import { StateContext } from "../context/StateContext";
import { Transition } from "@headlessui/react";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
export default function Nav() {
  const { page, setPage } = useContext(StateContext);
  const [open, setOpen] = useState(false);
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
                    item.href === page && "text-bluex border-b"
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
      <main className="flex xl:hidden w-full px-4 relative">
        <div
          className={`flex items-center justify-between w-full py-[20px] px-[10px] border-b border-bluex/[24%] ${roboto.className}`}
        >
          <Link href="/" className="hover:opacity-75">
            <Image src="/logo.svg" width={28.25} height={28.25} alt="logo" />
          </Link>
          <div className="flex items-center justify-center flex-1"></div>
          <div className="flex flex-row items-center gap-3">
            <button
              className={`transition-all bg-bluex min-w-[100px] ml-[57.5px] h-[29px] flex justify-center items-center rounded-lg text-white text-[12px] font-medium hover:scale-[1.02] ${roboto.className}`}
            >
              Connect Wallet
            </button>
            <button
              className="w-[29px] h-[29px]"
              onMouseEnter={() => setOpen(true)}
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <Transition
          show={open}
          enter="transition-opacity duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          onMouseLeave={() => setOpen(false)}
        >
          <div className="absolute top-[70px] right-0 w-full px-4">
            <div className="text-slate-600 flex justify-center items-center flex-wrap gap-10 text-[14px] bg-white/40 backdrop-blur-[8px] shadow-2xl py-10 rounded-b-xl">
              {routes.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={`hover:text-bluex hover:border-b border-bluex ${
                    item.href === page && "text-bluex border-b"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </Transition>
      </main>
    </>
  );
}

{
}
