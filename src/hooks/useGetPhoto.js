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
  const [photoUrl, setPhotoUrl] = useState(import.meta.env.VITE_DEFAULT_PHOTO);

  useEffect(() => {
    getDownloadURL(ref(storage, `images/${userId}.png`))
      .then((url1) => setPhotoUrl(url1))
      .catch((err) => {});
  }, [storage]);
  return photoUrl;
}
