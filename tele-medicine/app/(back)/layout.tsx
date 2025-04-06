
import React, { ReactNode } from 'react'

export default function layout({children}:{children:ReactNode}) {
  return (
    <div >
       <div className="">
      {children}
      </div>
    </div>
  )
}
