import { signInWithRedirect } from 'firebase/auth'
import React from 'react'
import { auth , provider } from '../../firebase'
import { Layout } from '../Layout'
const Login = () => {
    const login = () => {
        signInWithRedirect(auth,provider).catch(er=>alert(er))
    }
  return (
    <Layout>
      <span>
        <button className='text-2xl font-bold' onClick={login}>Login</button>
      </span>
    </Layout>
  )
}

export default Login