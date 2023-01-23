import { Home } from './Pages/Home'
import { useContext } from 'react'
import { auth, db } from '../src/firebase'
import { useEffect } from 'react'
import { Login } from './components/Login'
import { UserContext } from './context/UserContext'
import { v4 as uuidv4 } from 'uuid';
import { collection, doc, getDoc, onSnapshot, query, setDoc } from 'firebase/firestore'

function App() {
  const{users,setUsers,currentUser,setCurrentUser}=useContext(UserContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        setCurrentUser(authUser)
      }
    })
  },[])
  useEffect(()=>{
      const q = query(collection(db,'users'))
      const unsub = onSnapshot(q,(snap)=>{
        const temp = []
        snap.forEach(doc=>{
          temp.push({...doc.data(), id:doc.id })
        })
        setUsers(temp)
      })
      return ()=>  unsub() 
    
  },[])
  useEffect(()=>{
    const tempUser = users
    if(currentUser && !tempUser.includes(v=>v.id==currentUser.uid))
    {
      const addedUser = {
        name:currentUser.displayName,
        id:currentUser.uid,
        email:currentUser.email
        }
    const set = async()=>{await setDoc(doc(db,'users',currentUser.uid),addedUser).then(()=>{
        const temp = users
        temp.push(addedUser)
        setUsers(addedUser)
    })}
    set().catch(console.error)}
  },[])
  return (
  <>
    {currentUser? <Home/>:<Login/>}
  </>
    )
}

export default App
