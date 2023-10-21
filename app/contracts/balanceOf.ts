import { JsonRpcProvider, JsonRpcSigner, Contract, formatEther } from "ethers";
import { tokenAbi } from "@/consts";

export async function balanceOf(
  tokenAddress: string,
  userAddress: string,
  provider?: JsonRpcProvider,
  signer?: JsonRpcSigner
) {
  const contract = new Contract(
    tokenAddress,
    tokenAbi,
    provider ? provider : signer
  );
  // Get the balance of the user
  const balance = await contract.balanceOf(userAddress);
  console.log(
    Number(formatEther(balance)).toLocaleString("en-us", {
      maximumFractionDigits: 3,
    })
  );
}
