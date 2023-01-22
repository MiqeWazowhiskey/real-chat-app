import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#252020]'>
        {children}
    </div>
  )
}

export default Layout