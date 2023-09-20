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
    title: "Bribe Master",
    description:
      "Tired of bribing massive amounts of your tokens each epoch with unpredictable emissions for your LP? You can bribe us directly and we will vote for your project over a longer time-frame (e.g 1 month ). This will reduce costs and uncertainty on your side.",
    bg: "bg-[#000D6C]",
  },
  {
    iconHref: "/check-circle.svg",
    title: "The Stable-X",
    description:
      "In cases of depeg we will help stabilize your token via votes and or even straight up buy it for arbitrage opportunities.",
    bg: "bg-blue",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Stablecoin Dashboard",
    description:
      "We want to provide more data on stablecoin prices and bring transparency.",
    bg: "bg-[#000D6C]",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Stable-X Fund",
    description:
      "We are happy to support projects within the stablecoin and lsdfi space by investing, advising, helping with marketing or even act as a launchpad.",
    bg: "bg-blue",
  },
];

const secondStage = [
  {
    iconHref: "/icon-blue-template.svg",
    title: "Referral Program",
    description:
      "We will develop a referral program for our loyal LP that bring new users in exchange for boosting their yields.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Bribe Streams",
    description:
      "We want to automate bribes by giving projects the opportunity to stream their bribes over a longer time-frame and skip the manual process of doing it weekly.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Multi one-click LP Zapper",
    description:
      "You want to buy various lp tokens and stake them but you are tired of doing it all manually? With our solution you can easily use only one token and receive all LP tokens you chose via our zapper.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-col w-full max-w-[1600px] px-[70px]">
      <section className="mt-[87px] mb-[78px] text-center">
        <div className="flex flex-col justify-center items-center gap-20">
          <p className="text-[#7479A3] font-medium text-sm mb-[-60px]">
            WELCOME TO STABLE-X
          </p>
          <p
            className={`text-[50px] text-[#090E34] leading-[66px] max-w-[560px] ${roboto.className}`}
          >
            The main liquidity booster for stable assets and{" "}
            <span className="text-[#7479A3]">lsdfi</span> exclusively on{" "}
            <span className="text-blue">Base</span> built on Aerodrome.
          </p>

          <div className="flex flex-col items-center gap-4 leading-[30px]">
            <Image src="/symbols.svg" width={355} height={237} alt="symbols" />
            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] font-medium mt-10">
              <span className="text-[#000D6C] font-bold">We incentivize</span>{" "}
              LPs on aerodrome through our token{" "}
              <span className="text-[#000D6C] font-bold">StableX</span> in the
              form of <span className="text-[#000D6C] font-bold">xStable</span>.
              can be staked for real yield, redeemed immediately for a discount
              or unlocked over 8 weeks.
            </p>

            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] mb-4 font-medium">
              <span className="text-[#000D6C] font-bold">Our revenue</span>{" "}
              comes from the lps staked on our dapp which are earning{" "}
              <span className="text-[#000D6C] font-bold">#aero</span> tokens.
              30% of these aero tokens go to Stable-X stakers while 70% is
              locked to increase the amount of veaero of the treasury. We use
              our veaero position to boost our ecosystem including voting for
              our own LP to attract liquidity.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center bg-gradient-to-r from-transparent via-blue/10 to-transparent px-[70px] border-b border-blue/[24%]">
        <div className="flex flex-col my-[78px] w-full">
          <h3
            className={`font-medium text-[28px] text-blue ${roboto.className}`}
          >
            Look what is coming...
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            We will also develop more services and products to fuel defi on{" "}
            <span className="text-blue font-bold">#base</span>
          </span>

          <div className="flex flex-row justify-between items-center mt-[55px]">
            {firstStage.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-[14px] w-[310px] h-[264px]"
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

      <section className="flex flex-col justify-center items-center mt-[100px] mb-[100px] px-[70px]">
        <div className="flex flex-col w-full">
          <h3
            className={`font-medium text-[28px] text-blue ${roboto.className}`}
          >
            Second Stage Development
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            See what we plan to keep building after our major features on{" "}
            <span className="text-blue font-bold">#base</span>
          </span>

          <div className="flex flex-row justify-between mt-[50px]">
            {secondStage.map((item, index) => (
              <div key={index} className="flex flex-col gap-[10px] w-[365px]">
                <div className="flex flex-row items-center gap-2 border-b border-blue/80 pb-[8px] px-[7.5px]">
                  <Image
                    src={item.iconHref}
                    width={25}
                    height={25}
                    alt={item.title}
                  />
                  <span
                    className={`font-medium text-blue text-[20px] ${roboto.className}`}
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
          <div className="flex gap-5 items-center mt-[100px]">
            <Image
              src="/symbols-small.svg"
              width={115}
              height={78}
              alt="join us"
            />
            <Link
              href="/"
              className={`font-light text-[35px] text-blue flex justify-center gap-3 hover:opacity-75 ${roboto.className}`}
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
