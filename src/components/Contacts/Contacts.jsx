import React,{ useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Layout } from '../Layout'
const Contacts = () => {
    const{users, toggleMenu}=useContext(UserContext)

  return (
        <div className='lg:w-1/3 w-full h-full lg:h-5/6 bg-[#BBBBBB] rounded-[50px] flex items-start shadow-inner shadow-black border-4 border-[#E3596D] p-10'>
            <div className='w-full h-full flex-col flex items-center  justify-around'>
            {users.map((v,i)=>{
                return(
                    <div key={i} className='hover:text-[#E3596D] h-12 flex-col justif-around'>
                        {v.name&& <span>
                            <button onClick={toggleMenu} className='focus:outline-none bg-slate-200 p-5 rounded-[50px]'>
                                {v.name}
                            </button>
                        </span>}
                    </div>
                )
            })}
        </div>
        <div className='h-full mt-32'><span><button onClick={toggleMenu} className='rounded-full border text-[#E3596D] border-[#E3596D] w-6 focus:outline-none'>X</button></span></div>

    </div>
  )
    
    
}

export default Contacts