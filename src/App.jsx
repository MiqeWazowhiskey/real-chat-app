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
        snap.forEach((doc)=>{
          temp.push(doc)
        })
        setUsers(temp)
      })
      return ()=> { unsub() }
    
  },[])
  useEffect(()=>{
 
    if(currentUser && !users.find(v=>{v.email==currentUser.email}))
    {const id = uuidv4()
    const set = async()=>{await setDoc(doc(db,'users',id),{
      name:currentUser.displayName,
      id:id,
      email:currentUser.email
      }).then(()=>{
        const temp = users
        temp.push(currentUser)
        setUsers(temp)
    })  }
    set().catch(console.error)}
  },[])
  return (
  <>
    {currentUser?<Home/>:<Login/>}
  </>
    )
}

export default App
