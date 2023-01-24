import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-[#1B1725] overflow-hidden'>
      <div className='lg:w-1/2 w-full h-full lg:h-5/6 bg-[#625776] rounded-[50px] flex flex-col items-center justify-between shadow-inner shadow-black border-4 border-[#9D68FF] p-10'>
        {children}
      </div>
    </div>
  )
}

export default Layout