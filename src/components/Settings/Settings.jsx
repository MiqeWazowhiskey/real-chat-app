import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase";
const Settings = () => {
  const { setCurrentUser, setUsers, users, currentUser } =
    useContext(UserContext);
  const [moveToInput, setMoveToInput] = useState(false);
  return (
    <div className="flex flex-col w-1/4 h-full gap-y-1 p-3  bg-gradient-to-b from-[#d9ccf1] to-[#7831fc] border-l-2 text-white text-xl  ">
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
          <button
            className="w-full   p-5 focus:outline-none hover:bg-[#9b69f8] bg-[#8e56f5] text-start rounded-[12px]"
            onClick={async () => {
              if (currentUser) {
                auth.signOut();
                const tempUsers = users.filter((v) => {
                  v != currentUser;
                });
                setCurrentUser(null);
                setUsers(tempUsers);
              }
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setMoveToInput(false)}
            className="text-center w-1/6   p-5 focus:outline-none   rounded-[12px]"
          >
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button className="text-center w-full mt-[32px]  p-5 focus:outline-none hover:bg-[#9b69f8] bg-[#8e56f5] rounded-[12px]">
            Select Photo
          </button>
          <div className="ml-auto mr-auto w-1/3 ">
            <button
              style={{ boxShadow: "4px 4px white" }}
              className="text-center  mt-[32px]  p-2  focus:outline-none  rounded-[12px]"
            >
              Confirm
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
