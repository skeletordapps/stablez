"use client";
import Image from "next/image";
import { Roboto_Condensed } from "next/font/google";
import { useState, useContext, useEffect, useCallback, Fragment } from "react";
import { stablez, stablezDark } from "@/public/svg";
import { Popover, Dialog, Transition, RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useDebounce } from "use-debounce";
import { useNetwork } from "wagmi";

import { StateContext, Theme } from "../context/StateContext";
import {
  Balances,
  LockInfos,
  lockInfos,
  balances,
  hasAllowance,
  handleApproval,
  lock,
  unlock,
  redeem,
  checkLockSteps,
  stepsLockInitialState,
  stepsRedeemInitialState,
  checkRedeemSteps,
} from "../contracts/lock";
import type { StepsType } from "../components/steps";
import Steps from "../components/steps";
import { CONTRACTS } from "../utils/consts";

const roboto = Roboto_Condensed({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

const rewards = [
  {
    name: "STZ",
  },
  {
    name: "WETH",
  },
  {
    name: "STZ & WETH",
  },
];

export default function Lock() {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<string[]>(["Lock", "Redeem"]);
  const [tab, setTab] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [lockInfosData, setLockInfosData] = useState<null | LockInfos>(null);
  const [balancesData, setBalancesData] = useState<null | Balances>(null);
  const [modalRewards, setModalRewards] = useState(false);
  const [selected, setSelected] = useState(rewards[0]);
  const [lockStepsData, setLockStepsData] = useState<StepsType>(
    stepsLockInitialState
  );
  const [redeemStepsData, setRedeemStepsData] = useState<StepsType>(
    stepsRedeemInitialState
  );
  const [inputValueDebounced] = useDebounce(inputValue, 200);
  const [buttonTitle, setButtonTitle] = useState("loading...");
  const [requestedAmount, setRequestedAmount] = useState("");
  const { theme, provider, signer } = useContext(StateContext);

  const network = useNetwork();

  const clear = () => {
    onInputChange("");
  };

  const onTabChange = useCallback(
    async (index: number) => {
      clear();
      setTab(index);
    },
    [setTab]
  );

  const onInputChange = (value: string) => {
    const re = new RegExp("^[+]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");

    if (value === "" || re.test(value)) {
      setInputValue(value);
    }

    return false;
  };

  const getLockInfos = useCallback(async () => {
    setLoading(true);
    if (!network.chain?.unsupported) {
      const data: LockInfos = await lockInfos(provider!, signer!);
      setLockInfosData(data);
    }

    setLoading(false);
  }, [provider, signer, setLoading]);

  const getBalances = useCallback(async () => {
    setLoading(true);
    if (signer && !network.chain?.unsupported) {
      const data: Balances = await balances(signer);
      setBalancesData(data);
    }
    setLoading(false);
  }, [signer, setLoading, setBalancesData]);

  const onApprove = useCallback(async () => {
    setLoading(true);
    if (signer && inputValueDebounced !== "" && inputValueDebounced !== "0") {
      const address = tab === 0 ? CONTRACTS.stz : CONTRACTS.str;

      await handleApproval(address, inputValueDebounced, signer);

      const allowed = await hasAllowance(
        address,
        inputValueDebounced || "0",
        signer
      );

      if (allowed) {
        await checkStepsData();
      }
    }
    setLoading(false);
  }, [signer, tab, inputValueDebounced]);

  const onLock = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await lock(inputValueDebounced, signer);
      await getLockInfos();
      await getBalances();
      await checkStepsData(true); // locked
    }
    setLoading(false);
  }, [inputValueDebounced, signer, setLoading]);

  const onUnlock = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await unlock(inputValueDebounced, signer);
      await getLockInfos();
      await getBalances();
      await checkStepsData();
    }
    setLoading(false);
  }, [inputValueDebounced, signer, setLoading]);

  const onRedeem = useCallback(async () => {
    setLoading(true);
    if (signer) {
      await redeem(inputValueDebounced, signer);
      await getLockInfos();
      await getBalances();
      await checkStepsData(undefined, true);
    }
    setLoading(false);
  }, [inputValueDebounced, tab, signer, setLoading]);

  const updateButtonTitle = useCallback(() => {
    if (tab === 2) return setButtonTitle("Claim Rewards");

    let stepIndex = -1;

    if (tab === 0) {
      stepIndex = lockStepsData?.options.findIndex(
        (item) => item.complete === false
      );

      if (lockStepsData && stepIndex !== -1) {
        return setButtonTitle(lockStepsData.options[stepIndex].title);
      }
    }

    if (tab === 1) {
      stepIndex = redeemStepsData?.options.findIndex(
        (item) => item.complete === false
      );

      if (redeemStepsData && stepIndex !== -1) {
        return setButtonTitle(redeemStepsData.options[stepIndex].title);
      }
    }

    if (stepIndex === -1)
      return setButtonTitle(tab === 0 ? "Locked!" : "Redeemed!");
  }, [tab, lockStepsData, redeemStepsData, setButtonTitle]);

  const getButtonAction = useCallback(() => {
    if (tab === 2) return setModalRewards(true);

    let action;
    const currentStepIndex =
      tab === 0
        ? lockStepsData?.options.findIndex((item) => item.complete === false)
        : redeemStepsData?.options.findIndex((item) => item.complete === false);

    if (tab === 0) {
      switch (currentStepIndex) {
        case 1:
          action = () => onApprove();
          break;
        case 2:
          action = () => onLock();
          break;
        default:
          action = () => {};
          break;
      }
    }

    if (tab === 1) {
      switch (currentStepIndex) {
        case 1:
          action = () => onUnlock();
          break;
        case 2:
          action = () => {};
          break;
        case 3:
          action = () => onApprove();
          break;
        case 4:
          action = () => onRedeem();
          break;
        default:
          action = () => {};
      }
    }

    if (action) action();
  }, [lockStepsData, redeemStepsData, tab]);

  const checkStepsData = useCallback(
    async (locked?: boolean, redeemed?: boolean) => {
      if (signer) {
        const lockSteps: StepsType = await checkLockSteps(
          signer,
          inputValueDebounced,
          locked || false
        );
        const redeemSteps: StepsType = await checkRedeemSteps(
          signer,
          inputValueDebounced,
          redeemed || false
        );
        setLockStepsData(lockSteps);
        setRedeemStepsData(redeemSteps);
      }
    },
    [
      inputValueDebounced,
      inputValue,
      signer,
      setLockStepsData,
      setRedeemStepsData,
    ]
  );

  useEffect(() => {
    if (signer && !network.chain?.unsupported) {
      setTabs(["Lock", "Redeem", "Rewards", "DAO Votes"]);
      getBalances();
    } else {
      setTabs(["Lock", "Redeem"]);
    }

    if (provider || signer) {
      getLockInfos();
    }
  }, [provider, signer]);

  useEffect(() => {
    checkStepsData();
  }, [signer, inputValueDebounced]);

  useEffect(() => {
    updateButtonTitle();

    if (tab === 1) {
      const index = redeemStepsData.options.findLastIndex(
        (option) => option.complete
      );

      if (redeemStepsData.redeemAmount) {
        setRequestedAmount(redeemStepsData.redeemAmount);
      }
    }
  }, [tab, lockStepsData, redeemStepsData, setRequestedAmount]);

  useEffect(() => {
    tab === 1 &&
      requestedAmount !== "0" &&
      onInputChange(requestedAmount.toString());
  }, [requestedAmount, tab]);

  return (
    <main className="flex flex-col w-full max-w-[1600px] px-4 xl:px-[120px] text-center mb-24">
      {/* TOP SECTION */}
      <section className="flex items-center justify-between w-full mt-10 md:mt-[87px] mb-[38px]">
        {/* FARMS RESUME */}
        <div className="w-full flex flex-col justify-between text-white">
          <h3
            className={`font-medium text-[28px] text-bluez dark:text-aquaz ${roboto.className}`}
          >
            Lock $StableZ
          </h3>
          <p className="font-light text-[14px] text-[#3E3E3E] dark:text-white">
            Lock{" "}
            <span className="text-bluez dark:text-aquaz font-medium">$STZ</span>
            , recieve{" "}
            <span className="text-black dark:text-blue-300 font-medium">
              $STR
            </span>
            , and get access to revenue sharing, and other utilities.
          </p>

          <div className="flex justify-center items-center font-medium text-[13px] pt-[60px] text-bluez dark:text-white/80 flex-wrap gap-10 max-w-[600px] self-center">
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md min-w-[240px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                PRICE
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                $1.00
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md min-w-[240px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                APR
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                130%
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md min-w-[240px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                CIRCULATING $STZ
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                12,000.00
              </span>
            </div>
            <div
              className={`${
                loading || !balancesData ? "hidden" : "flex"
              } flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md min-w-[240px]`}
            >
              <span className="font-medium text-[12px] lg:text-[20px]">
                IN WALLET
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                {balancesData
                  ? balancesData?.stzBalance.toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 5,
                    })
                  : 0}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center p-6 bg-white dark:bg-bluez/40 border border-bluez/40 rounded-[8px] text-bluez/80 dark:text-white/80 shadow-md min-w-[240px]">
              <span className="font-medium text-[12px] lg:text-[20px]">
                LOCKED $STZ
              </span>
              <span className="font-black text-[16px] md:text-[24px] text-bluez dark:text-white">
                {lockInfosData
                  ? lockInfosData?.totalLocked.toLocaleString("en-us", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })
                  : 0}
              </span>
            </div>
          </div>

          <div className="flex flex-col self-center bg-white/70 dark:bg-bluez/40 border border-bluez/30 w-full max-w-[600px] rounded-[8px] shadow-lg mt-[70px] md:mt-[130px] relative">
            <div className="flex flex-col w-full">
              <div
                className={`flex items-center w-full text-bluez dark:text-white font-medium px-4 md:px-8 pt-7 md:pt-10 justify-between ${roboto.className}`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-bluez/10 dark:bg-aquaz/20 border border-bluez dark:border-aquaz/50">
                    <div className="w-[28px]">
                      {theme === Theme.light ? stablez : stablezDark}
                    </div>
                  </div>
                  <span className="text-[28px]">$StableZ</span>
                  <span
                    className={`flex items-center justify-center p-2 ${
                      lockInfosData?.paused
                        ? "bg-gradient-to-tr from-red-400 to-red-600 border border-red-500"
                        : "bg-gradient-to-tr from-green-400 to-green-600 border border-green-500"
                    }  rounded-full animate-pulse`}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col py-8 px-4 md:px-8 mt-10 gap-4">
              <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row justify-between items-center gap-1">
                  {tabs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => onTabChange(index)}
                      className={`transition-all  w-16 h-[29px] flex justify-center items-center rounded-lg text-white text-[12px] font-medium hover:bg-opacity-75 ${
                        roboto.className
                      } ${tab === index ? "bg-bluez" : "bg-bluez/20"}`}
                    >
                      {tabs[index]}
                    </button>
                  ))}
                </div>
                <p
                  className={`text-end font-light text-[14px] mb-[-26px] pr-1 text-slate-500 dark:text-white/80 ${
                    roboto.className
                  } ${tab === 2 || tab === 3 ? "hidden" : "block"}`}
                >
                  {"Wallet: "}
                  <button
                    className="text-slate-700 dark:text-white hover:text-bluez dark:hover:text-aquaz"
                    onClick={() =>
                      onInputChange(
                        tab === 0
                          ? balancesData
                            ? balancesData.stzBalance.toString()
                            : "0"
                          : tab === 1
                          ? balancesData
                            ? balancesData.strBalance.toString()
                            : "0"
                          : "0"
                      )
                    }
                  >
                    {tab === 0
                      ? balancesData
                        ? balancesData.stzBalance.toLocaleString("en-us", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : 0
                      : tab === 1
                      ? balancesData
                        ? balancesData.strBalance.toLocaleString("en-us", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })
                        : 0
                      : 0}{" "}
                    {tab === 0 ? "STZ" : "STR"}
                  </button>
                </p>
              </div>

              {tab === 3 ? (
                <div className="flex flex-col gap-2 font-light text-[14px] text-[#3E3E3E] text-left pl-2 py-[9px] pt-[12px]">
                  <p className="pb-[94px] font-semibold">
                    There are no DAO Votes ongoing.
                  </p>
                </div>
              ) : tab === 2 ? (
                <div className="flex gap-4 font-light text-[14px] text-[#3E3E3E] dark:text-white text-left px-1 py-[13.5px]">
                  <div className="flex items-center justify-between gap-1 py-[6px] px-3 bg-bluez rounded-full text-white font-semibold transition-all hover:bg-opacity-75 z-20 border border-bluez/40">
                    <Popover className="relative">
                      <Popover.Button>
                        <p className="flex items-center gap-2">
                          <span>
                            {balancesData?.stzRewards.toLocaleString("en-us", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 4,
                            })}
                          </span>

                          <Image
                            src="/stz.svg"
                            width={30}
                            height={20}
                            alt="stz"
                          />
                        </p>
                      </Popover.Button>

                      <Popover.Panel className="absolute top-[-140px] left-0 z-10 bg-bluez dark:bg-aquaz w-[200px] p-4 rounded-[8px] border border-white  shadow-xl shadow-black/30">
                        <div className="text-center text-white dark:text-black relative">
                          <div className="absolute bottom-[-33px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-white" />
                          <div className="absolute bottom-[-32px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-bluez dark:border-t-aquaz" />
                          <p>
                            This is your available STZ tokens to claim as
                            rewards.
                          </p>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>
                  </div>
                  <div className="flex items-center justify-between gap-1 py-[6px] px-3 bg-sky-400 rounded-full text-white font-semibold transition-all hover:bg-opacity-75 z-20 border border-aquaz">
                    <Popover className="relative">
                      <Popover.Button>
                        <p className="flex items-center gap-2">
                          <span>
                            {balancesData?.wethRewards.toLocaleString("en-us", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 4,
                            })}
                          </span>

                          <Image
                            src="/weth.svg"
                            width={30}
                            height={30}
                            alt="weth"
                          />
                        </p>
                      </Popover.Button>

                      <Popover.Panel className="absolute top-[-140px] left-0 z-10 bg-bluez dark:bg-aquaz w-[200px] p-4 rounded-[8px] border border-white  shadow-xl shadow-black/30">
                        <div className="text-center text-white dark:text-black relative">
                          <div className="absolute bottom-[-33px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-white" />
                          <div className="absolute bottom-[-32px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-bluez dark:border-t-aquaz" />
                          <p>
                            This is your available WETH tokens to claim as
                            rewards.
                          </p>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>
                  </div>
                  {/* <div className="flex items-center justify-between gap-1 py-[6px] px-3 bg-purple-400 rounded-full text-white font-semibold transition-all hover:bg-opacity-75 z-20 border border-purple-200">
                    <Popover className="relative">
                      <Popover.Button>
                        <p className="flex items-center gap-2">
                          <span>
                            {Number(0.02333).toLocaleString("en-us", {
                              maximumFractionDigits: 4,
                            })}
                          </span>

                          <Image
                            src="/weth.svg"
                            width={30}
                            height={20}
                            alt="weth"
                          />
                        </p>
                      </Popover.Button>

                      <Popover.Panel className="absolute top-[-140px] left-0 z-10 bg-bluez dark:bg-aquaz w-[200px] p-4 rounded-[8px] border border-white  shadow-xl shadow-black/30">
                        <div className="text-center text-white dark:text-black relative">
                          <div className="absolute bottom-[-33px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-white" />
                          <div className="absolute bottom-[-32px] left-3 w-0 h-0 border-8 border-solid border-transparent border-t-bluez dark:border-t-aquaz" />
                          <p>
                            Loren Ipsum Dolor Sit Amet Loren Ipsum Dolor Sit
                            Amet Loren Ipsum Dolor Sit Amet
                          </p>
                        </div>

                        <img src="/solutions.jpg" alt="" />
                      </Popover.Panel>
                    </Popover>
                  </div> */}
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    disabled={loading || (tab === 1 && requestedAmount !== "0")}
                    placeholder={"Enter the amount"}
                    className={`w-full ${
                      loading || (tab === 1 && requestedAmount !== "0")
                        ? "bg-gray-300 dark:bg-bluez/20 text-gray-500 border-transparent"
                        : "bg-transparent text-black border-slate-600 dark:border-white"
                    } border  placeholder-slate-600 dark:placeholder-white p-6  dark:text-white rounded-[8px] text-[14px]`}
                    onChange={(e) => onInputChange(e.target.value)}
                    value={inputValue}
                  />
                  <div className="flex items-center absolute top-[25px] right-4">
                    <div className="w-[22px]">
                      {theme === Theme.light ? stablez : stablezDark}
                    </div>

                    <span className="ml-2 text-[14px text-bluez dark:text-aquaz">
                      StableZ
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={getButtonAction}
                disabled={
                  loading ||
                  !signer ||
                  lockInfosData?.paused ||
                  (tab === 0 && balancesData?.stzBalance === 0) ||
                  (tab === 0 &&
                    balancesData &&
                    Number(inputValue) > balancesData?.stzBalance) ||
                  (tab === 1 && balancesData?.strBalance === 0) ||
                  (tab === 1 &&
                    balancesData &&
                    Number(inputValue) > balancesData?.strBalance) ||
                  (tab === 0 && Number(inputValue) === 0) ||
                  (tab === 1 && Number(inputValue) === 0) ||
                  (tab === 0 &&
                    lockStepsData.options[lockStepsData.options.length - 1]
                      .complete) ||
                  (tab === 1 &&
                    redeemStepsData.options[redeemStepsData.options.length - 1]
                      .complete) ||
                  (tab === 1 &&
                    Number(redeemStepsData.options[1].amount) > 0 &&
                    !redeemStepsData.options[2].complete)
                }
                className={`
                ${tab === 3 ? "hidden" : "flex"}
                ${
                  loading ||
                  !signer ||
                  lockInfosData?.paused ||
                  (tab === 0 && balancesData?.stzBalance === 0) ||
                  (tab === 0 &&
                    balancesData &&
                    Number(inputValue) > balancesData?.stzBalance) ||
                  (tab === 1 && balancesData?.strBalance === 0) ||
                  (tab === 1 &&
                    balancesData &&
                    Number(inputValue) > balancesData?.strBalance) ||
                  (tab === 0 && Number(inputValue) === 0) ||
                  (tab === 1 && Number(inputValue) === 0) ||
                  (tab === 0 &&
                    lockStepsData.options[lockStepsData.options.length - 1]
                      .complete) ||
                  (tab === 1 &&
                    redeemStepsData.options[redeemStepsData.options.length - 1]
                      .complete) ||
                  (tab === 1 &&
                    Number(redeemStepsData.options[1].amount) > 0 &&
                    !redeemStepsData.options[2].complete)
                    ? "bg-gray-300 dark:bg-bluez/20 text-gray-500"
                    : "bg-bluez dark:bg-white hover:bg-opacity-75 dark:hover:bg-blue-100 text-white dark:text-bluez"
                }
                transition-all w-full h-[49px] justify-center items-center rounded-lg text-[16px] font-medium 
                ${roboto.className}`}
              >
                {/* {buttonLabelByTabSelected[tab]} */}
                {loading ? "loading..." : buttonTitle}
              </button>
            </div>
            <Image
              src="/mascout.svg"
              width={217}
              height={251.36}
              alt="mascout"
              className="absolute top-[-70px] right-[-15px] md:right-[-25px] drop-shadow-xl w-[117px] h-[151.36px] md:w-[217px] md:h-[251.36px]"
            />
          </div>
        </div>
      </section>
      {((tab === 0 && lockStepsData) || (tab === 1 && redeemStepsData)) && (
        <section className="flex items-center justify-between w-full max-w-[530px] self-center gap-3 pb-10">
          <Steps
            title={tab === 0 ? lockStepsData.title : redeemStepsData.title}
            options={
              tab === 0 ? lockStepsData.options : redeemStepsData.options
            }
            buttonTitle={tab === 0 ? "Lock Again" : "Redeem Again"}
            buttonAction={clear}
          />
        </section>
      )}

      <Transition appear show={modalRewards} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setModalRewards(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Select the rewards you want to claim
                  </Dialog.Title>
                  <div className="my-8">
                    <RadioGroup
                      value={selected}
                      onChange={setSelected}
                      className="outline-none"
                    >
                      <div className="space-y-2">
                        {rewards.map((reward) => (
                          <RadioGroup.Option
                            key={reward.name}
                            value={reward}
                            className={({ active, checked }) =>
                              `${
                                active
                                  ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300 outline-none"
                                  : "outline-none"
                              }
                  ${checked ? "bg-bluez text-white outline-none" : "bg-white"}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md`
                            }
                          >
                            {({ active, checked }) => (
                              <>
                                <div className="flex w-full items-center justify-between">
                                  <div className="flex items-center">
                                    <div className="text-sm">
                                      <RadioGroup.Label
                                        as="p"
                                        className={`font-medium  ${
                                          checked
                                            ? "text-white"
                                            : "text-gray-900"
                                        }`}
                                      >
                                        {reward.name}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as="span"
                                        className={`inline ${
                                          checked
                                            ? "text-sky-100"
                                            : "text-gray-500"
                                        }`}
                                      ></RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className="shrink-0 text-white">
                                      <CheckIcon className="h-6 w-6" />
                                    </div>
                                  )}
                                </div>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </div>
                    </RadioGroup>
                    {/* <p className="text-sm text-gray-500">
                      Your payment has been successfully submitted. We’ve sent
                      you an email with all of the details of your order.
                    </p> */}
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setModalRewards(false)}
                    >
                      Claim
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
