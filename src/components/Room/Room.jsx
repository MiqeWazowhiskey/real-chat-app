import { collection, onSnapshot, query } from 'firebase/firestore'
import React,{useEffect} from 'react'
import { db } from '../../firebase'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  

const Room = () => {
    const{messages,setMessages,currentUser}= useContext(UserContext)
    useEffect(()=>{
        const q = query(collection(db,'room'))
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
        {messages.map((v,i)=>{
            return(
                <div key={i} className={ `flex flex-row w-full ${v.user == currentUser ? 'justify-end':'justify-end'} `}>
                    <div className={`w-fit min-w-[200px] p-3 border rounded-[32px] bg-[#FFFFFF]  `} >
                        <p >{v.message}</p>
                        <p className=' text-xs w-full text-opacity-40 text-black'>{v.name}</p>
                        <p className=' text-xs w-full text-opacity-40 text-black'>{
                            new Date(v.time * 1000).toLocaleDateString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                            })}
                        </p>
                    </div>  
                </div>
            )
        })}
    </>
  )
}

export default Room