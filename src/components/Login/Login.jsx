import {  signInWithRedirect } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth , db, provider } from '../../firebase'
import { Layout } from '../Layout'
import { v4 as uuidv4 } from 'uuid';
import { setDoc } from 'firebase/firestore';
import { UserContext } from '../../context/UserContext';

const Login = () => {
    const login = async() => {
        signInWithRedirect(auth,provider).catch(er=>alert(er)).then

    }
    const {currentUser}= useContext(UserContext)
  return (
    <Layout>
      <span>
        <button className='text-2xl font-bold text-[#FFFFFF] rounded-[50px] bg-[#9D68FF] p-5' onClick={login}>Login With Google</button>
      </span>
    </Layout>
  )
}

export default Login