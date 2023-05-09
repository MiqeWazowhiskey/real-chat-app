import React from "react";
import { useGetPhoto } from "../../hooks/useGetPhoto";
const UserPhoto = ({ userId, className }) => {
  let pp = useGetPhoto(userId);
  if (pp == undefined) {
    pp = "/Hotpot.png";
  }
  console.log(pp);
  return (
    <img
      id="contactPhoto"
      sizes="36x36"
      className={`w-[64px] h-[48px] rounded-full  object-cover border-2 border-white shadow-inner shadow-black ${className}`}
      src={pp}
    />
  );
};
export default UserPhoto;
