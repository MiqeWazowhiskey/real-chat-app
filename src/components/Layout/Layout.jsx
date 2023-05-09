import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase";
const Layout = ({ children }) => {
  const { currentUser, setCurrentUser, setUsers, users } =
    useContext(UserContext);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#1B1725] overflow-hidden">
        <div className=" w-full h-full bg-[#c3c3cc] rounded-[50px] flex  flex-col lg:flex-row items-center justify-between">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
