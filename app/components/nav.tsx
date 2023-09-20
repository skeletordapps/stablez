import Image from "next/image";
import { Inter, Roboto_Condensed } from "next/font/google";
import { routes } from "@/consts";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });
const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});
export default function Nav() {
  return (
    <main className="flex w-full max-w-[1600px] px-[70px]">
      <div
        className={`flex items-center justify-between w-full py-[20px] px-[10px] border-b border-blue/[24%] ${roboto.className}`}
      >
        <Image src="/type-logo2.svg" width={209.5} height={26} alt="logo" />
        <div className="flex items-center justify-center w-full">
          <div className="text-slate-600 flex items-center gap-14 text-[16px]">
            {routes.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="transition-all hover:text-blue hover:border-b border-blue"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
        <button
          className={`bg-blue min-w-[140px] ml-[57.5px] h-[39px] flex justify-center items-center rounded-lg text-white text-[16px] font-medium ${roboto.className}`}
        >
          Connect Wallet
        </button>
      </div>
    </main>
  );
}
