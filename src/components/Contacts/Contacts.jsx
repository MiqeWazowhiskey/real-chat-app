import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { motion } from "framer-motion";
const Contacts = () => {
  const { users, handleToggle, setSendTo, sendTo, currentUser } =
    useContext(UserContext);
  const handleSelect = (child) => {
    setSendTo({ id: child.id, name: child.name });
    handleToggle();
  };

  return (
    <div
      className="no-scrollbar h-full border-r-2 bg-[#e5e5f0] pt-10 border-[#9c9ca5]"
      style={{ overflowY: "auto" }}
    >
      <div className="w-full h-full flex-col flex items-center">
        {users &&
          users.map((v, i) => {
            return (
              <motion.div
                key={i}
                className=" justif-around w-4/5 m-2"
                whileHover={{ scale: 1.05 }}
              >
                {v.name && v.id != currentUser.uid && (
                  <button
                    onClick={() => {
                      handleSelect({ id: v.id, name: v.name });
                    }}
                    className="focus:outline-none w-full flex items-center gap-x-10 font-bold hover:bg-[#d5d5df] bg-[#ceced8] p-5 rounded-[12px]"
                  >
                    <img
                      sizes="36x36"
                      className="w-[36px] rounded-full  border-2 border-white shadow-inner shadow-black"
                      src="/Hotpot.png"
                    />
                    <span className="w-fit">{v.name.substring(0, 28)}</span>
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
