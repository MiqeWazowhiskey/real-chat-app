import React,{ useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Layout } from '../Layout'
const Contacts = () => {
    const{users,handleToggle}=useContext(UserContext)
  return (
        <>
            <div className='w-full h-full flex-col flex items-center'>
            {users && users.map((v,i)=>{
                return(
                    <div key={i} className='hover:text-[#E3596D] flex-col justif-around p-5 w-full'>
                        {v.name && 
                            <button onClick={handleToggle} className='focus:outline-none w-full bg-slate-200 p-5 rounded-[50px]'>
                                {v.name.substring(0,28)}
                            </button>
                        }
                    </div>
                )
            })}
        </div>

    </>
  )
    
    
}

export default Contacts