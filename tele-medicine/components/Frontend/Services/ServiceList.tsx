import React from "react";
import ServiceCard from "./ServiceCard";
import { ServiceProps } from "@/types/types";


export default function ServiceList({data}:{data:ServiceProps[]}) {
  return (
    <div className="w-full ">
      <div className="grid min-w-full grid-cols-1 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 ">
        {
          data.map((service, i) =>{
            return <ServiceCard key={i} service={service} />
          })
        }
        
      </div>
    </div>
  );
}
