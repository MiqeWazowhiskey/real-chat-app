import React from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { useGetPhoto } from "../../hooks/useGetPhoto";
const Profile = ({ name, profilePhoto }) => {
  const { profileStatus, setProfileStatus } = useContext(UserContext);
  return (
    <div className="lg:w-1/4 w-full lg:h-full  h-1/2 bg-gradient-to-b from-[#d9ccf1] to-[#7831fc] lg:rounded-l-[12px] text-white">
      {/**Photo Section */}
      <div className="w-full lg:h-1/3 h-1/2 flex justify-center items-center mt-10 flex-col">
        <img
          src={profilePhoto}
          sizes="92x92"
          className="w-[148px] h-[148px] object-cover rounded-full border-8 border-white"
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
            className={`h-[64px] hover:bg-[#9b69f8] bg-[#8e56f5] text-xl flex items-center pl-2  ${
              profileStatus === "Chats"
                ? "border-l-4 border-white bg-[#9b69f8]"
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
            className={`h-[64px] hover:bg-[#9b69f8] bg-[#8e56f5] text-xl flex items-center pl-2  ${
              profileStatus === "Settings"
                ? "border-l-4 border-white bg-[#9b69f8]"
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
