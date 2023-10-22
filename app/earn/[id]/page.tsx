"use client";
import Link from "next/link";
import { fusdt, stablez, usdc } from "@/public/svg";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const tabs = ["Stake", "Unstake", "Rewards"];

export default function Farm({ params }: { params: { id: string } }) {
  // return <div>Farm: {params.id}</div>;
  const [tab, setTab] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const onInputChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setInputValue(value);
    }

    return false;
  };

  return (
    <main className="flex flex-col w-full xl:max-w-[500px] text-center mb-24 px-4">
      <section className="flex items-center justify-between w-full mt-10 md:mt-[87px] mb-[48px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white text-center">
          <h3
            className={`font-medium text-[28px] text-bluez dark:text-aquaz ${roboto.className}`}
          >
            Earn while staking
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E] dark:text-white">
            Stake your LP tokens to earn rewards.
          </span>
        </div>
      </section>

      <div className="flex flex-col bg-white/70 dark:bg-bluez/40 border border-bluez/30 w-full rounded-[8px] shadow-lg mb-10">
        <div className="flex flex-col w-full">
          <div
            className={`flex items-center w-full text-bluez dark:text-white font-medium px-4 md:px-8 pt-8 justify-between ${roboto.className}`}
          >
            <div className="flex items-center">
              <div className="w-[28px]">{usdc}</div>
              <div className="w-[28px] ml-[-10px] drop-shadow-md">{fusdt}</div>
              <span className="ml-3 text-[18px]">vAMM-WETH/USDC</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-[14px]">
              APR:{" "}
              <span className="text-slate-700 dark:text-slate-200">130%</span>
            </p>
          </div>
          <div className="flex items-center justify-between text-white/80 text-[14px] py-8 px-4 md:px-8 gap-3 mt-10 bg-bluez">
            <p className="flex flex-col text-start">
              <span>Total Staked</span>
              <span className="text-white">
                {Number(100000).toLocaleString("en-us", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
            <p className="flex flex-col text-end">
              <span>My Stake</span>
              <span className="text-white">
                {Number(100000).toLocaleString("en-us", {
                  maximumFractionDigits: 2,
                })}
              </span>
            </p>
          </div>
        </div>
        <div className="flex flex-col py-8 px-4 md:px-8 mt-10 gap-4">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-1">
              {tabs.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTab(index)}
                  className={`transition-all  w-16 h-[29px] flex justify-center items-center rounded-lg text-white text-[12px] font-medium hover:scale-[1.02] ${
                    roboto.className
                  } ${tab === index ? "bg-bluez" : "bg-bluez/20"}`}
                >
                  {tabs[index]}
                </button>
              ))}
            </div>
            <p
              className={`text-end font-light text-[14px] mb-[-26px] pr-1 text-slate-500 dark:text-white/80 ${
                roboto.className
              } ${tab === 2 ? "hidden" : "block"}`}
            >
              {tab === 0 ? "Available:" : "Staked:"}{" "}
              <button
                className="text-slate-700 dark:text-white hover:text-bluez dark:hover:text-aquaz"
                onClick={() => onInputChange(Number(1000).toString())}
              >
                {Number(1000).toLocaleString("en-us", {
                  maximumFractionDigits: 2,
                })}
              </button>
            </p>
          </div>

          {tab !== 2 ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Enter the amount"
                className="w-full bg-transparent border border-slate-600 dark:border-white placeholder-slate-600 dark:placeholder-white p-6 text-black dark:text-white rounded-[8px] text-[14px]"
                onChange={(e) => onInputChange(e.target.value)}
                value={inputValue}
              />
              <div className="flex items-center absolute top-[25px] right-4">
                <div className="w-[22px]">{usdc}</div>
                <div className="w-[22px] ml-[-10px] drop-shadow-md">
                  {fusdt}
                </div>
                <span className="ml-2 text-[14px text-bluez dark:text-aquaz">
                  vAMM-WETH/USDC
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2 font-light text-[14px] text-[#3E3E3E] dark:text-white text-left pl-2 py-[9px] pt-[12px]">
              <p>
                Weth Accumulated:{" "}
                <span className="text-green-700 dark:text-green-400">
                  {Number(0.02333).toLocaleString("en-us", {
                    maximumFractionDigits: 4,
                  })}
                </span>
              </p>
              <p>
                Anytoken Accumulated:{" "}
                <span className="text-green-700 dark:text-green-400">
                  {Number(0.02333).toLocaleString("en-us", {
                    maximumFractionDigits: 4,
                  })}
                </span>
              </p>
            </div>
          )}

          <button
            className={`transition-all bg-bluez w-full h-[49px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:scale-[1.02] ${roboto.className}`}
          >
            {tab === 2 ? "Claim Rewards" : tabs[tab] + " vAMM-WETH/USDC"}
          </button>
        </div>
        {/* <div className="flex flex-col py-8 px-4 md:px-8 mt-4 gap-4">
          <p
            className={`text-end font-light text-[14px] mb-[-12px] pr-1 text-slate-500 ${roboto.className}`}
          >
            {tab === 0 ? "Available:" : "Staked:"}{" "}
            <button
              className="text-slate-700 hover:text-bluez"
              onClick={() => onInputChange(Number(1000).toString())}
            >
              {Number(1000).toLocaleString("en-us", {
                maximumFractionDigits: 2,
              })}
            </button>
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter the amount"
              className="w-full bg-transparent border border-slate-600 placeholder-slate-600 p-6 text-black rounded-[8px] text-[14px]"
              onChange={(e) => onInputChange(e.target.value)}
              value={inputValue}
            />
            <div className="flex items-center absolute top-[25px] right-4">
              <div className="w-[22px]">{usdc}</div>
              <div className="w-[22px] ml-[-10px] drop-shadow-md">{fusdt}</div>
              <span className="ml-2 text-[14px]">vAMM-WETH/USDC</span>
            </div>
          </div>

          <button
            className={`transition-all bg-bluez w-full h-[49px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:scale-[1.02] ${roboto.className}`}
          >
            {tabs[tab]} vAMM-WETH/USDC
          </button>
        </div> */}
      </div>
      <Link
        href="/earn"
        className="flex flex-row gap-3 items-center justify-center dark:text-aquaz"
      >
        <svg
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
          ></path>
        </svg>
        Back to the Farm's list
      </Link>
    </main>
  );
}
