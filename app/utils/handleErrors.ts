import Notification from "@/app/components/notificate";
import { DecodedError, decodeError } from "@/app/utils/ethers-decode-error";

type ErrorProps = {
  e: Error;
  notificate?: boolean;
};

export default function handleError({ e, notificate = false }: ErrorProps) {
  // let error = e.message;

  // if (e.code === "ACTION_REJECTED") {
  //   error = "User dismissed transaction";
  // }

  // if (e && e.error && e.error.logs) {
  //   const log = e.error.logs.find((logError: string) =>
  //     logError.includes("Error Number:")
  //   );
  //   const errorNumber = log.substring(
  //     log.indexOf("Error Number:") + 13,
  //     log.indexOf("Error Message:") - 2
  //   );

  //   const errorMessage = log.substring(
  //     log.indexOf("Error Message:") + 14,
  //     log.length
  //   );
  //   error = `Error: ${errorNumber} - ${errorMessage}`;
  // }

  // const error: DecodedError = decodeError(e.message);
  console.log(e.message);

  // if (notificate) {
  //   Notification({
  //     type: "error",
  //     title: "Transaction failure",
  //     message: error,
  //     link: "",
  //   });
  // }
}
