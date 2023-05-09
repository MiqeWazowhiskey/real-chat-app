import React, { useEffect } from "react";
import { useGetPhoto } from "../../hooks/useGetPhoto";
const UserPhoto = ({ userId, className }) => {
  let pp = useGetPhoto(userId);
  if (pp == undefined) {
    pp = "/Hotpot.png";
  }

  return (
    <div className={` w-[64px]  h-[48px] ${className}`}>
      <img
        id="contactPhoto"
        className={` w-full h-full rounded-full  object-cover border-2 border-white shadow-inner block shadow-black `}
        src={pp}
      />
    </div>
  );
};
export default UserPhoto;
