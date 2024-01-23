import {
  JsonRpcProvider,
  JsonRpcSigner,
  Contract,
  formatEther,
  parseEther,
} from "ethers";
import {
  CONTRACTS,
  EXPLORER_LINKS,
  LOCK_ABI,
  STR_ABI,
  STZ_ABI,
} from "@/app/utils/consts";
import handleError from "../utils/handleErrors";
import { balanceOf } from "./balanceOf";
import { getAllowance } from "./allowance";
import { approve } from "./approve";
import Notificate from "../components/notificate";
import { StepsType } from "../components/steps";
import { fromUnixTime, formatDistanceToNow, getUnixTime } from "date-fns";

export type LockInfos = {
  unlockRequestPeriod: number;
  unlockWindowPeriod: number;
  endStakingUnixTime: number;
  stzRewardsPerDay: number;
  wethRewardsPerDay: number;
  totalRewardsInSTZ: number;
  totalRewardsInWETH: number;
  totalLocked: number;
  paused: boolean;
};

export type Balances = {
  stzBalance: number;
  strBalance: number;
  stzRewards: number;
  wethRewards: number;
};

export type UnlockRequest = {
  timestamp: number;
  amount: number;
  redeemed: number;
};

export const stepsLockInitialState: StepsType = {
  title: "Steps to Lock $STZ",
  options: [
    { title: "Choose the amount of $STZ to lock", complete: false },
    { title: "Approve the amount in $STZ to spend", complete: false },
    { title: "Lock your $STZ and receive $STR", complete: false },
  ],
};

export const stepsRedeemInitialState: StepsType = {
  title: "Steps to redeem your $STZ",
  options: [
    { title: "Choose the amount of $STR to reedeem", complete: false },
    { title: "Initiate a notice to withdraw after 7 days", complete: false },
    {
      title: "Wait for the prompt window to redeem. (3 days max)",
      complete: false,
    },
    { title: "Approve the amount of $STR spending", complete: false },
    {
      title:
        "Redeem $STR for $STZ once the claim window is initiated (3 days max)",
      complete: false,
    },
  ],
  redeemAmount: "0",
};

export async function checkLockSteps(
  signer: JsonRpcSigner,
  amount: string,
  locked: boolean
) {
  const state = JSON.parse(JSON.stringify(stepsLockInitialState));

  if (amount === "" || amount === "0") return state;

  state.options[0].complete = true;

  const allowed = await hasAllowance(CONTRACTS.stz, amount, signer);
  if (!allowed && !locked) return state;

  state.options[1].complete = true;
  state.options[2].complete = locked;

  return state;
}

// load request
// has amount

// -- FLOW 1: REQUEST IS OLD
// -- FLOW 2: REQUEST IN UNLOCK PERIOD
// -- FLOW 2: REQUEST IS REDEEM WINDOW PERIOD

export async function checkRedeemSteps(
  signer: JsonRpcSigner,
  amount: string,
  redeemed: boolean
) {
  const state = JSON.parse(JSON.stringify(stepsRedeemInitialState));
  const request = await unlockRequests(signer);
  const contract = new Contract(CONTRACTS.stzLock, LOCK_ABI, signer);
  const windowPeriod = Number(await contract.UNLOCK_WINDOW_PERIOD());
  const now = getUnixTime(new Date());
  const isOldRequest = request && now > request.timestamp + windowPeriod;
  const isWaiting = request && now < request.timestamp;
  const isInRedeemPeriod =
    request &&
    now >= request.timestamp &&
    now <= request.timestamp + windowPeriod;

  const redeemedAllAmount = request && request.amount === request.redeemed;

  if (isOldRequest) {
    console.log("OLD REQUEST!!!");
    if (!amount.length) return state;
    state.options[0].complete = true;
    return state;
  }

  if (isWaiting) {
    console.log("IS WAITING!!!");
    state.redeemAmount = request.amount;
    state.options[0].complete = true;
    state.options[1].complete = true;
    state.options[1].amount = request.amount;

    return state;
  }

  // if already redeemed, don't need to check allowance
  if (isInRedeemPeriod) {
    console.log("IS IN REDEEM PERIOD!!!");

    if (redeemed) {
      state.redeemAmount = request.amount;
      state.options[0].complete = true;
      state.options[1].complete = true;
      state.options[1].amount = request.amount;
      state.options[2].complete = true;
      state.options[2].amount = request.amount;
      state.options[3].complete = true;
      state.options[3].amount = request.amount;
      state.options[4].complete = true;
      state.options[4].amount = request.amount;

      return state;
    }

    if (redeemedAllAmount && !amount.length) return state;
    if (redeemedAllAmount && amount.length) {
      state.options[0].complete = true;
      return state;
    }

    state.redeemAmount = request.amount;
    state.options[0].complete = true;
    state.options[1].complete = true;
    state.options[1].amount = request.amount;
    state.options[2].complete = true;
    state.options[2].amount = request.amount;

    // didnt redeem yet
    const allowed = await hasAllowance(
      CONTRACTS.str,
      request.amount.toString(),
      signer
    );
    if (!allowed) return state;

    state.options[3].complete = true;
    state.options[3].amount = request.amount;
    return state;
  }
}

export async function balances(signer: JsonRpcSigner) {
  let stzBalance: number;
  let strBalance: number;

  const userAddress = await signer.getAddress();
  const balanceInStz = await balanceOf(
    STZ_ABI,
    CONTRACTS.stz,
    userAddress,
    undefined,
    signer
  );

  stzBalance = Number(formatEther(balanceInStz));

  const balanceInStr = await balanceOf(
    STR_ABI,
    CONTRACTS.str,
    userAddress,
    undefined,
    signer
  );
  strBalance = Number(formatEther(balanceInStr));

  const contract = new Contract(CONTRACTS.stzLock, LOCK_ABI, signer);
  const rewardsInStz = await contract.calculateRewards(userAddress, 0); // 0 STZ
  const stzRewards = Number(formatEther(rewardsInStz));
  const rewardsInWeth = await contract.calculateRewards(userAddress, 1); // 1 WETH
  const wethRewards = Number(formatEther(rewardsInWeth));

  return { stzBalance, strBalance, stzRewards, wethRewards } as Balances;
}

export async function hasAllowance(
  contract: string,
  amount: string,
  signer: JsonRpcSigner
): Promise<boolean> {
  const allowance = await getAllowance(
    contract === CONTRACTS.stz ? STZ_ABI : STR_ABI,
    contract,
    CONTRACTS.stzLock,
    signer
  );

  return allowance >= parseEther(amount);
}

export async function handleApproval(
  contract: string,
  amount: string,
  signer: JsonRpcSigner
): Promise<boolean> {
  const approved = await approve(
    contract === CONTRACTS.stz ? STZ_ABI : STR_ABI,
    contract,
    CONTRACTS.stzLock,
    signer,
    parseEther(amount)
  );

  return approved;
}

export async function unlockRequests(signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.stzLock, LOCK_ABI, signer);

  try {
    const address = await signer.getAddress();

    const tx = await contract.unlockRequests(address);
    const values = Object.values(tx);
    const request: UnlockRequest = {
      timestamp: Number(values[0]),
      amount: Number(formatEther(values[1] as string)),
      redeemed: Number(formatEther(values[2] as string)),
    };

    return request;
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function getRequestState(signer: JsonRpcSigner) {
  const request = await unlockRequests(signer);
}

export async function lockInfos(
  provider?: JsonRpcProvider,
  signer?: JsonRpcSigner
) {
  const contract = new Contract(
    CONTRACTS.stzLock,
    LOCK_ABI,
    signer ? signer : provider
  );

  const unlockRequestPeriod = Number(await contract.UNLOCK_REQUEST_PERIOD());
  const unlockWindowPeriod = Number(await contract.UNLOCK_WINDOW_PERIOD());
  const endStakingUnixTime = Number(await contract.END_STAKING_UNIX_TIME());

  const stzRewardsPerSecond = await contract.STZ_REWARDS_PER_SECOND();
  const stzRewardsPerDay: number =
    Number(formatEther(stzRewardsPerSecond)) * 86400;
  const wethRewardsPerSecond = await contract.WETH_REWARDS_PER_SECOND();
  const wethRewardsPerDay: number =
    Number(formatEther(wethRewardsPerSecond)) * 86400;

  let totalRewardsInSTZ: number = await contract.totalRewardsInSTZ();
  totalRewardsInSTZ = Number(formatEther(totalRewardsInSTZ));
  let totalRewardsInWETH: number = await contract.totalRewardsInWETH();
  totalRewardsInWETH = Number(formatEther(totalRewardsInWETH));
  let totalLocked: number = await contract.totalLocked();
  totalLocked = Number(formatEther(totalLocked));

  const paused: boolean = await contract.paused();

  return {
    unlockRequestPeriod,
    unlockWindowPeriod,
    endStakingUnixTime,
    stzRewardsPerDay,
    wethRewardsPerDay,
    totalRewardsInSTZ,
    totalRewardsInWETH,
    totalLocked,
    paused,
  } as LockInfos;
}

export async function lock(amount: string, signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.stzLock, LOCK_ABI, signer);

  try {
    const network = await signer.provider?.getNetwork();
    const tx = await contract.lock(parseEther(amount));

    const txUrl =
      EXPLORER_LINKS[network!.chainId.toString()] + tx.hash.toString();

    Notificate({
      type: "",
      title: "Transaction Submitted",
      message: "Your lock transaction was successfully submitted.",
      link: txUrl,
    });

    const receipt = await tx.wait();
    Notificate({
      type: "success",
      title: "Transaction Confirmed",
      message: `Lock confirmed in block ${receipt.blockNumber}`,
      link: txUrl,
    });
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function unlock(amount: string, signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.stzLock, LOCK_ABI, signer);

  try {
    const network = await signer.provider?.getNetwork();
    const tx = await contract.unlock(parseEther(amount));

    const txUrl =
      EXPLORER_LINKS[network!.chainId.toString()] + tx.hash.toString();

    Notificate({
      type: "",
      title: "Transaction Submitted",
      message: "Your unlock transaction was successfully submitted.",
      link: txUrl,
    });

    const receipt = await tx.wait();
    Notificate({
      type: "success",
      title: "Transaction Confirmed",
      message: `Unlock confirmed in block ${receipt.blockNumber}`,
      link: txUrl,
    });
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

export async function redeem(amount: string, signer: JsonRpcSigner) {
  const contract = new Contract(CONTRACTS.stzLock, LOCK_ABI, signer);

  try {
    const network = await signer.provider?.getNetwork();
    const tx = await contract.redeem(parseEther(amount));

    const txUrl =
      EXPLORER_LINKS[network!.chainId.toString()] + tx.hash.toString();

    Notificate({
      type: "",
      title: "Transaction Submitted",
      message: "Your redeem transaction was successfully submitted.",
      link: txUrl,
    });

    const receipt = await tx.wait();
    Notificate({
      type: "success",
      title: "Transaction Confirmed",
      message: `Redeem confirmed in block ${receipt.blockNumber}`,
      link: txUrl,
    });
  } catch (error) {
    handleError({ e: error as Error, notificate: true });
  }
}

// console.log(
//   "request && request.timestamp !== 0",
//   request && request.timestamp !== 0
// );

// console.log(
//   "now > request.timestamp && now < request.timestamp + windowPeriod",
//   now > request.timestamp && now < request.timestamp + windowPeriod
// );

// console.log("now", now);
// console.log("request.timestamp", request.timestamp);
// console.log(
//   "request.timestamp + windowPeriod",
//   request.timestamp + windowPeriod
// );
