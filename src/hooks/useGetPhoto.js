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
  const photoRef = ref(storage, `images/${userId}.png`);
  useEffect(() => {
    getDownloadURL(photoRef)
      .then((url1) => setPhotoUrl(url1))
      .catch((err) => {});
  }, [storage, userId]);
  return photoUrl;
}
