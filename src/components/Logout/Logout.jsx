import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../firebase";
const Logout = () => {
  const { setCurrentUser, setUsers, users, currentUser } =
    useContext(UserContext);

  return (
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
  );
};

export default Logout;
