import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <main className="flex flex-col pt-[100px] pb-[60px] justify-center items-center w-full bg-blue">
      <div className="flex flex-col w-full max-w-[1600px] px-[70px] gap-4">
        <div className="flex flex-row justify-between items-center border-b border-white pb-[20px] w-full px-[10px] text-white">
          <div className="flex flex-row items-center gap-5">
            <Link href="/" className="hover:opacity-75">
              Articles
            </Link>
            <Link href="/" className="hover:opacity-75">
              Articles
            </Link>
            <Link href="/" className="hover:opacity-75">
              Articles
            </Link>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href="/" className="hover:opacity-75">
              <Image
                src="/icon-template.svg"
                width={25}
                height={25}
                alt="social"
                className="mb-[2px]"
              />
            </Link>
            <Link href="/" className="hover:opacity-75">
              <Image
                src="/icon-template.svg"
                width={25}
                height={25}
                alt="social"
                className="mb-[2px]"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full px-[10px] text-white">
          <div className="flex flex-row items-center gap-5">
            <Link href="/" className="hover:opacity-75">
              Articles
            </Link>
            <Link href="/" className="hover:opacity-75">
              Articles
            </Link>
            <Link href="/" className="hover:opacity-75">
              Articles
            </Link>
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link href="/" className="hover:opacity-75">
              <Image
                src="/icon-template.svg"
                width={25}
                height={25}
                alt="social"
                className="mb-[2px]"
              />
            </Link>
            <Link href="/" className="hover:opacity-75">
              <Image
                src="/icon-template.svg"
                width={25}
                height={25}
                alt="social"
                className="mb-[2px]"
              />
            </Link>
            <Link href="/" className="hover:opacity-75">
              <Image
                src="/icon-template.svg"
                width={25}
                height={25}
                alt="social"
                className="mb-[2px]"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center w-full px-[10px] mt-[100px] text-[14px]">
          <span className={`text-white tracking-[3px] ${roboto.className}`}>
            2023 © Stable-X Finance
          </span>
          <Link href="/" className="text-white border-b hover:opacity-75">
            Legal Disclaimer
          </Link>
        </div>
      </div>
    </main>
  );
}
