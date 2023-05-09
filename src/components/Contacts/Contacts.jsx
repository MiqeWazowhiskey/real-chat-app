import React, { useContext, useEffect, useCallback } from "react";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import { useGetPhoto } from "../../hooks/useGetPhoto";
import UserPhoto from "../UserPhoto";

const Contacts = () => {
  const { users, handleToggle, setSendTo, currentUser } =
    useContext(UserContext);
  const handleSelect = (child) => {
    setSendTo({ id: child.id, name: child.name });
    handleToggle();
  };

  return (
    <div
      className="no-scrollbar h-full border-r-2 pb-3 pt-3 bg-[#e5e5f0] border-[#9c9ca5] "
      style={{ overflowY: "auto" }}
    >
      <div className="w-full  h-fit flex-col flex items-center">
        {users &&
          users.map((v, i) => {
            return (
              <motion.div
                key={i}
                className="w-5/6 m-2"
                whileHover={{ scale: 1.05 }}
              >
                {v.name && v.id != currentUser.uid && (
                  <button
                    onClick={() => {
                      handleSelect({ id: v.id, name: v.name });
                    }}
                    className="focus:outline-none w-full flex items-center gap-x-10 font-bold hover:bg-[#d5d5df] bg-[#ceced8] p-5 rounded-[12px]"
                  >
                    <UserPhoto userId={v.id} />
                    <span className="w-full text-start text-sm">
                      {v.name.substring(0, 28)}
                    </span>
                  </button>
                )}
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};

export default Contacts;
