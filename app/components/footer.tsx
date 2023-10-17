import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";
import { routes, socials } from "@/consts";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <main className="flex flex-col pt-[60px] xl:pt-[100px] pb-[60px] justify-center items-center w-full bg-bluex">
      <div className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[70px] gap-4">
        <div className="flex flex-row justify-between items-center border-b border-white pb-[20px] w-full px-[10px] text-white">
          <div className="flex flex-row items-center gap-5">
            <Link href={routes[0].href} className="hover:opacity-75">
              {routes[0].title}
            </Link>
            <Link href={routes[1].href} className="hover:opacity-75">
              {routes[1].title}
            </Link>
            <Link href={routes[2].href} className="hover:opacity-75">
              {routes[2].title}
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
            <Link href={routes[1].href} className="hover:opacity-75">
              {routes[3].title}
            </Link>
          </div>
          <div className="flex flex-row items-center gap-4">
            {socials.map((item, index) => (
              <Link key={index} href={item.href} className="hover:opacity-75">
                {item.icon}
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
