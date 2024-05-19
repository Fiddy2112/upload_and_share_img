import { truncate } from "@/utils/Features";
import React, { useEffect, useState } from "react";

function Modal({ setOpenModal, contract, account }) {
  const [shareList, setShareList] = useState([]);
  const [address, setAddress] = useState("");

  const sharing = async () => {
    await contract.allow(address);
    setOpenModal(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const shares = await contract.shareAccess();
      setShareList(shares.map((share) => share.user));
    };
    contract && accessList();
  }, [contract]);
  return (
    <>
      <div
        className="absolute top-1/2 left-1/2 w-[350px] bg-[#2d3436] p-2 z-10"
        style={{ transform: "translate(-50%,-50%)" }}
      >
        <div>
          <h3 className="text-xl uppercase font-sans font-bold text-center mb-2">
            Share
          </h3>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="w-full h-8 outline-0 border-0 text-black px-1 address"
              placeholder={truncate(account)}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div>
              <select className="w-full text-black outline-0 border-0 font-sans p-2">
                <option className="w-full overflow-hidden" defaultValue>
                  People With Access
                </option>
                {shareList.map((option, i) => (
                  <option
                    className=" w-full overflow-hidden"
                    value={option}
                    key={i}
                  >
                    {truncate(option)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-2 justify-between ">
          <button
            onClick={() => setOpenModal(false)}
            className=" text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 "
          >
            Cancel
          </button>
          <button
            onClick={sharing}
            className=" text-white bg-green-700 hover:bg-green-800 focus:ring-4  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
          >
            Share
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
