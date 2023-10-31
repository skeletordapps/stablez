"use client";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import { useState, useContext } from "react";
import { stablez, stablezDark } from "@/public/svg";
import { Popover } from "@headlessui/react";
import { ChevronUpIcon, ArrowUpCircleIcon } from "@heroicons/react/20/solid";

import { StateContext, Theme } from "../context/StateContext";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const tabs = ["Lock", "Redeem", "Rewards", "DAO Votes"];
const buttonLabelByTabSelected = [
  "Lock $StableZ and receive $STR",
  "Initiate a notice to withdraw after 7 days",
  "Claim Rewards",
];

export default function Lock() {
  const [tab, setTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const { theme } = useContext(StateContext);

  const onInputChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setInputValue(value);
    }

    return false;
  };
  return (
    <main className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-10 md:mt-[87px] mb-[38px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluez dark:text-aquaz ${roboto.className}`}
          >
            Lock $StableZ
          </h3>
          <p className="font-light text-[14px] text-[#3E3E3E] dark:text-white">
            Lock{" "}
            <span className="text-bluez dark:text-aquaz font-medium">$STZ</span>
            , recieve{" "}
            <span className="text-black dark:text-blue-300 font-medium">
              $STR
            </span>
            , and get access to revenue sharing, and other utilities.
          </p>

          <div className="flex justify-center items-center font-medium text-[13px] pt-[60px] text-bluez dark:text-white/80 flex-wrap gap-10 max-w-[600px] self-center">
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md">
              <span className="font-medium text-[12px] lg:text-[20px]">
                PRICE
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                $1.00
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md">
              <span className="font-medium text-[12px] lg:text-[20px]">
                APR
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                130%
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md">
              <span className="font-medium text-[12px] lg:text-[20px]">
                CIRCULATING $STZ
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                12,000.00
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md">
              <span className="font-medium text-[12px] lg:text-[20px]">
                IN WALLET
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                1,000.00
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md">
              <span className="font-medium text-[12px] lg:text-[20px]">
                LOCKED $STZ
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                6,000.00
              </span>
            </div>
          </div>

          <div className="flex flex-col self-center bg-white/70 dark:bg-bluez/40 border border-bluez/30 w-full max-w-[600px] rounded-[8px] shadow-lg mt-[70px] md:mt-[130px] relative">
            <div className="flex flex-col w-full">
              <div
                className={`flex items-center w-full text-bluez dark:text-white font-medium px-4 md:px-8 pt-7 md:pt-10 justify-between ${roboto.className}`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-bluez/10 dark:bg-aquaz/20 border border-bluez dark:border-aquaz/50">
                    <div className="w-[28px]">
                      {theme === Theme.light ? stablez : stablezDark}
                    </div>
                  </div>
                  <span className="ml-3 text-[28px]">$StableZ</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-8 px-4 md:px-8 mt-10 gap-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-between items-center gap-1">
                  {tabs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setTab(index)}
                      className={`transition-all  w-16 h-[29px] flex justify-center items-center rounded-lg text-white text-[12px] font-medium hover:bg-opacity-75 ${
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
                  } ${tab === 2 || tab === 3 ? "hidden" : "block"}`}
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

              {tab === 3 ? (
                <div className="flex flex-col gap-2 font-light text-[14px] text-[#3E3E3E] text-left pl-2 py-[9px] pt-[12px]">
                  <p className="pb-[94px] font-semibold">
                    There are no DAO Votes ongoing.
                  </p>
                </div>
              ) : tab === 2 ? (
                <div className="flex gap-4 font-light text-[14px] text-[#3E3E3E] dark:text-white text-left px-1 py-[13.5px]">
                  <div className="flex items-center justify-between gap-1 py-[6px] px-3 bg-bluez rounded-full text-white font-semibold transition-all hover:bg-opacity-75 z-20 border border-bluez/40">
                    <Popover className="relative">
                      <Popover.Button>
                        <p className="flex items-center gap-2">
                          <span>
                            {Number(0.02333).toLocaleString("en-us", {
                              maximumFractionDigits: 4,
                            })}
                          </span>

                          <Image
                            src="/weth.svg"
                            width={30}
                            height={20}
                            alt="weth"
                          />
                        </p>
                      </Popover.Button>

                      <Popover.Panel className="absolute top-[-140px] left-0 z-10 bg-bluez dark:bg-aquaz w-[200px] p-4 rounded-[8px] border border-white  shadow-xl shadow-black/30">
                        <div className="text-center text-white dark:text-black relative">
                          <div className="absolute bottom-[-33px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-white" />
                          <div className="absolute bottom-[-32px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-bluez dark:border-t-aquaz" />
                          <p>
                            Loren Ipsum Dolor Sit Amet Loren Ipsum Dolor Sit
                            Amet Loren Ipsum Dolor Sit Amet
                          </p>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>
                  </div>
                  <div className="flex items-center justify-between gap-1 py-[6px] px-3 bg-sky-400 rounded-full text-white font-semibold transition-all hover:bg-opacity-75 z-20 border border-aquaz">
                    <Popover className="relative">
                      <Popover.Button>
                        <p className="flex items-center gap-2">
                          <span>
                            {Number(0.02333).toLocaleString("en-us", {
                              maximumFractionDigits: 4,
                            })}
                          </span>

                          <Image
                            src="/weth.svg"
                            width={30}
                            height={30}
                            alt="weth"
                          />
                        </p>
                      </Popover.Button>

                      <Popover.Panel className="absolute top-[-140px] left-0 z-10 bg-bluez dark:bg-aquaz w-[200px] p-4 rounded-[8px] border border-white  shadow-xl shadow-black/30">
                        <div className="text-center text-white dark:text-black relative">
                          <div className="absolute bottom-[-33px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-white" />
                          <div className="absolute bottom-[-32px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-bluez dark:border-t-aquaz" />
                          <p>
                            Loren Ipsum Dolor Sit Amet Loren Ipsum Dolor Sit
                            Amet Loren Ipsum Dolor Sit Amet
                          </p>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>
                  </div>
                  <div className="flex items-center justify-between gap-1 py-[6px] px-3 bg-purple-400 rounded-full text-white font-semibold transition-all hover:bg-opacity-75 z-20 border border-purple-200">
                    <Popover className="relative">
                      <Popover.Button>
                        <p className="flex items-center gap-2">
                          <span>
                            {Number(0.02333).toLocaleString("en-us", {
                              maximumFractionDigits: 4,
                            })}
                          </span>

                          <Image
                            src="/weth.svg"
                            width={30}
                            height={20}
                            alt="weth"
                          />
                        </p>
                      </Popover.Button>

                      <Popover.Panel className="absolute top-[-140px] left-0 z-10 bg-bluez dark:bg-aquaz w-[200px] p-4 rounded-[8px] border border-white  shadow-xl shadow-black/30">
                        <div className="text-center text-white dark:text-black relative">
                          <div className="absolute bottom-[-33px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-white" />
                          <div className="absolute bottom-[-32px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-bluez dark:border-t-aquaz" />
                          <p>
                            Loren Ipsum Dolor Sit Amet Loren Ipsum Dolor Sit
                            Amet Loren Ipsum Dolor Sit Amet
                          </p>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter the amount"
                    className="w-full bg-transparent border border-slate-600 dark:border-white placeholder-slate-600 dark:placeholder-white p-6 text-black dark:text-white rounded-[8px] text-[14px]"
                    onChange={(e) => onInputChange(e.target.value)}
                    value={inputValue}
                  />
                  <div className="flex items-center absolute top-[25px] right-4">
                    <div className="w-[22px]">
                      {theme === Theme.light ? stablez : stablezDark}
                    </div>

                    <span className="ml-2 text-[14px text-bluez dark:text-aquaz">
                      StableZ
                    </span>
                  </div>
                </div>
              )}

              <button
                className={`${
                  tab === 3 ? "hidden" : "flex"
                } transition-all bg-bluez dark:bg-white w-full h-[49px]  justify-center items-center rounded-lg text-white dark:text-bluez text-[16px] font-medium hover:bg-opacity-75 dark:hover:bg-blue-100 ${
                  roboto.className
                }`}
              >
                {buttonLabelByTabSelected[tab]}
              </button>
            </div>
            <Image
              src="/mascout.svg"
              width={217}
              height={251.36}
              alt="mascout"
              className="absolute top-[-70px] right-[-15px] md:right-[-25px] drop-shadow-xl w-[117px] h-[151.36px] md:w-[217px] md:h-[251.36px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
