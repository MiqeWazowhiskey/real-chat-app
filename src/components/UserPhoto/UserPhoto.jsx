import React from "react";
import { useGetPhoto } from "../../hooks/useGetPhoto";
const UserPhoto = ({ userId }) => {
  let pp = useGetPhoto(userId);
  if (pp == undefined) {
    pp = "/Hotpot.png";
  }
  console.log(pp);
  return (
    <img
      id="contactPhoto"
      sizes="36x36"
      className="w-[48px] h-[48px] rounded-[50px]  object-cover border-2 border-white shadow-inner shadow-black"
      src={pp}
    />
  );
};
export default UserPhoto;
