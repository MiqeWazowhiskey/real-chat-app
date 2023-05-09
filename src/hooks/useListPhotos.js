/* Bad performance it might improved, then it will be not useless.


import { getMetadata, ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useState, useCallback, useEffect } from "react";
const listRef = ref(storage, "images/");
export function useListPhotos() {
  const [allPhotos, setAllPhotos] = useState([]);
  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        res.prefixes.forEach((folderRef) => {
          // All the prefixes under listRef.
          // You may call listAll() recursively on them.
        });
        res.items.forEach((itemRef) => {
          // All the items under listRef.

          getMetadata(itemRef)
            .then((metaData) => {
              setAllPhotos([...allPhotos, metaData.name]);
            })
            .catch((err) => {});
        });
      })
      .catch((error) => {
        // Uh-oh, an error occurred!
        return allPhotos;
      });
  }, []);
  return allPhotos;
}
*/
