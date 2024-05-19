import Image from "next/image";
import { Inter } from "next/font/google";
import { useContext, useState } from "react";
import { WalletContext } from "@/context/WalletConnect";
import FileUpload from "@/components/FileUpload";

import toast, { Toaster } from "react-hot-toast";
import { showAddress } from "@/utils/Features";
import Display from "@/components/Display";
import Modal from "@/components/Modal";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { connectWallet, disconnectWallet, account, contract, provider } =
    useContext(WalletContext);

  const [openModal, setOpenModal] = useState(false);

  const copyAddress = async (address) => {
    try {
      navigator.clipboard.writeText(address);
      return toast.success("Copy");
    } catch (err) {
      toast.error("Copy failed");
    }
  };

  return (
    <div>
      {openModal && (
        <Modal
          setOpenModal={setOpenModal}
          contract={contract}
          account={account}
        />
      )}
      <div className="flex items-center justify-between bg-[#2d3436] p-2">
        <a href="">
          <h3 className="text-3xl font-bold uppercase cursor-pointer">
            Upload
          </h3>
        </a>
        {account ? (
          <>
            <div className="hidden lg:block">
              {!openModal && (
                <button onClick={() => setOpenModal(true)}>Share</button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div
                className="cursor-pointer "
                onClick={() => copyAddress(account)}
              >
                {showAddress(account)}
              </div>

              <button
                onClick={() => disconnectWallet()}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                type="button"
              >
                Disconnect
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              onClick={() => connectWallet()}
            >
              Connect Wallet
            </button>
          </>
        )}
      </div>
      {account ? (
        <div className="mb-4 block lg:hidden p-2 text-center">
          {!openModal && (
            <button
              onClick={() => setOpenModal(true)}
              className="outline-0 border-0 text-xl font-sans font-bold"
            >
              Share
            </button>
          )}
        </div>
      ) : (
        ""
      )}
      <div className="container mx-auto mt-4">
        {account ? <FileUpload account={account} contract={contract} /> : ""}
        <div className="mt-4">
          {account ? <Display account={account} contract={contract} /> : ""}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
