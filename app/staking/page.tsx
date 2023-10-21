"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { useState } from "react";
import { usdc, fusdt, piggy, finished, stablez } from "@/public/svg";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const tabs = ["Stake", "Unstake", "Rewards"];

export default function Staking() {
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
    <main className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-10 md:mt-[87px] mb-[38px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluez ${roboto.className}`}
          >
            Staking
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            Stake your $StableZ to Earn Rewards.
          </span>

          <div className="flex justify-center items-center font-medium text-[13px] pt-[60px]">
            <div className="flex flex-col text-bluez w-[200px] md:w-[220px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                PRICE
              </span>
              <span className="font-black text-[16px] md:text-[24px]">
                12000.50k
              </span>
            </div>
            <div className="flex flex-col text-bluez w-[200px] md:w-[220px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                APR
              </span>
              <span className="font-black text-[16px] md:text-[24px]">
                12000.50k
              </span>
            </div>
            <div className="flex flex-col text-bluez w-[200px] md:w-[220px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                C. SUPPLY
              </span>
              <span className="font-black text-[16px] md:text-[24px]">
                12000.50k
              </span>
            </div>
          </div>
          <div className="flex justify-center items-center font-medium text-[13px] pt-[20px] md:pt-[40px]">
            <div className="flex flex-col text-bluez w-[200px] md:w-[220px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                STAKED
              </span>
              <span className="font-black text-[16px] md:text-[24px]">
                12000.50k
              </span>
            </div>
            <div className="flex flex-col text-bluez w-[200px] md:w-[220px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                WALLET
              </span>
              <span className="font-black text-[16px] md:text-[24px]">
                12000.50k
              </span>
            </div>
            <div className="flex flex-col text-bluez w-[200px] md:w-[220px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                TOTAL STAKED
              </span>
              <span className="font-black text-[16px] md:text-[24px]">
                12000.50k
              </span>
            </div>
          </div>

          <div className="flex flex-col self-center bg-white/70 border border-bluez/30 w-full max-w-[600px] rounded-[8px] shadow-lg mt-[70px] md:mt-[130px] relative">
            <div className="flex flex-col w-full">
              <div
                className={`flex items-center w-full text-bluez font-medium px-4 md:px-8 pt-7 md:pt-10 justify-between ${roboto.className}`}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-bluez/10 border border-bluez">
                    <div className="w-[28px]">{stablez}</div>
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
                      className={`transition-all  w-16 h-[29px] flex justify-center items-center rounded-lg text-white text-[12px] font-medium hover:scale-[1.02] ${
                        roboto.className
                      } ${tab === index ? "bg-bluez" : "bg-bluez/20"}`}
                    >
                      {tabs[index]}
                    </button>
                  ))}
                </div>
                <p
                  className={`text-end font-light text-[14px] mb-[-26px] pr-1 text-slate-500 ${
                    roboto.className
                  } ${tab === 2 ? "hidden" : "block"}`}
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
              </div>

              {tab !== 2 ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter the amount"
                    className="w-full bg-transparent border border-slate-600 placeholder-slate-600 p-6 text-black rounded-[8px] text-[14px]"
                    onChange={(e) => onInputChange(e.target.value)}
                    value={inputValue}
                  />
                  <div className="flex items-center absolute top-[25px] right-4">
                    <div className="w-[22px]">{stablez}</div>

                    <span className="ml-2 text-[14px text-bluez">StableZ</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2 font-light text-[14px] text-[#3E3E3E] text-left pl-2 py-[9px] pt-[12px]">
                  <p>
                    Weth Accumulated:{" "}
                    <span className="text-green-700">
                      {Number(0.02333).toLocaleString("en-us", {
                        maximumFractionDigits: 4,
                      })}
                    </span>
                  </p>
                  <p>
                    Anytoken Accumulated:{" "}
                    <span className="text-green-700">
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
                {tab === 1
                  ? "Make a request to Withdraw in 7 days"
                  : tab === 2
                  ? "Claim Rewards"
                  : tabs[tab] + " $StableZ"}
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
