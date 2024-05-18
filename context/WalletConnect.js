import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";
import Upload from "../utils/Upload.json";

export const WalletContext = createContext();

function WalletConnect({ children }) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const connectWallet = async () => {
    let contractAddress = "0x86e732348DfFc12E187a00F1BB9B330836318570";
    let contractABI = Upload.abi;
    try {
      if (!window.ethereum) {
        console.log("Install Metamask!");
        return toast.error("Please Install Metamask!");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        await provider.send("eth_requestAccounts", []);

        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        });
      }

      const signer = provider.getSigner();

      const address = await signer.getAddress();

      console.log(address);

      setAccount(address);

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      console.log(contract);
      setContract(contract);
      setProvider(signer);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setContract(null);
    setProvider(null);
  };

  return (
    <WalletContext.Provider
      value={{ connectWallet, disconnectWallet, account, contract, provider }}
    >
      {children}
      <Toaster />
    </WalletContext.Provider>
  );
}

export default WalletConnect;
