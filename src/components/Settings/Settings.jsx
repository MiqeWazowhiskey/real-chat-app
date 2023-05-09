import React, { useState } from "react";
import Uploader from "../Uploader";
import Logout from "../Logout";
const Settings = () => {
  const [moveToInput, setMoveToInput] = useState(false);

  return (
    <div className="flex flex-col lg:w-1/4 w-full lg:h-full h-1/2 gap-y-1 p-3  bg-gradient-to-b from-[#d9ccf1] to-[#7831fc] lg:border-l-2 text-white text-xl  ">
      {!moveToInput ? (
        <>
          <button
            onClick={() => {
              setMoveToInput(true);
            }}
            className="w-full  p-5 focus:outline-none hover:bg-[#9b69f8] bg-[#8e56f5] text-start rounded-[12px]"
          >
            Change Profile Photo
          </button>
          <Logout />
        </>
      ) : (
        <>
          <button
            onClick={() => setMoveToInput(false)}
            className="text-center w-1/6   p-5 focus:outline-none   rounded-[12px]"
          >
            <i className="fa-solid fa-arrow-left"></i>
          </button>{" "}
          <Uploader />
        </>
      )}
    </div>
  );
};

export default Settings;
