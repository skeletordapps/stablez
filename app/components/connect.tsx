import { ConnectButton } from "@rainbow-me/rainbowkit";

export const Connect = () => {
  return (
    <div className="text-[12px] md:text-[16px] xl:min-w-[160px]">
      <ConnectButton showBalance={false} />
    </div>
  );
};
