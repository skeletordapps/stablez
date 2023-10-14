"use client";
import Image from "next/image";
import { fusdt, usdc } from "@/public/svg";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const tabs = ["Stake", "Unstake"];

export default function Farm({ params }: { params: { id: string } }) {
  // return <div>Farm: {params.id}</div>;
  const [tab, setTab] = useState(0);
  return (
    <main>
      <div className="flex flex-row items-center justify-center w-full px-4 py-4 text-[16px] font-medium gap-10 bg-slate-700 rounded-[8px] shadow-lg mt-10 mb-2">
        {tabs.map((item, index) => (
          <button
            key={index}
            onClick={() => setTab(index)}
            className={`flex flex-row w-max items-center justify-center h-6 transition-all
                  ${
                    index === tab
                      ? " text-white border-b  hover:opacity-90"
                      : " text-blue-400  hover:text-white"
                  }
                  `}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex flex-col bg-white/70 border border-bluex/30 w-full rounded-[8px] shadow-lg mb-10">
        <div className="flex flex-col">
          <div
            className={`flex items-center text-bluex font-medium px-8 pt-8 gap-[200px] ${roboto.className}`}
          >
            <div className="flex items-center">
              <div className="w-[28px]">{usdc}</div>
              <div className="w-[28px] ml-[-10px] drop-shadow-md">{fusdt}</div>
              <span className="ml-3 text-[18px]">vAMM-WETH/USDC</span>
            </div>
            <p className="text-slate-500 text-[14px]">
              APR: <span className="text-slate-700">130%</span>
            </p>
          </div>
          <div className="flex items-center justify-between text-white/80 text-[14px] p-8 gap-3 mt-10 bg-bluex">
            <p className="flex flex-col">
              <span>Total Staked</span>
              <span className="text-white">123123123K</span>
            </p>
            <p className="flex flex-col text-end">
              <span>My Stake</span>
              <span className="text-white">123123123K</span>
            </p>
          </div>
        </div>
        <div className="flex flex-col p-8 mt-4 gap-4">
          <p
            className={`text-end font-light text-[14px] mb-[-12px] pr-1 text-slate-500 ${roboto.className}`}
          >
            {tab === 0 ? "Available:" : "Staked:"}{" "}
            <span className="text-slate-700">10000k</span>
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter the amount"
              className="w-full bg-transparent border border-slate-600 placeholder-slate-600 p-6 text-black rounded-[8px] text-[14px]"
            />
            <div className="flex items-center absolute top-[25px] right-4">
              <div className="w-[22px]">{usdc}</div>
              <div className="w-[22px] ml-[-10px] drop-shadow-md">{fusdt}</div>
              <span className="ml-2 text-[14px]">vAMM-WETH/USDC</span>
            </div>
          </div>

          <button
            className={`transition-all bg-bluex w-full h-[49px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:scale-[1.02] ${roboto.className}`}
          >
            {tabs[tab]} vAMM-WETH/USDC
          </button>
        </div>
      </div>
    </main>
  );
}
