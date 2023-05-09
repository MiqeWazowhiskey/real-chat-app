import React, { useContext, useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { UserContext } from "../../context/UserContext";
// Create a root reference
const storage = getStorage();

const Uploader = () => {
  const { currentUser } = useContext(UserContext);
  const [photo, setPhoto] = useState(null);
  const handlePhoto = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    } else {
      alert("Please upload a photo");
    }
  };
  const upload = () => {
    if (photo == null) {
      return;
    }
    const photoRef = ref(storage, `images/${currentUser.uid}`);
    uploadBytes(photoRef, photo).then(() => alert("Profile photo changed"));
  };

  return (
    <>
      <label
        style={{ boxShadow: "4px 4px white" }}
        className="inline-block p-5 cursor-pointer w-fit ml-auto bg-[#8e56f5] mr-auto rounded-[12px]"
      >
        Select Photo
        <input
          onChange={(e) => handlePhoto(e)}
          accept="image/jpeg, image/png"
          type="file"
          className="p-5 hidden"
        />
      </label>
      <div className="ml-auto mr-auto w-fit ">
        <button
          onClick={() => upload()}
          className="text-center  mt-[32px]  p-2  focus:outline-none text-gray-400 hover:bg-[#d7d7d7]  bg-[#ffffff] rounded-[12px]"
        >
          Confirm
        </button>
      </div>
    </>
  );
};

export default Uploader;
