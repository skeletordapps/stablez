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
            Users are advised to adhere to the attached legal disclaimer at
            their own peril.
          </span>
        </div>

        <div
          className={`flex flex-col justify-center items-center gap-14 bg-bluez text-white p-14 shadow-xl font-medium max-w-[1100px] text-lg border border-[#00EAFF]/50 ${roboto.className}`}
        >
          <div>
            <p className="text-[#00EAFF] text-xl">
              1 - Financial and Investment Advice
            </p>
            The information provided on this website does not constitute any
            financial advice, investment advice, trading, or any other form of
            advice. The contents of this website serve as a public good and
            should not be relied upon for making financial decisions. Users
            interact with the website at their own risk and peril, and assume
            full responsibility for any financial losses incurred. StableZ is
            not a proprietary token and does not entitle its holder any
            ownership, guarantee of profits, or returns.
          </div>
          <div>
            <p className="text-[#00EAFF] text-xl">2 - Tax Obligations</p> Users
            are solely responsible for complying with relevant tax authorities
            and meeting any tax obligations applicable to their respective
            jurisdictions. The contributors to this website shall not be held
            liable for determining taxes related to users' transactions.
          </div>
          <div>
            <p className="text-[#00EAFF] text-xl">
              3 - No Warranties or Promised Returns
            </p>
            This website makes no warranties, guarantees, or promises of any
            kind, including but not limited to investment returns or
            profitability. The website's functionality is subject to change and
            may be amended at the contributors' discretion without prior notice.
          </div>
          <div>
            <p className="text-[#00EAFF] text-xl">4 - Bugs and Security</p> The
            website is not guaranteed to be immune from bugs, technical issues,
            or security vulnerabilities. Users assume all risks associated with
            using the website, and the contributors shall not be liable for any
            losses resulting from such issues.
          </div>
          <div className="text-white pt-10 border-t border-white text-xl">
            By accessing and using this website, you agree to release the
            contributors from any and all liabilities, claims, damages, losses,
            or expenses arising from or related to your use of the website. The
            user alone shall be liable for any losses and the contributors will
            be relieved from any such liabilities.
          </div>
        </div>
      </div>
    </main>
  );
}
