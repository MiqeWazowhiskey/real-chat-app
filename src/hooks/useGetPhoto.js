import { useEffect, useState, useMemo, useCallback } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  getMetadata,
} from "firebase/storage";
import { storage } from "../firebase";

export function useGetPhoto(userId) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const pngStorageRef1 = ref(storage, `images/${userId}.png`);
    const jpegStorageRef1 = ref(storage, `images/${userId}.jpeg`);
    const pngStorageRef2 = ref(storage, `images/${userId}.PNG`);
    const jpegStorageRef2 = ref(storage, `images/${userId}.JPEG`);

    const fetchPhotoUrl = async () => {
      try {
        const pngUrl = await getDownloadURL(pngStorageRef1);
        setPhotoUrl(pngUrl);
      } catch (error) {
        try {
          const pngUrl2 = await getDownloadURL(pngStorageRef2);
          setPhotoUrl(pngUrl2);
        } catch (error) {
          try {
            const jpegUrl1 = await getDownloadURL(jpegStorageRef1);
            setPhotoUrl(jpegUrl1);
          } catch (error) {
            try {
              const jpegUrl2 = await getDownloadURL(jpegStorageRef2);
              setPhotoUrl(jpegUrl2);
            } catch (error) {
              setPhotoUrl(import.meta.env.VITE_DEFAULT_PHOTO);
            }
          }
        }
      }
    };

    fetchPhotoUrl();
  }, [userId]);

  return photoUrl;
}
