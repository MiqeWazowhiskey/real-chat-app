import React from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
const Profile = ({ name, profilePhoto }) => {
  const { profileStatus, setProfileStatus } = useContext(UserContext);
  return (
    <div className="w-1/4 h-full bg-gradient-to-b from-[#d9ccf1] to-[#7831fc] rounded-l-[12px] text-white">
      {/**Photo Section */}
      <div className="w-full flex justify-center items-center mt-10 flex-col">
        <img
          src={profilePhoto}
          sizes="92x92"
          className="w-48 h-48 rounded-full border-8 border-white"
        />
        <div className="font-bold text-3xl mt-3">{name}</div>
      </div>
      {/**Setting section */}
      <div className="flex h-1/2 flex-col mt-10">
        <button
          className="focus:outline-none"
          onClick={() => setProfileStatus("Chats")}
        >
          <span
            className={`h-[64px] hover:bg-[#925df5] text-xl flex items-center pl-2  ${
              profileStatus === "Chats"
                ? "border-l-4 border-white bg-[#8e56f5]"
                : "border-none"
            }`}
          >
            Chats
          </span>
        </button>
        <button
          className="focus:outline-none"
          onClick={() => setProfileStatus("Settings")}
        >
          <span
            className={`h-[64px] hover:bg-[#8e56f5] bg-[#925df5] text-xl flex items-center pl-2  ${
              profileStatus === "Settings"
                ? "border-l-4 border-white bg-[#8e56f5]"
                : "border-none"
            }`}
          >
            Settings
          </span>
        </button>
      </div>
    </div>
  );
};

export default Profile;
