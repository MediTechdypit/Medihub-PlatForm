import DoctorsDetail from '@/components/DoctorsDetail'
import FixedBookButton from '@/components/FixedBookButton'
import Image from 'next/image'
import React from 'react'

export default function page() {
    return (
        <div className="bg-slate-50 p min-h-screen  ">
            <div className="bg-white max-w-4xl border border-gray-200 mx-auto shadow-md rounded-md ">
                <div className="py-8 px-6">
                    <div className="flex items-center justify-between ">
                        <div className="">
                            <div className='flex flex-col'>
                                <h2 className="uppercase font-bold text-2xl tracking-widest">Vijay Patel, PA-C </h2>
                                <p className="text-gray-500 text-xs uppercase ">Adult HealthCare
                                </p>
                            </div>
                           <div className="py-3">
                             {/* Type of doctor */}
                             <p>Lorem ipsum, dolor sit amet  </p>
                            {/* Address */}
                            <p>Lorem ipsum dolor sit amet consectetur </p>
                           </div>
                        </div>
                        <div>
                             <Image
                              src="/doctor.jpg" width={243} height={207} alt="Doctor" className="w-36 h-36 rounded-full object-cover" />
                        </div>
                    </div>
                </div>
                <div className=""><DoctorsDetail /></div>    
            </div>
          <FixedBookButton />
          
        </div>
    )
}
