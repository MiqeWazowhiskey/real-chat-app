import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../../context/UserContext";
import { Layout } from "../../components/Layout";
import { Room } from "../../components/Room";
import { doc, setDoc } from "firebase/firestore";
import { Contacts } from "../../components/Contacts";
import TextSection from "../../components/TextSection";
import Profile from "../../components/Profile";
import Settings from "../../components/Settings";
import { useGetPhoto } from "../../hooks/useGetPhoto";
import UserPhoto from "../../components/UserPhoto";
const MobileHome = () => {
  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    handleToggle,
    profileStatus,
    sendTo,
    setSendTo,
    contact,
    setContact,
  } = useContext(UserContext);
  const profilePhoto = useGetPhoto(currentUser.uid);

  return (
    <Layout>
      {!contact ? (
        <>
          {/**Profile Section */}
          <Profile name={currentUser.displayName} profilePhoto={profilePhoto} />
          {/**Contacts Section */}
          {profileStatus === "Chats" ? (
            <div className="lg:w-1/4 w-full lg:h-full min-h-1/2 overflow-auto mr-auto">
              <Contacts />
            </div>
          ) : (
            <Settings />
          )}
        </>
      ) : (
        <div className="lg:w-2/4 w-full flex flex-col p-5 h-full bg-[#e5e5f0] ">
          <div className="flex flex-row">
            <div>
              <h2 className="mt-8 text-2xl font-bold w-full text-center lg:p-2 px-2 text-[#1B1725] ">
                {sendTo.id.length > 1 ? (
                  <div className="flex items-center gap-x-5">
                    <UserPhoto userId={sendTo.id} className={"w-16 h-16"} />
                    {sendTo.name}
                  </div>
                ) : (
                  <p className="text-md font-medium brightness-0">
                    Please select user to message...
                  </p>
                )}
              </h2>
            </div>

            <span className="text-[#8e56f5] lg:hidden w-fit absolute top-2 left-2">
              <button onClick={handleToggle}>
                <i className="fa-solid fa-arrow-left text-2xl"></i>
              </button>
            </span>
          </div>
          <Room />
          <TextSection />
        </div>
      )}
    </Layout>
  );
};

export default MobileHome;
