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
    <main className="flex flex-col w-full max-w-[1600px] px-[70px]">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-[87px] mb-[78px]">
        {/* FARMS RESUME */}
        <div className="w-full max-w-[70%] h-[240px] bg-gradient-to-tr from-[#000D6C]/40 via-[#2B3889]/70 to-[#2B3889] rounded-[16px] flex flex-col justify-between text-white p-6 border border-[#7479A3]">
          <h3 className="font-semibold">
            Farms available to stake LPs and earn yields
          </h3>
          <div className="flex items-center gap-3 font-medium text-[13px] pb-[20px]">
            <div className="rounded-[8px] px-4 py-2 bg-[#404467]">
              TVL - 19000K
            </div>
            <div className="rounded-[8px] px-4 py-2 bg-[#404467]">
              TVL - 19000K
            </div>
            <div className="rounded-[8px] px-4 py-2 bg-[#404467]">
              TVL - 19000K
            </div>
          </div>
          <span className="border-t pt-[50px] pl-2">
            There are currently 34 active farms, 20 stable and 14 volatile
            farms.
          </span>
        </div>
        {/* HOW IT WORKS */}
        <div className="w-full max-w-[26%] h-[240px] bg-blue rounded-[16px] flex flex-col justify-between text-white p-6 border border-[#7479A3]">
          <h3 className="font-semibold">How it works</h3>
          <p className="text-sm font-light text-neutral-300">
            The deeper the liquidity (TVL), the lower the slippage a pool will
            offer. LPs get AERO emissions, while veAERO lockers get the pool
            trading fees as an incentive to vote on the most productive pools.
          </p>
          <Link href="/" className="font-medium text-[14px] underline">
            Read More
          </Link>
        </div>
      </section>

      {/* FARMS LIST SECTION */}
      <section className="flex flex-col gap-4 text-white">
        <h3 className={`font-medium text-[28px] text-blue ${roboto.className}`}>
          LP Farms Available
        </h3>
        <span className="font-light text-[14px] text-[#3E3E3E]">
          Check all farms you can start earning yields on{" "}
          <span className="text-blue font-bold">#base</span>
        </span>

        {/* LIST */}
        {/* FILTERS */}
        <div className="flex flex-row justify-between items-center w-full mt-10">
          <div className="flex flex-row rounded-[8px] border border-[#2B3889]/10  text-[14px] w-[700px] gap-[1px] bg-blue/30 font-medium">
            {filters.map((item, index) => (
              <button
                onClick={() => setFilterSelected(index)}
                key={index}
                className={`
                  w-full p-2 px-4 transition-all
                  
                  ${
                    index === filterSelected
                      ? "bg-[#2F3B89] text-white hover:bg-[#2F3B89] hover:opacity-90"
                      : "bg-white text-[#2F3B89] hover:bg-[#2F3B89]/60 hover:text-white/70"
                  }
                  ${index === 0 && "rounded-l-[6px]"}
                  ${index === filters.length - 1 && "rounded-r-[6px]"}
                `}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Symbol or Address"
              className="w-[300px] bg-transparent border border-[#7479A3] p-2 px-4 text-slate-600 rounded-[8px] pl-12"
            />
            <Image
              src="/search.svg"
              width={24}
              height={24}
              alt="search"
              className="absolute top-2 left-2"
            />
          </div>
        </div>
        {/* LIST HEADER */}
        <div className="flex flex-row items-center justify-between w-full rounded-[8px] bg-[#2F3B89] p-3 px-8 text-[14px] font-bold text-neutral-200 text-right mb-[-12px]">
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
        {/* LIST ITEMS */}
        <div className="flex flex-col w-full">
          {farms.map((farm, index) => (
            <>
              {index > 0 && <div className="w-full h-[1px] bg-[#222D70]" />}
              <div
                className={`flex flex-col w-full bg-[#2F3B89] hover:bg-[#1F2964] py-8 text-[14px] text-right ${
                  index === 0 && "rounded-t-[8px]"
                } ${index === farms.length - 1 && "rounded-b-[8px]"}`}
              >
                <div className="flex flex-row w-full h-full items-center justify-between px-8">
                  <span className="w-[300px] text-left">{farm.pair}</span>
                  <span className="w-[50px]">{farm.apr}</span>
                  <span className="w-[100px]">{farm.tvl}</span>
                  <span className="w-[100px]">{farm.staked}</span>
                  <span className="w-[150px]">{farm.estimatedRewards}</span>
                  <span className="w-[150px]">{farm.claimedRewards}</span>
                  <span
                    className={`w-[100px] ${
                      farm.status === "OPEN" ? "text-green-500" : "text-red-200"
                    }`}
                  >
                    {farm.status}
                  </span>
                </div>
              </div>
            </>
          ))}
        </div>

        {/* border border-[#2B3889]/10  text-[14px] bg-blue/30 font-medium */}

        {/* PAGINATOR */}
        <div className="flex flex-row justify-between items-center mt-10 mb-20">
          <span className="text-[#2F3B89] font-medium text-[16px]">
            Showing 25 out of 58 pools...
          </span>
          <div className="flex flex-row items-center justify-between  text-[14px] font-medium border border-[#2F3B89]/30 rounded-[8px]">
            <button className="flex flex-row items-center justify-between gap-2 p-2 px-3 rounded-l-[8px] bg-white text-[#2F3B89] hover:bg-[#2F3B89] hover:text-white">
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
                    ? "bg-[#2F3B89] text-white hover:bg-[#2F3B89] hover:opacity-90"
                    : "bg-white text-[#2F3B89] hover:bg-[#2F3B89]/60 hover:text-white/70"
                }`}
              >
                {item}
              </button>
            ))}

            <button className="flex flex-row items-center justify-between gap-2 p-2 px-3 rounded-r-[8px] bg-white text-[#2F3B89] hover:bg-[#2F3B89] hover:text-white">
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
      </section>
    </main>
  );
}
