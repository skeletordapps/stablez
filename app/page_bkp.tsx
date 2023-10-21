"use client";
import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const firstStage = [
  {
    iconHref: "/check-circle.svg",
    title: "Yield Booster",
    description:
      "Multiplying your yields through the power of the ve 3.3 flywheel. Users earn our governance token, $STABLEZ, in exchange for their LPs, which are staked on a partner DEX. The tokens earned from our partner DEX are maximally locked and utilized to chase incentives, thereby boosting the underlying yield.",
    bg: "bg-[#000D6C]",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Protocol Integrations",
    description:
      "The StableZ protocol shall integrate the most prominent protocols across the ecosystem and shall establish mutual partnerships.",
    bg: "bg-bluez",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Security",
    description:
      "StableZ shall commence an Immunefi bounty program following the conclusion of its Public Sale, incentivizing white-hat developers to rigorously test the code in exchange for a bounty. The vulnerabilities will be categorized into three tiers: critical, medium, and low risk.",
    bg: "bg-[#000D6C]",
  },
  {
    iconHref: "/check-circle.svg",
    title: "StableZ Locking",
    description:
      "$STABLEZ has minimal locks and can be redeemed after just 1 week, recieving $STR as proof of deposits. Locked holders are entitled to governance rights, a share of its passive income, LP rewards, and direct influence over protocol-centric decisions.",
    bg: "bg-bluez",
  },
];

const secondStage = [
  {
    iconHref: "/icon-blue-template.svg",
    title: "Referral System",
    description:
      "Fellow StableZers join a rallying cry for for others to join the StableZ ecosystem - earning up to 10% of their referral's yield.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Governance Launch",
    description:
      "Weekly snapshot.org votes will be held to determine the governance votes for StableZ protocol's holdings, and the cumulative voting incentives will be distributed among the pool of holders.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "The Governance SuperWars",
    description:
      "Once StableZ accumulates a substantial amount of governance holdings, protocols may participate in the Bribe Wars, during which external protocols will provide incentives to obtain votes in favor of their respective gauge pools.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Chain Expansion",
    description:
      "StableZ may deploy to other chains, subject to a DAO approval.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1600px] px-4 md:px-[70px]">
      <section className="mt-[87px] mb-[78px] text-center">
        <div className="flex flex-col justify-center items-center gap-20">
          <p className="text-[#7479A3] font-medium text-sm mb-[-60px]">
            WELCOME TO STABLEZ
          </p>
          <p
            className={`text-[50px] text-[#090E34] leading-[56px] md:leading-[66px] max-w-[560px] ${roboto.className}`}
          >
            The leading yield booster for stable and{" "}
            <span className="text-[#7479A3]">LSDFI</span> assets built
            exclusively for <span className="text-bluez">Base</span>.
          </p>

          <div className="flex flex-col items-center gap-4 leading-[30px]">
            <Image src="/symbols.svg" width={355} height={237} alt="symbols" />
            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] font-medium mt-10">
              LPs are incentivized to engage with our ecosystem through the
              utilization of our governance token -{" "}
              <span className="text-[#000D6C] font-bold">StableZ</span> - as a
              valuable incentive. Lock StableZ and get access to voting rights
              on partner DEXes, LP revenue, and more!
            </p>

            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] mb-4 font-medium">
              Protocol Revenue stems from liquidity mining incentives generated
              from our partner pools. 30% of this revenue is used to reward
              StableZ stakers, with the remaining 70% strategically allocated to
              enhance our governance holdings within partner protocols.
            </p>

            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] mb-4 font-medium">
              The <span className="text-[#000D6C] font-bold">StableZ DAO</span>{" "}
              undertakes governance decisions and benefits from a share of the
              value accruals therein.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center bg-gradient-to-r from-transparent via-bluez/10 to-transparent xl:px-[70px] border-b border-bluez/[24%]">
        <div className="flex flex-col my-[48px] md:my-[78px] w-full">
          <h3
            className={`font-medium text-[28px] text-bluez ${roboto.className}`}
          >
            What we have in store
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            We plan on delivering a complete suite of DeFi products to fuel our
            growth on <span className="text-bluez font-bold">#base</span>
          </span>

          <div className="flex flex-col xl:flex-row xl:justify-between items-center mt-[55px] gap-5">
            {firstStage.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-[14px] w-full xl:w-[310px] xl:h-[264px]"
              >
                <div
                  className={`flex flex-row pl-6 items-center gap-3 h-[78px] rounded-[8px] px-[15px] ${item.bg}`}
                >
                  <Image
                    src={item.iconHref}
                    width={25}
                    height={25}
                    alt={item.title}
                    className="mb-[2px]"
                  />
                  <span
                    className={`font-medium text-white text-[20px] ${roboto.className}`}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-[14px] text-[#000D6C] px-[5px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="flex flex-col justify-center items-center mt-[50px] md:mt-[100px] mb-[100px] xl:px-[70px]">
        <div className="flex flex-col w-full">
          <h3
            className={`font-medium text-[28px] text-bluez ${roboto.className}`}
          >
            Second Stage Development
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            See what we plan to keep building after our major features on{" "}
            <span className="text-bluez font-bold">#base</span>
          </span>

          <div className="flex flex-col xl:flex-row justify-between mt-[50px] gap-[34px]">
            {secondStage.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-[10px] xl:w-[365px]"
              >
                <div className="flex flex-row items-center gap-2 border-b border-bluez/80 pb-[8px] px-[7.5px]">
                  <Image
                    src={item.iconHref}
                    width={25}
                    height={25}
                    alt={item.title}
                  />
                  <span
                    className={`font-medium text-bluez text-[20px] ${roboto.className}`}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="font-light text-[14px] text-[#000D6C] px-[7.5px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* JOIN US */}
          <div className="flex gap-5 items-center mt-[50px] md:mt-[100px]">
            <Image
              src="/symbols-small.svg"
              width={115}
              height={78}
              alt="join us"
            />
            <Link
              href="/"
              className={`font-light text-[35px] text-bluez flex justify-center gap-3 hover:opacity-75 ${roboto.className}`}
            >
              <span className="mt-1">JOIN US</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
