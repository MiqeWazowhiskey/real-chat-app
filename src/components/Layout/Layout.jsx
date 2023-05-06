import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase";
const Layout = ({ children }) => {
  const { currentUser, setCurrentUser, setUsers, users } =
    useContext(UserContext);
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center bg-[#1B1725] overflow-hidden">
        <div className="lg:w-4/5 w-full h-full lg:h-5/6 bg-[#c3c3cc] rounded-[50px] flex  flex-col lg:flex-row items-center justify-between p-10">
          {children}
        </div>
      </div>
      {/**Logout button */}
      <button
        className="focus:outline-none lg:absolute top-2 right-2 border shadow-inner shadow-black rounded-[12px] p-2 bg-[#681af8] border-[#5015be] text-white h-fit"
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
  );
};

export default Layout;
