"use client"

import { Tabs } from "flowbite-react";
import { Activity, Microscope, Stethoscope, Syringe } from "lucide-react";
import ServiceList from "./Services/ServiceList";
import LinkCards from "./Doctors/LinkCards";



export default function TabbedItems() {
  const services = [{
    title:"Telehealth",
    image:"/doctor.jpg",
    slag:"telehealth",
  },
  {
    title:"Weight loss",
    image:"/doctor.jpg",
    slag:"telehealth",
  },
  {
    title:"Video prescription refill",
    image:"/doctor.jpg",
    slag:"telehealth",
  },
  {
    title:"UTI consult",
    image:"/doctor.jpg",
    slag:"telehealth",
  },
  {
    title:"ED consult",
    image:"/doctor.jpg",
    slag:"telehealth",
  },
  {
    title:"Mental health consult",
    image:"/doctor.jpg",
    slag:"telehealth",
  },
  {
    title:"Urgent care visit",
    image:"/doctor.jpg",
    slag:"telehealth",
  },

]
  
 const tabs = [
    {
      title: "Popular Services",
      icon: Stethoscope,
      component:<ServiceList data={services} />,
      content: [],
    },
    {
      title: "Doctors",
      icon: Microscope,
      component:<LinkCards className="bg-pink-950" />,
      content: [],
    },
    {
      title: "Specialties",
      icon: Activity,
      component:<LinkCards className="bg-blue-900" />,
      content: [],
    },
    {
      title: "Symptoms",
      icon: Syringe,
      component:<LinkCards className="bg-purple-950" />,
      content: [],
    },
  ];

  return (
    <div>
      <Tabs aria-label="Tabs with underline" variant="underline">
        {tabs.map((tab, i) => (
          <Tabs.Item key={i} active={i === 0} title={tab.title} icon={tab.icon}>
            {tab.component}
          </Tabs.Item>
        ))}
      </Tabs>
    </div>
  );
  
}
