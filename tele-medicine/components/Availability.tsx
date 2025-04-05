"use client"
import React from 'react'
import { Calendar } from "@/components/ui/calendar"

export default function Availability() {
  const [bookDate, setBookDate] = React.useState<Date | undefined>(new Date());
  // const date = bookDate?.getFullYear;
  const timeStamps = [
    {
        time: "08:30",
        period: "am"
    },
    {
        time: "09:00",
        period: "am"
    },
    {
        time: "09:30",
        period: "am"
    },
    {
        time: "10:00",
        period: "am"
    },
    {
        time: "10:30",
        period: "am"
    },
    {
        time: "11:00",
        period: "am"
    },
    {
        time: "11:30",
        period: "am"
    },
    {
        time: "12:00",
        period: "am"
    },
    {
        time: "12:30",
        period: "am"
    },
];
  
  const GMT = bookDate?.toString().split("GMT")[1].split(" ")[0];

  const formattedDate =`${bookDate?.toString().split(" ").slice(0,4).join(" ")} - GMT ${GMT}`;
  console.log("formattedDate :-  " + formattedDate);
  return (
    <div className="mb-[200px]">
      <h2 className="font-bold py-4 text-xl uppercase text-slate-500 tracking-wider">Select a Date and Time </h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 ">
        <div className="sm:col-span-1 col-span-full ">
          <Calendar
            mode="single"
            selected={bookDate}
            onSelect={setBookDate}
            className="rounded-md border"
          />
        </div>
        <div className="sm:col-span-1 col-span-full">
          <div className="px-4 ">
          <h2 className="pb-4 text-lg text-center text-blue-700 py-3 px-4 border border-blue-500  ">{formattedDate}</h2>
          <div className="py-3 grid grid-cols-3 gap-2">
                    {timeStamps.slice(0, 5).map((item, i) => (
                           <button key={i}className="bg-blue-700 text-sm text-white p-2 text-center rounded-md hover:bg-blue-800 transition">
                                {item.time} {item.period}
                            </button>
                    ))}
                    <button
                      className="bg-gray-300 text-[0.7rem] text-black py-2 px-3 text-center rounded-md hover:bg-gray-400 transition truncate">
                            More Times
                        </button>

                </div>
          </div>
      
        </div>
      </div>
      
      {/* Calender */}

      {/* Available time */}
    </div>
  )
}
