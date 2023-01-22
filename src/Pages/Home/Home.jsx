import React,{ useContext } from 'react'
import { auth } from '../../firebase'
import { UserContext } from '../../context/UserContext'
import { Layout } from '../../components/Layout'
import { Room } from '../../components/Room'
const Home = () => {
  const{users,setUsers,currentUser,setCurrentUser}=useContext(UserContext)

  return (
    <Layout>
        <div className='lg:w-1/3 w-full h-full lg:h-5/6 bg-[#BBBBBB] rounded-[50px] flex flex-col items-center shadow-inner shadow-black border-4 border-[#E3596D] p-10'>
            <div className='w-full justify-between'>
              <span className='border rounded-[50px] p-2 text-white bg-opacity-20 bg-[#E3596D]'>
                <button onClick={async()=>{
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
        </div>
        
        
    </Layout>
  )
}

export default Home