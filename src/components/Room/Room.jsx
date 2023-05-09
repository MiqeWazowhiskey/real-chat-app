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
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Message from "../Message";
import { useGetPhoto } from "../../hooks/useGetPhoto";
const Room = () => {
  /*to change something for all docs
    useEffect(()=>{
      const q = query(collection(db,'room'))
        const unsub = onSnapshot(q,(snapshot)=>{
          snapshot.forEach(data=>{
            setDoc(doc(db,'room',data.id),{
              messageId: data.data().sendTo + data.data().sendFrom,
              liked:false
            },{merge: true}).then(()=>console.log('success'))
          })
          
        })
        return ()=> unsub() 
    },[])
    */
  const { messages, setMessages, currentUser, sendTo, messagesEndRef } =
    useContext(UserContext);
  useEffect(() => {
    const q = query(
      collection(db, "room"),
      where("messageId", "in", [
        sendTo.id + currentUser.uid,
        currentUser.uid + sendTo.id,
      ])
    );
    const unsub = onSnapshot(q, (snapshot) => {
      const temp = [];
      snapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setMessages(temp);
    });
    return () => unsub();
  }, [sendTo]);
  //scroll bottom
  useEffect(() => {
    document.getElementById("room").scrollTop =
      document.getElementById("room").scrollHeight;
  }, [messages]);

  return (
    <>
      <div
        id="room"
        ref={messagesEndRef}
        style={{ overflowY: "auto" }}
        className="h-full w-full m-6 space-y-1 no-scrollbar"
      >
        {messages
          .slice(0)
          .sort((a, b) => {
            return parseFloat(a.time) - parseFloat(b.time);
          })
          .map((v, i) => {
            console.log(v);
            return (
              <span key={i}>
                <Message
                  message={v.message}
                  from={v.sendFrom}
                  id={v.id}
                  time={v.time}
                  like={v.liked}
                />
              </span>
            );
          })}
      </div>
    </>
  );
};

export default Room;
