import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { BsFillTrashFill as Trash } from "react-icons/bs";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
const Message = ({ from, message, time, id, like }) => {
  const { currentUser } = useContext(UserContext);
  return (
    <div className={`flex flex-col w-full `}>
      <div
        className={`w-fit max-w-[80%] p-5 rounded-[12px] mr-[3px] ${
          from == currentUser.uid
            ? "ml-auto bg-[#681af8] text-white"
            : " bg-[#e5e5f0] text-gray-800"
        }`}
      >
        {/**Message */}

        <div>{message}</div>
      </div>
      {/**Info Section */}

      <div
        className={`flex flex-row items-center gap-x-1 text-[10px] text-center w-fit text-[#a0a0a0] mt-[5px] mb-[5px] ${
          from == currentUser.uid ? "ml-auto " : "mr-auto"
        }`}
      >
        {/**Time */}

        <div
          className={`flex flex-col text-[10px] text-center w-fit text-[#a0a0a0] mt-[5px] mb-[5px] ${
            from == currentUser.uid ? "ml-auto " : "mr-auto"
          }`}
        >
          <span>
            {new Date(time * 1000).toLocaleDateString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        {/**Like status */}

        <button
          onClick={async () => {
            await updateDoc(doc(db, "room", id), {
              liked: !like,
            });
          }}
          className={` text-xs focus:outline-none w-4 h-fit ${
            from == currentUser.uid ? "hidden " : "flex"
          }`}
        >
          {like ? <FcLike size={14} /> : <FcLikePlaceholder size={14} />}
        </button>

        {/**Delete */}

        <button
          onClick={() => {
            if (
              from === currentUser.uid &&
              confirm("Delete message...") == true
            ) {
              deleteDoc(doc(db, "room", id));
            }
          }}
          className={` text-black text-opacity-50 text-xs focus:outline-none w-4 h-fit ${
            from == currentUser.uid ? "flex " : "hidden"
          }`}
        >
          <div>
            <Trash size={14} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Message;
