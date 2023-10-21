"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";
import { usdc, fusdt, piggy, finished } from "@/public/svg";

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
    staked: "1111100.20k",
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
    tvl: "200000.233k",
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
    <main className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-10 md:mt-[87px] mb-[38px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluez dark:text-aquaz ${roboto.className}`}
          >
            Farms Statistics
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E] dark:text-white">
            There are currently 34 active farms, with 20 stable and 14 volatile
            farms.
          </span>

          <div className="flex flex-col xl:flex-row items-center justify-between gap-[38px] mt-10 lg:mt-24">
            <div className="flex flex-col bg-gradient-to-br from-bluez/50 via-bluez/60 to-bluez w-full h-[400px] rounded-[8px] shadow-lg">
              <div className="flex flex-col text-white dark:text-white/80 p-8 border-b-2 dark:border-black">
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
            <div className="flex flex-col bg-gradient-to-br from-bluez/10 via-bluez/30 to-bluez/30 w-full h-[400px] rounded-[8px] shadow-lg">
              <div className="flex flex-col text-bluez dark:text-white/80 p-8 border-b-2 border-white dark:border-black/50">
                <span className="font-medium text-[28px]">YOUR REWARDS</span>
                <span className="font-black text-[42px]">12000.50k</span>
              </div>
              <div className="flex flex-col text-bluez dark:text-white p-8 gap-3 mt-3">
                {rightInfo.map((item, index) => (
                  <p key={index} className="flex items-center justify-between">
                    <span>{item.title}</span>
                    <span className="flex flex-1 border-b border-bluez dark:border-white border-dotted mx-2" />
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
            <div className="flex flex-col lg:flex-row justify-between items-center w-full px-4 pr-10 py-6 bg-bluez rounded-[8px] shadow-lg">
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

              <div
                className="
                  flex flex-row items-center justify-between flex-wrap text-[12px] border-t border-white/30 pt-[20px] mt-[20px] font-medium gap-3
                  md:text-[16px] lg:border-none lg:pt-0 lg:mt-0
                  lg:gap-10
                "
              >
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

            {/* DESKTOP FARMS LIST */}
            <div
              className={`hidden xl:grid lg:grid-cols-4 text-right mt-5 text-[16px] text-bluez dark:text-white ${roboto.className}`}
            >
              <div className="py-6 text-left ml-10">Pair</div>
              <div className="py-6">Farm Details</div>
              <div className="py-6">Earning</div>
              <div className="py-6"></div>

              {farms.map((farm, index) => (
                <>
                  <div
                    className={`${
                      index % 2 === 0
                        ? "bg-[#D4E1FD] border-blue-100 dark:bg-bluez/40 dark:border-bluez/40"
                        : "bg-[#FAFDFF] border-bluez/10 dark:bg-bluez/20 dark:border-bluez/30"
                    } border border-r-0 py-6 my-1 text-left flex items-center pl-10 rounded-l-[8px]`}
                  >
                    <div className="flex items-center">
                      <div className="w-[28px] z-10 drop-shadow-md">{usdc}</div>
                      <div className="w-[28px] ml-[-10px] drop-shadow-md">
                        {fusdt}
                      </div>
                      <span className="w-[138px] text-left ml-4">
                        {farm.pair}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${
                      index % 2 === 0
                        ? "bg-[#D4E1FD] border-blue-100 dark:bg-bluez/40 dark:border-bluez/40"
                        : "bg-[#FAFDFF] border-bluez/10 dark:bg-bluez/20 dark:border-bluez/30"
                    } border-b border-t py-6 my-1`}
                  >
                    <div className="flex flex-col gap-1">
                      <p>
                        <span
                          className={`mr-1 text-[12px]  ${
                            hover === index
                              ? "text-white/80"
                              : "text-neutral-500 dark:text-neutral-300"
                          }`}
                        >
                          APR:
                        </span>
                        {farm.apr}
                      </p>
                      <p>
                        <span
                          className={`mr-1 text-[12px]  ${
                            hover === index
                              ? "text-white/80"
                              : "text-neutral-500 dark:text-neutral-300"
                          }`}
                        >
                          TVL:
                        </span>
                        {farm.tvl}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`${
                      index % 2 === 0
                        ? "bg-[#D4E1FD] border-blue-100 dark:bg-bluez/40 dark:border-bluez/40"
                        : "bg-[#FAFDFF] border-bluez/10 dark:bg-bluez/20 dark:border-bluez/30"
                    } border-b border-t py-6 my-1`}
                  >
                    <div className="flex flex-col gap-1">
                      <p>
                        <span
                          className={`mr-1 text-[12px]  ${
                            hover === index
                              ? "text-white/80"
                              : "text-neutral-500 dark:text-neutral-300"
                          }`}
                        >
                          Staked:
                        </span>
                        {farm.staked}
                      </p>
                      <p>
                        <span
                          className={`mr-1 text-[12px]  ${
                            hover === index
                              ? "text-white/80"
                              : "text-neutral-500 dark:text-neutral-300"
                          }`}
                        >
                          Est. Rewards:
                        </span>
                        {farm.estimatedRewards}
                      </p>
                      <p>
                        <span
                          className={`mr-1 text-[12px]  ${
                            hover === index
                              ? "text-white/80"
                              : "text-neutral-500 dark:text-neutral-300"
                          }`}
                        >
                          Claimed:
                        </span>
                        {farm.claimedRewards}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`${
                      index % 2 === 0
                        ? "bg-[#D4E1FD] border-blue-100 dark:bg-bluez/40 dark:border-bluez/40"
                        : "bg-[#FAFDFF] border-bluez/10 dark:bg-bluez/20 dark:border-bluez/30"
                    } border border-l-0 flex flex-col justify-center items-end py-6 my-1 gap-2 pr-10 rounded-r-[8px]`}
                  >
                    {farm.status === "OPEN" ? (
                      <Link
                        href={`/earn/${index + 1}`}
                        className={`transition-all bg-bluez dark:bg-white xl:min-w-[100px] xl:max-w-[100px] h-[39px] flex justify-center items-center rounded-lg text-white dark:text-bluez text-[16px] font-medium hover:bg-white hover:text-bluez border hover:scale-[1.02] gap-3 ${roboto.className}`}
                      >
                        {piggy}
                        <span>Earn</span>
                      </Link>
                    ) : (
                      <span
                        className={`transition-all bg-red-500/20 xl:min-w-[100px] xl:max-w-[100px] h-[39px] flex justify-center items-center rounded-lg text-white dark:text-red-400 text-[16px] font-medium border dark:border-red-400 gap-3 ${roboto.className}`}
                      >
                        {finished}
                        {farm.status}
                      </span>
                    )}
                  </div>
                </>
              ))}
            </div>

            {/* MOBILE FARMS LIST */}
            <div
              className={`flex xl:hidden flex-col md:flex-row justify-center flex-wrap mt-5 text-[16px] md:text-[12px] text-bluez gap-3 ${roboto.className}`}
            >
              {farms.map((farm, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-start text-start w-full md:max-w-[250px] px-4 even:bg-[#D4E1FD] even:border-blue-100 odd:bg-[#FAFDFF] odd:border-bluez/10" border py-6 rounded-[8px]`}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-[28px] z-10 drop-shadow-md">{usdc}</div>
                    <div className="w-[28px] ml-[-10px] drop-shadow-md">
                      {fusdt}
                    </div>
                    <span className="ml-4">{farm.pair}</span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <p>
                      <span
                        className={`mr-1  ${
                          hover === index
                            ? "text-white/80"
                            : "text-neutral-500 dark:text-neutral-300"
                        }`}
                      >
                        APR:
                      </span>
                      {farm.apr}
                    </p>
                    <p>
                      <span
                        className={`mr-1  ${
                          hover === index
                            ? "text-white/80"
                            : "text-neutral-500 dark:text-neutral-300"
                        }`}
                      >
                        TVL:
                      </span>
                      {farm.tvl}
                    </p>

                    <p>
                      <span
                        className={`mr-1  ${
                          hover === index
                            ? "text-white/80"
                            : "text-neutral-500 dark:text-neutral-300"
                        }`}
                      >
                        Staked:
                      </span>
                      {farm.staked}
                    </p>
                    <p>
                      <span
                        className={`mr-1  ${
                          hover === index
                            ? "text-white/80"
                            : "text-neutral-500 dark:text-neutral-300"
                        }`}
                      >
                        Est. Rewards:
                      </span>
                      {farm.estimatedRewards}
                    </p>
                    <p>
                      <span
                        className={`mr-1  ${
                          hover === index
                            ? "text-white/80"
                            : "text-neutral-500 dark:text-neutral-300"
                        }`}
                      >
                        Claimed:
                      </span>
                      {farm.claimedRewards}
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-end mt-4 gap-2 w-full">
                    {farm.status === "OPEN" ? (
                      <Link
                        href={`/earn/${index + 1}`}
                        className={`transition-all bg-bluez w-full xl:min-w-[100px] xl:max-w-[100px] h-[39px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium hover:bg-white hover:text-bluez border hover:scale-[1.02] gap-3 ${roboto.className}`}
                      >
                        {piggy}
                        <span>Earn</span>
                      </Link>
                    ) : (
                      <span
                        className={`transition-all bg-red-500/20 w-full xl:min-w-[100px] xl:max-w-[100px] h-[39px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium border gap-3 ${roboto.className}`}
                      >
                        {finished}
                        Ended
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAGINATOR */}
          <div className="flex flex-col md:flex-row justify-between items-center px-2 my-10 gap-4 md:gap-0">
            <span className="text-black dark:text-aquaz font-light text-[14px]">
              Showing 25 out of 58 pools...
            </span>
            <div className="flex flex-row items-center justify-between  text-[14px] font-medium border border-[#2F3B89]/30 rounded-[8px]">
              <button className="flex flex-row items-center justify-between gap-2 p-2 px-3 rounded-l-[8px] bg-white dark text-[#2F3B89] hover:bg-bluez hover:text-white">
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
                      ? "bg-bluez text-white hover:bg-bluez hover:opacity-90"
                      : "bg-white text-[#2F3B89] hover:bg-bluez/60 hover:text-white/70"
                  }`}
                >
                  {item}
                </button>
              ))}

              <button className="flex flex-row items-center justify-between gap-2 p-2 px-3 rounded-r-[8px] bg-white text-[#2F3B89] hover:bg-bluez hover:text-white">
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
