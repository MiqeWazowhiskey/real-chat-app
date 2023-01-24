import React,{ useContext, useRef } from 'react'
import { auth, db } from '../../firebase'
import { UserContext } from '../../context/UserContext'
import { Layout } from '../../components/Layout'
import { v4 as uuidv4 } from 'uuid';
import {IoIosSend as Sendicon} from 'react-icons/io'
import { Room } from '../../components/Room'
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Contacts } from '../../components/Contacts';
import {BiMessageDetail as Message} from 'react-icons/bi'
const Home = () => {
  const{users,setUsers,currentUser,setCurrentUser,handleToggle,contact,sendTo}=useContext(UserContext)
  
 
  const ref = useRef(null)

  function handleEnter (e){
    if(e.key === 'Enter'){
      const set = async()=>{
        const id = uuidv4()
                  if(sendTo.id.length>1){
                  await setDoc(doc(db, "room",id ), {
                    id:id,
                    sendFrom:currentUser.uid,
                    sendTo:sendTo.id,
                    messageId: currentUser.uid+sendTo.id,
                    message: type,
                    liked:false,
                    name: currentUser.displayName,
                    time: Math.floor(Date.now() / 1000),
                  }).then(()=>{document.getElementById('text').value = ''})
                }
      }
      set()
    }
  }
  const [type,setType]= useState('')
  return (
    <Layout>
        {contact
        ? 
        <div className='w-full h-full '>
          <div className='w-full flex justify-center'>
            <span>
              <button onClick={handleToggle} className='rounded-full font-bold text-2xl text-[#E3596D] w-6 focus:outline-none'>X</button>
            </span>
          </div>
        <Contacts/>
        </div>
        :
          <>
            <button className='w-full flex justify-between items-center'>
              <span className='border rounded-[50px] p-2 text-white h-fit'>
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
              <h2 className='text-2xl font-bold w-full text-center lg:p-2 px-2 text-[#1B1725] brightness-200 '>{sendTo.id.length>1 ? sendTo.name :<p className='text-md font-medium brightness-0'>Please select user to message.</p>}</h2>
              <span>
                <button onClick={()=>{
                  handleToggle()
                  if(currentUser)
                    {
                    const set = async()=>{await setDoc(doc(db,'users',currentUser.uid),{
                        name:currentUser.displayName,
                        id:currentUser.uid,
                        email:currentUser.email
                        })
                      }
                    set().catch(console.error)
                  }
                }}>
                  <Message size={32} className='text-[#9D68FF] border-2 border-[#9D68FF]' style={{boxShadow:'3px 3px black'}} />
                </button>
              </span>
            </button>
              <Room />
            <div className='w-full flex-row flex gap-x-5 items-center rounded-md'>
             <input onChange={(e)=>setType(e.target.value)} id='text' ref={ref} onKeyDown={handleEnter} autoComplete='off' className='bg-[#252020] bg-opacity-30 rounded-md focus:outline-none w-full p-2'  style={{height:'64px'}}/>
             <span>
                <button className='disabled:bg-[#8366ba] bg-[#9D68FF] text-white border rounded-full p-2 items-center flex' disabled={sendTo.id.length<1} onClick={async()=>{
                  const id = uuidv4()
                  if(sendTo.id.length>1){
                  await setDoc(doc(db, "room",id ), {
                    id:id,
                    sendFrom:currentUser.uid,
                    sendTo:sendTo.id,
                    messageId: currentUser.uid+sendTo.id,
                    message: type,
                    name: currentUser.displayName,
                    time: Math.floor(Date.now() / 1000),
                  }).then(()=>{document.getElementById('text').value = ''})
                }
                }}>
                  <Sendicon size={30}/>
                </button>
              </span>
            </div>
          </>
            
        }
        
        
    </Layout>
  )
}

export default Home