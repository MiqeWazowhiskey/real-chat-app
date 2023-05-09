import React, { useState, useRef, useContext } from "react";
import { IoIosSend as Sendicon } from "react-icons/io";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from "../../context/UserContext";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../firebase";

const TextSection = () => {
  const { sendTo, currentUser } = useContext(UserContext);
  const [type, setType] = useState("");
  const ref = useRef(null);
  function handleEnter(e) {
    if (e.key === "Enter") {
      const set = async () => {
        const id = uuidv4();
        if (sendTo.id.length > 1 && type.length > 0) {
          await setDoc(doc(db, "room", id), {
            id: id,
            sendFrom: currentUser.uid,
            sendTo: sendTo.id,
            messageId: currentUser.uid + sendTo.id,
            message: type,
            liked: false,
            name: currentUser.displayName,
            time: Math.floor(Date.now() / 1000),
          }).then(() => {
            document.getElementById("text").value = "";
          });
        }
      };
      set().then(setType(""));
    }
  }
  return (
    <div className="w-full flex-row flex gap-x-5 items-center justify-center rounded-md text-white">
      <input
        onChange={(e) => setType(e.target.value)}
        id="text"
        ref={ref}
        onKeyDown={handleEnter}
        autoComplete="off"
        className="bg-[#252020] bg-opacity-30 rounded-md focus:outline-none w-3/4 p-2"
        style={{ height: "64px" }}
      />
      <span>
        <button
          className="disabled:bg-[#8366ba] bg-[#9D68FF] text-white border rounded-full p-2 items-center flex"
          disabled={sendTo.id.length < 1}
          onClick={async () => {
            const id = uuidv4();
            if (sendTo.id.length > 1 && type.length > 0) {
              await setDoc(doc(db, "room", id), {
                id: id,
                sendFrom: currentUser.uid,
                sendTo: sendTo.id,
                messageId: currentUser.uid + sendTo.id,
                message: type,
                name: currentUser.displayName,
                time: Math.floor(Date.now() / 1000),
              })
                .then(() => {
                  document.getElementById("text").value = "";
                })
                .then(setType(""));
            }
          }}
        >
          <Sendicon size={30} />
        </button>
      </span>
    </div>
  );
};

export default TextSection;
