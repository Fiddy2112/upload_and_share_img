import Image from "next/image";
import React, { useState } from "react";

function Display({ contract, account }) {
  const [data, setData] = useState("");

  const getData = async () => {
    let dataArray;
    try {
      dataArray = await contract.display(account);
    } catch (err) {
      console.log(err);
    }

    const isEmpty = Object.keys(dataArray).length == 0;

    if (!isEmpty) {
      const images = dataArray.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank" className="">
            <Image key={i} src={item} alt="new" width={350} height={350} />
          </a>
        );
      });
      setData(images);
    }
  };

  return (
    <>
      <div className="flex items-center flex-col p-2 text-gray-500">
        <div className="flex items-center justify-center p-2 bg-white rounded-md mb-2">
          <input
            className="w-[400px] pl-2 outline-0 border-0 text-black"
            type="text"
            placeholder={account}
          />
          <button
            className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={getData}
          >
            Get Data
          </button>
        </div>
        <div className="grid grid-cols-1 grid-rows-1">{data}</div>
      </div>
    </>
  );
}

export default Display;
