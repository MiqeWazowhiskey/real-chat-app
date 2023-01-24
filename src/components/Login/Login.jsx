import {  signInWithRedirect } from 'firebase/auth'
import React from 'react'
import { auth , provider } from '../../firebase'
import { Layout } from '../Layout'


const Login = () => {
    const login = async() => {
        signInWithRedirect(auth,provider).catch(er=>alert(er)).then
        
    }
  return (
    <Layout>
      <div className='w-full h-full flex items-center justify-center'>
      <span>
        <button className='text-2xl font-bold text-[#FFFFFF] rounded-[50px] bg-[#9D68FF] p-5' onClick={login}>Login With Google</button>
      </span>
      </div>
    </Layout>
  )
}

export default Login