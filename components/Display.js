import { truncate } from "@/utils/Features";
import Image from "next/image";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Display({ contract, account }) {
  const [data, setData] = useState("");
  const [address, setAddress] = useState("");

  const getData = async () => {
    let dataArray;
    try {
      if (address) {
        dataArray = await contract.display(address);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (err) {
      console.log(err);
    }

    const isEmpty = Object.keys(dataArray).length == 0;

    if (!isEmpty && dataArray) {
      const images = dataArray.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" className="">
            <Image key={i} src={item} alt="new" width={250} height={250} />
          </a>
        );
      });
      setData(images);
    } else {
      toast.error("No Images");
    }
  };

  return (
    <>
      <div className="flex items-center flex-col p-2 text-gray-500">
        <div className="flex items-center justify-center gap-4 p-2 bg-white rounded-md mb-2">
          <input
            className="lg:w-[400px] w-full pl-2 outline-0 border-0 text-black"
            type="text"
            placeholder={truncate(account)}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="min-w-28 lg:w-[100px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={getData}
          >
            Get Data
          </button>
        </div>
        <div className="grid gap-2 lg:grid-cols-3 grid-cols-1 grid-rows-1">
          {data}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Display;
