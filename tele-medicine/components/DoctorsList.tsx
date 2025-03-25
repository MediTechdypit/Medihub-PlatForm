"use client"
import SectionHeading from './SectionHeading';
import ToggleButton from './ToggleButton';
import Link from 'next/link';
import { Map } from 'lucide-react';
import DoctorListCuso from './DoctorListCuso';

export default function DoctorsList({ title = "TeleHealth Visit", isInPerson, className="bg-pink-100 py-8 lg:py-24 flex-wrap px-3" }: { title?: string; isInPerson?: boolean; className?:string }
) {

  const doctors = [
    {
    name:"John"
  },
  {
    name:"John"
  },
  {
    name:"John"
  },
  {
    name:"John"
  },
  {
    name:"John"
  },
  {
    name:"John"
  },
  {
    name:"John"
  },
  {
    name:"John"
  },
]
  return (
    <div className={className}>
      <div className="max-w-6xl mx-auto ">
        <SectionHeading title={title} />
        <div className="py-4 flex items-center justify-between">
          {/* See All Button */}
          {isInPerson ? (
            <Link href="" className='text-blue-500 text-sm flex items-center font-semibold '> 
            <Map className='mr-2 flex-shrink-0 w-4 h-4'/>
            <span>Map View </span></Link>
          ) :(
            <ToggleButton />
          )}
          <Link
            href="/doctors"
            className="py-3 px-6 border border-blue-600 bg-white rounded-lg hover:bg-blue-600 hover:text-white transition duration-300"
          >
            See All
          </Link>

        </div>
        <div className="py-6">
         <DoctorListCuso doctors={doctors} isInPerson={isInPerson}  />
        </div>
      </div>
    </div>
  );
}
