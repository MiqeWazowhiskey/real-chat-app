import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React,{useEffect} from 'react'
import { db } from '../../firebase'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import {BsFillTrashFill as Trash} from 'react-icons/bs'
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  

const Room = () => {
    const{messages,setMessages,currentUser,sendTo}= useContext(UserContext)
    useEffect(()=>{
        const q = query(collection(db,'room'),orderBy('time','asc'))
        const unsub = onSnapshot(q,(snapshot)=>{
          const temp =[]
          snapshot.forEach(doc=>{
            temp.push({...doc.data(), id:doc.id })
          })
          setMessages(temp)
        })
        return ()=> unsub() 
        
      },[])
  return (
    <>
    <div style={{overflowY:'auto'}} className='lg:h-96 h-full w-full p-4 space-y-1 '>
        {messages.map((v,i)=>{
            return(
                <div key={i}>
                { (v.sendTo == sendTo.id || v.sendFrom == currentUser.uid|| v.sendTo==currentUser.uid || v.sendFrom == sendTo.id) &&
                  <div className={ `flex flex-col w-full ${v.sendFrom == currentUser.uid ? 'items-end':'items-start'} `} >
                    <div className={`w-fit text-ellipsis min-w-[200px] p-3 my-1 border rounded-[32px] bg-[#FFFFFF]  `} >
                        
                        <p className='text-xl' >{v.message}</p>
                        
                        <div className='flex flex-row'>
                          <div>
                            <p className=' text-xs w-full text-opacity-40 text-black'>{v.name}</p>
                            <p className=' text-xs w-full text-opacity-40 text-black'>{
                                new Date(v.time * 1000).toLocaleDateString('en-US', {
                                hour: '2-digit',
                                minute: '2-digit'
                                }).toString().substring(11)}
                            </p>
                          </div>
                            <button onClick={()=>{
                                if(v.sendFrom === currentUser.uid)
                                deleteDoc(doc(db,'room',v.id))
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