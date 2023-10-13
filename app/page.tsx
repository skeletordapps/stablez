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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bg: "bg-[#000D6C]",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Protocol Integrations",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bg: "bg-bluex",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Audit",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bg: "bg-[#000D6C]",
  },
  {
    iconHref: "/check-circle.svg",
    title: "Stable-X Staking",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bg: "bg-bluex",
  },
];

const secondStage = [
  {
    iconHref: "/icon-blue-template.svg",
    title: "Referral System",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Governance Launch",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Bribes for Stakers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    iconHref: "/icon-blue-template.svg",
    title: "Chain Expansion",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc bibendum interdum dui at mattis. Cras ut nulla suscipit nisi elementum auctor id pellentesque tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
            The leading yield booster for stable and{" "}
            <span className="text-[#7479A3]">LSDFI</span> assets built
            exclusively for <span className="text-bluex">Base</span>.
          </p>

          <div className="flex flex-col items-center gap-4 leading-[30px]">
            <Image src="/symbols.svg" width={355} height={237} alt="symbols" />
            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] font-medium mt-10">
              LPs are incentivized to engage with our ecosystem through the
              utilization of our proprietary token -{" "}
              <span className="text-[#000D6C] font-bold">Stable-X</span> - as a
              valuable incentive. Stake Stable-X and get access to lucrative
              yield opportunities.
            </p>

            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] mb-4 font-medium">
              Protocol Revenue stems from liquidity mining incentives generated
              from our partner pools. 30% of this revenue is used to reward
              Stable-X stakers, with the remaining 70% strategically allocated
              to enhance our governance holdings within partner protocols.
            </p>

            <p className="text-[#3E3E3E] text-[16px] max-w-[700px] mb-4 font-medium">
              The <span className="text-[#000D6C] font-bold">Stable-X DAO</span>{" "}
              undertakes governance decisions and benefits from a share of the
              value accruals therein.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center bg-gradient-to-r from-transparent via-bluex/10 to-transparent xl:px-[70px] border-b border-bluex/[24%]">
        <div className="flex flex-col my-[78px] w-full">
          <h3
            className={`font-medium text-[28px] text-bluex ${roboto.className}`}
          >
            Look what is coming...
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            We will also develop more services and products to fuel defi on{" "}
            <span className="text-bluex font-bold">#base</span>
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

      <section className="flex flex-col justify-center items-center mt-[100px] mb-[100px] xl:px-[70px]">
        <div className="flex flex-col w-full">
          <h3
            className={`font-medium text-[28px] text-bluex ${roboto.className}`}
          >
            Second Stage Development
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            See what we plan to keep building after our major features on{" "}
            <span className="text-bluex font-bold">#base</span>
          </span>

          <div className="flex flex-col xl:flex-row justify-between mt-[50px] gap-[34px]">
            {secondStage.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-[10px] xl:w-[365px]"
              >
                <div className="flex flex-row items-center gap-2 border-b border-bluex/80 pb-[8px] px-[7.5px]">
                  <Image
                    src={item.iconHref}
                    width={25}
                    height={25}
                    alt={item.title}
                  />
                  <span
                    className={`font-medium text-bluex text-[20px] ${roboto.className}`}
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
              className={`font-light text-[35px] text-bluex flex justify-center gap-3 hover:opacity-75 ${roboto.className}`}
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
