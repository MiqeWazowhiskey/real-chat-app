import { collection, deleteDoc, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import React,{ useEffect, useState} from 'react'
import { db } from '../../firebase'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import {BsFillTrashFill as Trash} from 'react-icons/bs'
import {FcLike,FcLikePlaceholder} from 'react-icons/fc'

  
const Room = () => {
  /*to change something for all docs
    useEffect(()=>{
      const q = query(collection(db,'room'))
        const unsub = onSnapshot(q,(snapshot)=>{
          snapshot.forEach(data=>{
            setDoc(doc(db,'room',data.id),{
              messageId: data.data().sendTo + data.data().sendFrom,
              liked:false
            },{merge: true}).then(()=>console.log('success'))
          })
          
        })
        return ()=> unsub() 
    },[])
    */
    const{messages,setMessages,currentUser,sendTo,messagesEndRef}= useContext(UserContext)

    useEffect(()=>{
        const q = query(collection(db,'room'),where('messageId', 'in',[sendTo.id+currentUser.uid , currentUser.uid+sendTo.id]))
        const unsub = onSnapshot(q,(snapshot)=>{
          const temp =[]
          snapshot.forEach(doc=>{
            temp.push({...doc.data(), id:doc.id })
          })
          setMessages(temp)
        })
        return ()=> unsub() 
        
      },[sendTo])
      //scroll bottom
      useEffect(()=>{
        document.getElementById('room').scrollTop = document.getElementById('room').scrollHeight
      },[messages])
      const func =async(id,messageId)=>{await setDoc(doc(db,'rooms',id),{
        messageId: messageId
      })}
  return (
    <>
    <div id='room' ref={messagesEndRef} style={{overflowY:'auto'}} className='h-full w-full m-6 space-y-1 '>
        {messages.slice(0).sort((a,b)=>{return parseFloat(a.time)-parseFloat(b.time)}).map((v,i)=>{
            return(
                <div key={i}>
                { ( v.sendTo==currentUser.uid && v.sendFrom == sendTo.id || v.sendTo == sendTo.id && v.sendFrom == currentUser.uid) &&
                  <div className={ `flex flex-col w-full ${v.sendFrom == currentUser.uid ? 'items-end':'items-start'} `} >
                    <div className={`w-1/2 text-ellipsis min-w-[200px] p-3 my-1 border-2 border-[#9D68FF] rounded-[32px]    ${v.sendFrom == currentUser.uid ? 'items-end bg-white ':'items-start bg-opacity-20 bg-[#9D68FF]'} `} >
                        
                        <p className='text-xl' >{v.message}</p>
                        
                        <div className='flex flex-row items-center'>
                        <div className='p-4'><button onClick={
                          
                          async()=>{
                            await updateDoc(doc(db,'room',v.id),{
                              liked: !v.liked
                            })
                          }
                            }>{v.liked?<FcLike/>:<FcLikePlaceholder/>}</button></div>

                          <div>
                            <p className=' text-xs w-full text-opacity-40 text-black'>{v.name}</p>
                            <p className=' text-xs w-full text-opacity-40 text-black'>{
                                new Date(v.time * 1000).toLocaleDateString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                                })}
                            </p>
                          </div>
                            
                            
                              <button onClick={()=>{
                              
                              if(v.sendFrom === currentUser.uid && confirm('Delete message...')==true)
                              {
                                
                                deleteDoc(doc(db,'room',v.id))
                              }
                              }} className='text-black text-opacity-25 text-xs focus:outline-none w-4 rounded-full ml-auto h-fit my-auto'><span><Trash size={14}/></span></button>
                        </div>
                        

                    </div>  
                </div>}
                </div>
            )
        })}
       
    </div>
    </>
  )
}

export default Room