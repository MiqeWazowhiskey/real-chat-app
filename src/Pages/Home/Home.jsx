import React,{ useContext, useEffect } from 'react'
import { auth, db } from '../../firebase'
import { UserContext } from '../../context/UserContext'
import { Layout } from '../../components/Layout'
import { v4 as uuidv4 } from 'uuid';
import {IoIosSend as Sendicon} from 'react-icons/io'
import { Room } from '../../components/Room'
import { collection, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { useState } from 'react';



const Home = () => {
  const{users,setUsers,currentUser,setCurrentUser,setMessages}=useContext(UserContext)
  /*window.onbeforeunload = ()=>{
    auth.signOut()
    const tempUsers = users.filter(v=>{v!=currentUser})
    setCurrentUser(null)
    setUsers(tempUsers)
  }
  */
  const [type,setType]= useState('')
  
  return (
    <Layout>
        <div className='lg:w-1/3 w-full h-full lg:h-5/6 bg-[#BBBBBB] rounded-[50px] flex flex-col items-center justify-between shadow-inner shadow-black border-4 border-[#E3596D] p-10'>
            <div className='w-full justify-between'>
              <span className='border rounded-[50px] p-2 text-white bg-opacity-20 bg-[#E3596D]'>
                <button className='focus:outline-none' onClick={async()=>{
                  if(currentUser){
                  auth.signOut()
                  const tempUsers = users.filter(v=>{v!=currentUser})
                  setCurrentUser(null)
                  setUsers(tempUsers)
                }
                }}>
                  Logout
                </button>
              </span>
            </div>
            <Room/>
            <div className='w-full flex-row flex gap-x-5 items-center rounded-md'>
             <input onChange={(e)=>setType(e.target.value)} id='text' className='bg-[#252020] bg-opacity-30 rounded-md focus:outline-none w-full p-2'  style={{height:'64px'}}/>
             <span className='bg-[#E3596D] text-white border rounded-full p-2 items-center flex'>
                <button onClick={async()=>{
                  const id = uuidv4()
                  await setDoc(doc(db, "room",id ), {
                    id:id,
                    email:currentUser.email,
                    message: type,
                    name: currentUser.displayName,
                    time: new Date().getTime(),
                  });
                }}>
                  <Sendicon size={30}/>
                </button>
              </span>
            </div>
            
            
        </div>
        
        
    </Layout>
  )
}

export default Home