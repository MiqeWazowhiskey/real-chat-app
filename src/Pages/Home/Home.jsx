import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { Layout } from "../../components/Layout";
import { Room } from "../../components/Room";
import { doc, setDoc } from "firebase/firestore";
import { Contacts } from "../../components/Contacts";
import { BiMessageDetail as Message } from "react-icons/bi";
import TextSection from "../../components/TextSection";
import Profile from "../../components/Profile";
import Settings from "../../components/Settings";
const Home = () => {
  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    handleToggle,
    profileStatus,
    sendTo,
  } = useContext(UserContext);

  return (
    <Layout>
      {/**Profile Section */}
      <Profile name={currentUser.displayName} profilePhoto={"/Hotpot.png"} />
      {/**Contacts Section */}
      {profileStatus === "Chats" ? (
        <div className="lg:w-1/4 w-full h-full mr-auto ">
          <Contacts />
        </div>
      ) : (
        <Settings />
      )}
      {/**Message room */}
      <div className="w-2/4 lg:flex hidden flex-col p-5 h-full bg-[#e5e5f0] rounded-r-[12px]">
        <button className="focus:outline-none">
          <h2 className="text-2xl font-bold w-full text-center lg:p-2 px-2 text-[#1B1725] brightness-200 ">
            {sendTo.id.length > 1 ? (
              sendTo.name
            ) : (
              <p className="text-md font-medium brightness-0">
                Please select user to message.
              </p>
            )}
          </h2>
          <span className="lg:hidden">
            <button onClick={handleToggle}>
              <Message
                size={32}
                className="text-[#9D68FF] border-2 border-[#9D68FF]"
                style={{ boxShadow: "3px 3px black" }}
              />
            </button>
          </span>
        </button>
        <Room />
        <TextSection />
      </div>
    </Layout>
  );
};

export default Home;
