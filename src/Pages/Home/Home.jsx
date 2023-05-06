import React, { useContext, useEffect, useRef } from "react";
import { db } from "../../firebase";
import { UserContext } from "../../context/UserContext";
import { Layout } from "../../components/Layout";
import { v4 as uuidv4 } from "uuid";
import { Room } from "../../components/Room";
import { doc, setDoc } from "firebase/firestore";
import { Contacts } from "../../components/Contacts";
import { BiMessageDetail as Message } from "react-icons/bi";
import TextSection from "../../components/TextSection";
import Profile from "../../components/Profile";
const Home = () => {
  const {
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    handleToggle,
    contact,
    sendTo,
    mobile,
    setMobile,
  } = useContext(UserContext);
  //check if user in mobile
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(
        userAgent
      )
    ) {
      setMobile(true);
    } else {
      setMobile(true);
    }
  }, []);
  return (
    <Layout>
      {/**Profile Section */}
      <Profile name={currentUser.displayName} profilePhoto={"/Hotpot.png"} />
      {/**Contacts Section */}
      <div className="lg:w-1/4 w-full h-full mr-auto ">
        <Contacts />
      </div>
      {/**Message room */}
      <div className="w-2/4 lg:flex hidden flex-col p-5 h-full bg-[#e5e5f0] rounded-r-[12px]">
        <button>
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
