import { Home } from "./Pages/Home";
import { useContext } from "react";
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
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const { users, setUsers, currentUser, setCurrentUser } =
    useContext(UserContext);
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
        temp.push({ ...doc.data(), id: doc.id });
      });
      setUsers(temp);
    });
    return () => unsub();
  }, []);

  return <>{currentUser ? <Home /> : <Login />}</>;
}

export default App;
