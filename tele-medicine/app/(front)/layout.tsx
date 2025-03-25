import Navbar from '@/components/Frontend/Navbar'
import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div>
       <Navbar />
       {/* <div className="bg-white px-4   py-4 fixed top-[60px] w-full left-0 z-50 right-0 border-t border-gray-400/30 ">
         <MegaMenu/>
      </div> */}
      <div className="mt-[60px] "> {children}</div>
     
    </div>
  )
}
