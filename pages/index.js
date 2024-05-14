import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext } from "react";
import { WalletContext } from "@/context/WalletConnect";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { connectWallet } = useContext(WalletContext);
  return (
    <div>
      <button onClick={() => connectWallet()}>connect wallet</button>
    </div>
  );
}
