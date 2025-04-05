import Link from 'next/link'
import React from 'react'

export default function LinkCards({className}: { className?:string}) {
  return (
    <div className="grid min-w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 ">
        <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >
    <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >
    <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >
    <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >

    <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >
    <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >
    <Link href="#" className={`flex gap-4 bg-slate-800 text-slate-50 rounded-md py-3 px-6  ${className}`}>
      <h2>Anxiety</h2>
      <span aria-hidden="true">&rarr;</span>
    </Link >
   </div>
  )
}
