import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#1B1725]'>
        {children}
    </div>
  )
}

export default Layout