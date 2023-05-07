import React, { useState } from "react";

const Uploader = () => {
  const [photo, setPhoto] = useState();
  const handlePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    } else {
      alert("Please upload a photo");
    }
  };
  return (
    <>
      <input
        onChange={(e) => handlePhoto(e)}
        accept="image/jpeg, image/png"
        type="file"
        className="p-5 "
      />
      <div className="ml-auto mr-auto w-1/3 ">
        <button
          onClick={() => console.log(photo)}
          style={{ boxShadow: "4px 4px white" }}
          className="text-center  mt-[32px]  p-2  focus:outline-none  rounded-[12px]"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default Uploader;
