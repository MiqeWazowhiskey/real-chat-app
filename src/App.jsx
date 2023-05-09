import { Home } from "./Pages/Home";
import { useCallback, useContext, useState } from "react";
import { auth, db } from "../src/firebase";
import { useEffect } from "react";
import { Login } from "./components/Login";
import { UserContext } from "./context/UserContext";
import { v4 as uuidv4 } from "uuid";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import MobileHome from "./Pages/MobileHome/MobileHome";
import { useGetPhoto } from "./hooks/useGetPhoto";
function App() {
  const { setUsers, currentUser, setCurrentUser } = useContext(UserContext);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setCurrentUser(authUser);
        const set = async () => {
          await setDoc(doc(db, "users", authUser.uid), {
            name: authUser.displayName,
            id: authUser.uid,
            email: authUser.email,
          });
        };
        set().catch(console.error);
      }
    });
  }, []);
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsub = onSnapshot(q, (snap) => {
      const temp = [];
      snap.forEach((doc) => {
        temp.push({
          ...doc.data(),
        });
      });
      setUsers(temp);
    });
    return () => unsub();
  }, []);
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  //check if user in mobile
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(
        userAgent
      )
    ) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }, [userAgent]);
  return <>{currentUser ? mobile ? <MobileHome /> : <Home /> : <Login />}</>;
}

export default App;
