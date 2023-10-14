"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";
import { usdc, fusdt, piggy } from "@/public/svg";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const leftInfo = [
  { title: "Info 1", value: 100000 },
  { title: "Info 2", value: 100000 },
  { title: "Info 3", value: 100000 },
  { title: "Info 4", value: 100000 },
];

const rightInfo = [
  { title: "Info 1", value: 100000 },
  { title: "Info 2", value: 100000 },
  { title: "Info 3", value: 100000 },
  { title: "Info 4", value: 100000 },
];

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
    images: [usdc, fusdt],
  },
  {
    pair: "USDC/wUSDR",
    apr: "130%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "ENDED",
    images: [usdc, fusdt],
  },
  {
    pair: "USDC/USDC",
    apr: "100%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "OPEN",
    images: [usdc, fusdt],
  },
  {
    pair: "USDC/wUSDR",
    apr: "130%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "ENDED",
    images: [usdc, fusdt],
  },
  {
    pair: "USDC/USDC",
    apr: "100%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "OPEN",
    images: [usdc, fusdt],
  },
  {
    pair: "USDC/wUSDR",
    apr: "130%",
    tvl: "20.233k",
    staked: "1100.20k",
    estimatedRewards: "1.450k",
    claimedRewards: "440.87",
    status: "ENDED",
    images: [usdc, fusdt],
  },
];

const pages = [1, 2, 3];

export default function Earn() {
  const [filterSelected, setFilterSelected] = useState(0);
  const [page, setPage] = useState(1);
  const [hover, setHover] = useState(-1);
  return (
    <main className="flex flex-col w-full max-w-[1600px] px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-[87px] mb-[38px]">
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

          <div className="flex flex-col xl:flex-row items-center justify-between gap-[38px] mt-24">
            <div className="flex flex-col bg-gradient-to-br from-bluex/50 via-bluex to-bluex w-full h-[400px] rounded-[8px] shadow-lg">
              <div className="flex flex-col text-white p-8 border-b-2">
                <span className="font-medium text-[28px]">YOUR STAKINGS</span>
                <span className="font-black text-[42px]">12000.50k</span>
              </div>
              <div className="flex flex-col text-white p-8 gap-3 mt-3">
                {leftInfo.map((item, index) => (
                  <p key={index} className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="flex flex-1 border-b border-dotted mx-2" />
                    <span>
                      {item.value.toLocaleString("en-us", {
                        maximumFractionDigits: 2,
                      })}
                      k
                    </span>
                  </p>
                ))}
              </div>
            </div>
            <div className="flex flex-col bg-gradient-to-br from-bluex/10 via-bluex/30 to-bluex/30 w-full h-[400px] rounded-[8px] shadow-lg">
              <div className="flex flex-col text-bluex p-8 border-b-2 border-white">
                <span className="font-medium text-[28px]">YOUR REWARDS</span>
                <span className="font-black text-[42px]">12000.50k</span>
              </div>
              <div className="flex flex-col text-bluex p-8 gap-3 mt-3">
                {rightInfo.map((item, index) => (
                  <p key={index} className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="flex flex-1 border-b border-bluex border-dotted mx-2" />
                    <span>
                      {item.value.toLocaleString("en-us", {
                        maximumFractionDigits: 2,
                      })}
                      k
                    </span>
                  </p>
                ))}
              </div>
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
            <div
              className={`hidden xl:flex flex-row items-center w-full py-6 mt-5 px-8 text-[16px] text-bluex text-right ${roboto.className}`}
            >
              <span className="w-[382px] text-left">Pair</span>
              <button className="underline hover:opacity-80 w-[100px] text-right">
                Farm Details
              </button>
              <button className="underline hover:opacity-80 w-[338px] text-right">
                Earning
              </button>
              <button className="underline hover:opacity-80 flex-1 text-right">
                Status
              </button>
              <div className="w-[158px]" />
            </div>
          </div>
          {/* LIST ITEMS */}
          <div className="flex flex-col w-full gap-[2px]">
            {farms.map((farm, index) => (
              <div
                key={index}
                className={`flex flex-col w-full even:bg-[#D4E1FD] odd:bg-[#FAFDFF] even:text-black odd:text-black hover:text-white hover:bg-bluex border even:border-blue-100 odd:border-bluex/10 rounded-[8px] py-4 text-[14px] text-right`}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(-1)}
              >
                <div className="flex flex-col xl:flex-row w-full h-full items-center px-8">
                  <div className="flex items-center">
                    <div className="w-[28px] z-10 drop-shadow-md">{usdc}</div>
                    <div className="w-[28px] ml-[-10px] drop-shadow-md">
                      {fusdt}
                    </div>
                    <span className="w-[138px] text-left ml-4">
                      {farm.pair}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 min-w-[280px]">
                    <p>
                      <span
                        className={`mr-1 text-[12px]  ${
                          hover === index ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        APR:
                      </span>
                      {farm.apr}
                    </p>
                    <p>
                      <span
                        className={`mr-1 text-[12px]  ${
                          hover === index ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        TVL:
                      </span>
                      {farm.tvl}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 min-w-[340px]">
                    <p>
                      <span
                        className={`mr-1 text-[12px]  ${
                          hover === index ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        Staked:
                      </span>
                      {farm.staked}
                    </p>
                    <p>
                      <span
                        className={`mr-1 text-[12px]  ${
                          hover === index ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        Est. Rewards:
                      </span>
                      {farm.estimatedRewards}
                    </p>
                    <p>
                      <span
                        className={`mr-1 text-[12px]  ${
                          hover === index ? "text-white/80" : "text-neutral-500"
                        }`}
                      >
                        Claimed:
                      </span>
                      {farm.claimedRewards}
                    </p>
                  </div>

                  <p className="flex flex-col gap-1 w-full">
                    <span
                      className={`text-[14px] 
                      ${
                        farm.status === "OPEN"
                          ? hover === index
                            ? "text-green-400"
                            : "text-green-700"
                          : hover === index
                          ? "text-red-200"
                          : "text-red-500"
                      } 
                      ${roboto.className}`}
                    >
                      {farm.status}
                    </span>
                  </p>

                  <Link
                    href={`/earn/${index + 1}`}
                    className={`transition-all bg-bluex min-w-[100px] ml-[57.5px] h-[39px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:bg-white hover:text-bluex border hover:scale-[1.02] gap-3 ${roboto.className}`}
                  >
                    {piggy}
                    <span>Earn</span>
                  </Link>
                </div>
              </div>
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
