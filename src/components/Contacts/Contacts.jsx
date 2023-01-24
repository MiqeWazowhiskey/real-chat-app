import React,{ useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Layout } from '../Layout'
import { auth } from '../../firebase'
const Contacts = () => {
    const{users,handleToggle,setSendTo,sendTo,currentUser}=useContext(UserContext)
    const handleSelect = (child)=> {
        setSendTo({id: child.id, name : child.name})
        handleToggle()
    }
   
  return (
        <div className=' h-full'   style={{overflowY:'auto'}}>
           {users.length>1 ? <div  className='w-full h-full flex-col flex items-center' >
            {users && users.map((v,i)=>{
                return(
                    <div key={i} className='hover:text-[#E3596D] flex-col justif-around p-5 w-full'>
                        {v.name&&v.id!==currentUser.uid && 
                            <button onClick={()=>{handleSelect({id :v.id,name: v.name})}}  style={{boxShadow:'4px 4px black'}} className='focus:outline-none w-full bg-slate-200 p-5 rounded-[50px]'>
                                {v.name.substring(0,28)}
                            </button>
                        }
                    </div>
                )
            })}
        </div> : <div className='w-full h-full text-center'><h1 className='text-2xl text-black'>FREE DATABASE COMEBACK LATER :/ </h1></div>}
    </div>
  )
    
    
}

export default Contacts