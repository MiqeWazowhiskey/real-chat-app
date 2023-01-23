import { Home } from './Pages/Home'
import { useState,useContext } from 'react'
import { auth, db } from '../src/firebase'
import { useEffect } from 'react'
import { Login } from './components/Login'
import { UserContext } from './context/UserContext'
import { setDoc } from 'firebase/firestore'
import { uuidv4 } from '@firebase/util'
function App() {
  const{users,setUsers,currentUser,setCurrentUser}=useContext(UserContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        try{
          setCurrentUser(authUser)
          const id = uuidv4()
          async()=> {await setDoc(db,'users',id,{
            name:authUser.displayName,
            id:id,
            email:authUser.email
          })
        }
        }
        catch(err){
          console.log(err)
        }
      }
    })
  },[])
  return (
  <>
    {currentUser?<Home/>:<Login/>}
  </>
    )
}

export default App
