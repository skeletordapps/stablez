import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { ROUTES, SOCIALS } from "@/app/utils/consts";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <main className="flex flex-col pt-[60px] xl:pt-[100px] pb-[60px] justify-center items-center w-full bg-bluez dark:bg-bluez/30">
      <div className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[70px] gap-4">
        <div className="flex flex-row justify-between items-center border-b border-white pb-[20px] w-full px-[10px] text-white">
          <div className="flex flex-row items-center gap-5">
            <Link href={ROUTES[0].href} className="hover:opacity-75">
              {ROUTES[0].title}
            </Link>
            <Link href={ROUTES[1].href} className="hover:opacity-75">
              {ROUTES[1].title}
            </Link>
            <Link href={ROUTES[2].href} className="hover:opacity-75">
              {ROUTES[2].title}
            </Link>
          </div>
          {/* <div className="flex flex-row items-center gap-2">
            <Link href="/" className="hover:opacity-75">
              <Image
                src="/icon-template.svg"
                width={25}
                height={25}
                alt="social"
                className="mb-[2px]"
              />
            </Link>
          </div> */}
        </div>
        <div className="flex flex-row justify-between items-center w-full px-[10px] text-white ">
          <div className="flex flex-row items-center gap-5">
            <Link href={ROUTES[1].href} className="hover:opacity-75">
              {ROUTES[3].title}
            </Link>
          </div>
          <div className="flex flex-row items-center gap-4">
            {SOCIALS.map((item, index) => (
              <Link key={index} href={item.href} className="hover:opacity-75">
                <Image
                  src={item.src}
                  width={
                    item.title === "Twitter-X"
                      ? 16
                      : item.title === "Telegram"
                      ? 18
                      : 20
                  }
                  height={
                    item.title === "Twitter-X"
                      ? 16
                      : item.title === "Telegram"
                      ? 18
                      : 20
                  }
                  alt={item.title}
                />
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col xl:flex-row justify-between items-center w-full px-[10px] mt-[100px] text-[14px] gap-2 xl:gap-0">
          <span className={`text-white tracking-[3px] ${roboto.className}`}>
            2023 © StableZ Finance
          </span>
          <Link
            href="/legal-disclaimer"
            className="text-white border-b hover:opacity-75"
          >
            Legal Disclaimer
          </Link>
        </div>
      </div>
    </main>
  );
}
