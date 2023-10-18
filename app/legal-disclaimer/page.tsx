import Image from "next/image";
import Link from "next/link";
import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default function LegalDisclaimer() {
  return (
    <main className="flex flex-col w-full max-w-[1600px] px-4 md:px-[70px]">
      <div className="flex flex-col justify-center items-center gap-10 py-14">
        <div className="flex flex-col justify-center items-center">
          <h3
            className={`font-medium text-[28px] text-bluez ${roboto.className}`}
          >
            Legal Disclaimer
          </h3>
          <span className="font-light text-[14px] text-[#3E3E3E]">
            Read it carefully
          </span>
        </div>

        <div
          className={`flex flex-col justify-center items-center gap-10 bg-bluez/20 text-black/80 p-10 rounded-[8px] shadow-xl font-medium max-w-[900px] border border-bluez/30 ${roboto.className}`}
        >
          <p>
            <span className="text-black">
              1 - Financial and Investment Advice:
            </span>{" "}
            The information provided on this website does not constitute any
            financial advice, investment advice, trading, or any other form of
            advice. The contents of this website serve as a public good and
            should not be relied upon for making financial decisions. Users
            interact with the website at their own risk and peril, and assume
            full responsibility for any financial losses incurred. StableZ is
            not a proprietary token and does not entitle its holder any
            ownership, guarantee of profits, or returns.
          </p>
          <p>
            <span className="text-black">2 - Tax Obligations:</span> Users are
            solely responsible for complying with relevant tax authorities and
            meeting any tax obligations applicable to their respective
            jurisdictions. The contributors to this website shall not be held
            liable for determining taxes related to users' transactions.
          </p>
          <p>
            <span className="text-black">3 - No Warranties or</span> Promised
            Returns: This website makes no warranties, guarantees, or promises
            of any kind, including but not limited to investment returns or
            profitability. The website's functionality is subject to change and
            may be amended at the contributors' discretion without prior notice.
          </p>
          <p>
            <span className="text-black">4 - Bugs and Security</span>: The
            website is not guaranteed to be immune from bugs, technical issues,
            or security vulnerabilities. Users assume all risks associated with
            using the website, and the contributors shall not be liable for any
            losses resulting from such issues.
          </p>
          <p className="text-black pt-5 border-t border-bluez/30">
            By accessing and using this website, you agree to release the
            contributors from any and all liabilities, claims, damages, losses,
            or expenses arising from or related to your use of the website. The
            user alone shall be liable for any losses and the contributors will
            be relieved from any such liabilities.
          </p>
        </div>
      </div>
    </main>
  );
}
