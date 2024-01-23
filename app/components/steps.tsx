import { ArrowPathIcon } from "@heroicons/react/24/solid";

export type StepsType = {
  title: string;
  options: { title: string; complete: boolean; amount?: string }[];
  redeemAmount?: string;
};

export type StepsButtons = {
  buttonTitle?: string;
  buttonAction?: () => void;
};

export default function Steps({
  title,
  options,
  buttonTitle,
  buttonAction,
}: StepsType & StepsButtons) {
  return (
    <main className="w-full">
      <div className="text-left w-full">
        <p className="text-bluez dark:text-white pb-3 border-b border-bluez/40 dark:border-white/40">
          {title}
        </p>
        <div className="flex flex-col mt-10">
          {options.map((item, index) => (
            <div key={index} className="flex flex-col">
              {index !== 0 && (
                <div
                  className={`h-10 w-[2px] ml-[19px] shadow-lg ${
                    item.complete ? "bg-bluez" : "bg-white"
                  }`}
                />
              )}

              <div className="flex items-center gap-3 relative">
                <span
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-[13px] shadow-md ${
                    item.complete
                      ? "bg-bluez text-white"
                      : "bg-white text-bluez"
                  }`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-sm ${
                    item.complete
                      ? "text-bluez dark:text-[#007CFF]"
                      : "text-black/80 dark:text-white"
                  }`}
                >
                  {item.title}{" "}
                </span>
              </div>
            </div>
          ))}
          <>
            <div className="flex flex-col">
              <div
                className={`h-10 w-[2px] ml-[19px] shadow-lg ${
                  options[options.length - 1].complete ? "bg-bluez" : "bg-white"
                }`}
              />

              <div className="flex items-center gap-3 relative">
                <button
                  disabled={!options[options.length - 1].complete}
                  onClick={buttonAction}
                  className={`flex items-center justify-center w-10 h-10 rounded-full text-[13px] shadow-md ${
                    options[options.length - 1].complete
                      ? "bg-white transition-all hover:bg-bluez text-bluez hover:text-white"
                      : "bg-white text-bluez"
                  }`}
                >
                  <ArrowPathIcon width={16} />
                </button>
                <span
                  className={`text-sm ${
                    options[options.length - 1].complete
                      ? "text-bluez dark:text-[#007CFF]"
                      : "text-black/80 dark:text-white"
                  }`}
                >
                  Redo
                </span>
              </div>
            </div>
          </>
        </div>
      </div>
    </main>
  );
}

// {index === options.length - 1 &&
//   item.complete &&
//   buttonTitle && (
//     <button
//       onClick={buttonAction}
//       className="absolute left-[-8px] bottom-[-60px] p-2 px-4 bg-bluez rounded-[8px] text-white ml-2 text-sm"
//     >
//       {buttonTitle}
//     </button>
//   )}
