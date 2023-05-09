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

export function useGetPhoto(png) {
  const [uri, setUri] = useState(import.meta.env.VITE_DEFAULT_PNG);
  getDownloadURL(ref(storage, `images/${png}`))
    .then((url) => {
      setUri(url);
    })
    .catch(() => {
      setUri(import.meta.env.VITE_DEFAULT_PNG);
    });

  return uri;
}
