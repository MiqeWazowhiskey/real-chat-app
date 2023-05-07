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
      <input
        onChange={(e) => handlePhoto(e)}
        accept="image/jpeg, image/png"
        type="file"
        className="p-5 "
      />
      <div className="ml-auto mr-auto w-1/3 ">
        <button
          onClick={() => upload()}
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
