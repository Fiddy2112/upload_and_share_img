import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

export const WalletContext = createContext();

function WalletConnect({ children }) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const connectWallet = async () => {
    let contractAddress = "";
    let contractABI = "";
    try {
      if (!window.ethereum) {
        console.log("Install Metamask!");
        return toast.error("Please Install Metamask!");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();

      const address = await signer.getAddress();

      console.log(address);

      setAccount(address);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WalletContext.Provider value={{ connectWallet }}>
      {children}
      <Toaster />
    </WalletContext.Provider>
  );
}

export default WalletConnect;
