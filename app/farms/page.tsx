"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const filters = [
  "Active",
  "Stable",
  "Volatile",
  "Low TVL",
  "Participating",
  "All Farms",
];

const farms = [
  {
    pair: "USDC/USDC",
    apr: "100%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "OPEN",
  },
  {
    pair: "USDC/wUSDR",
    apr: "130%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "ENDED",
  },
  {
    pair: "USDC/USDC",
    apr: "100%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "OPEN",
  },
  {
    pair: "USDC/wUSDR",
    apr: "130%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "ENDED",
  },
  {
    pair: "USDC/USDC",
    apr: "100%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "OPEN",
  },
  {
    pair: "USDC/wUSDR",
    apr: "130%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "ENDED",
  },
];

const pages = [1, 2, 3];

export default function Farms() {
  const [filterSelected, setFilterSelected] = useState(0);
  const [page, setPage] = useState(1);
  return (
    <main className="flex flex-col w-full max-w-[1600px] px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-[87px] mb-[78px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluex ${roboto.className}`}
          >
            Farms Resumed Values
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            There are currently 34 active farms, 20 stable and 14 volatile
            farms.
          </span>
          <div className="flex justify-center items-center gap-[150px] font-medium text-[13px] pt-[60px]">
            <div className="flex flex-col text-bluex">
              <span className="font-medium text-[28px]">TOTAL STAKED</span>
              <span className="font-black text-[42px]">12000.50k</span>
            </div>
            <div className="flex flex-col text-bluex">
              <span className="font-medium text-[28px]">TOTAL STAKED</span>
              <span className="font-black text-[42px]">12000.50k</span>
            </div>
            <div className="flex flex-col text-bluex">
              <span className="font-medium text-[28px]">TOTAL STAKED</span>
              <span className="font-black text-[42px]">12000.50k</span>
            </div>
          </div>
        </div>
      </section>

      {/* FARMS LIST SECTION */}
      <section className="flex flex-col gap-4 text-white">
        <div className="flex flex-col">
          <div className="">
            {/* FILTERS */}
            <div className="flex flex-row justify-between items-center w-full px-4 pr-10 py-6 bg-bluex rounded-[8px] shadow-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Symbol or Address"
                  className="w-[300px] bg-transparent border border-white placeholder-white p-2 px-4 text-white rounded-[8px]"
                />
                <Image
                  src="/search.svg"
                  width={24}
                  height={24}
                  alt="search"
                  className="absolute top-2 right-2"
                />
              </div>

              <div className="flex flex-row items-center justify-between text-[16px] font-medium gap-10">
                {filters.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setFilterSelected(index)}
                    className={`flex flex-row items-center justify-between h-6 transition-all
                  ${
                    index === filterSelected
                      ? " text-white border-b  hover:opacity-90"
                      : " text-blue-400  hover:text-white"
                  }
                  `}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            {/* LIST HEADER */}
            <div
              className={`flex flex-row items-center justify-between w-full py-6 mt-5 px-8 text-[20px] text-bluex text-right ${roboto.className}`}
            >
              <span className="w-[300px] text-left">Farm</span>
              <button className="underline hover:opacity-80 w-[50px] text-right">
                APR
              </button>
              <button className="underline hover:opacity-80 w-[100px] text-right">
                TVL
              </button>
              <span className="w-[100px]">Staked</span>
              <span className="w-[150px]">Est. Rewards</span>
              <span className="w-[150px]">Claimed</span>
              <button className="underline hover:opacity-80 w-[100px] text-right">
                Status
              </button>
            </div>
          </div>
          {/* LIST ITEMS */}
          <div className="flex flex-col w-full gap-1">
            {farms.map((farm, index) => (
              // <>
              //   {index > 0 && <div className="w-full h-[1px] bg-white" />}
              <div
                className={`flex flex-col w-full even:bg-[#D4E1FD] odd:bg-[#FAFDFF] even:text-black odd:text-black hover:text-white hover:bg-bluex border even:border-blue-100 odd:border-bluex/10 rounded-[8px] py-8 text-[14px] text-right`}
              >
                <div className="flex flex-row w-full h-full items-center justify-between px-8">
                  <span className="w-[300px] text-left">{farm.pair}</span>
                  <span className="w-[50px]">{farm.apr}</span>
                  <span className="w-[100px]">{farm.tvl}</span>
                  <span className="w-[100px]">{farm.staked}</span>
                  <span className="w-[150px]">{farm.estimatedRewards}</span>
                  <span className="w-[150px]">{farm.claimedRewards}</span>
                  <span
                    className={`w-[60px] bg-white text-center p-1 rounded-[8px] ml-[40px] ${
                      farm.status === "OPEN" ? "text-green-700" : "text-red-500"
                    } ${roboto.className}`}
                  >
                    {farm.status}
                  </span>
                </div>
              </div>
              // </>
            ))}
          </div>
          {/* PAGINATOR */}
          <div className="flex flex-row justify-between items-center px-2 my-10">
            <span className="text-black font-medium text-[16px]">
              Showing 25 out of 58 pools...
            </span>
            <div className="flex flex-row items-center justify-between  text-[14px] font-medium border border-[#2F3B89]/30 rounded-[8px]">
              <button className="flex flex-row items-center justify-between gap-2 p-2 px-3 rounded-l-[8px] bg-white text-[#2F3B89] hover:bg-bluex hover:text-white">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  ></path>
                </svg>
                <span>Previous</span>
              </button>
              {pages.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setPage(item)}
                  className={`flex flex-row items-center justify-between p-2 px-3 ${
                    page === item
                      ? "bg-bluex text-white hover:bg-bluex hover:opacity-90"
                      : "bg-white text-[#2F3B89] hover:bg-bluex/60 hover:text-white/70"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button className="flex flex-row items-center justify-between gap-2 p-2 px-3 rounded-r-[8px] bg-white text-[#2F3B89] hover:bg-bluex hover:text-white">
                <span>Next</span>
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
