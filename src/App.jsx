import { Home } from './Pages/Home'
import { useState,useContext } from 'react'
import { auth } from '../src/firebase'
import { useEffect } from 'react'
import { Login } from './components/Login'
import { UserContext } from './context/UserContext'
function App() {
  const{users,setUsers,currentUser,setCurrentUser}=useContext(UserContext)
  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        const tempUsers = users
        tempUsers.push(authUser)
        setUsers(tempUsers)
        setCurrentUser(authUser)
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
