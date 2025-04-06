import CustomButton from '@/components/CustomButton'
import CustomAccordion, { FAQ } from '@/components/Frontend/CustomAccordian'
import Pricing from '@/components/Frontend/Pricing'
import { link } from 'fs'
import { Check } from 'lucide-react'
import Image from 'next/image'
import React from 'react'


export default function page() {
    const faqs: FAQ[] = [
    {
      qn: "What is the purpose of this platform?",
      ans: "This platform provides AI-driven mental health support and telemedicine solutions."
    },
    {
      qn: "How can I book an appointment?",
      ans: <p>You can book an appointment by <CustomButton title="Sign up" 
      href="/register?role='DOCTOR'" className="bg-blue-600 hover:bg-violet-800" /> into your account and selecting an available doctor from the scheduling system.</p>
    },
    {
      qn: "Is the AI chatbot free to use?",
      ans: "Yes, our AI chatbot is completely free for users seeking mental health assistance."
    },
    {
      qn: "How does the AI-powered doctor assistant work?",
      ans: (
        <>
          Our AI-powered doctor assistant helps medical professionals by:
          <ul>
            <li>Generating AI-based prescriptions</li>
            <li>Providing patient insights</li>
            <li>Assisting in diagnosis based on symptoms</li>
          </ul>
        </>
      )
    },
    {
      qn: "Can I access my previous appointments?",
      ans: "Yes, you can view all your past appointments from your user dashboard."
    },
    {
      qn: "Is my data secure?",
      ans: "We prioritize data security with end-to-end encryption and comply with healthcare privacy regulations."
    }
  ];

 const  features = [
  "MediHub Brings Patient to You",
  "MediHub  e-Prescribing Experience",
  "Integrated clinical Note Taking"
 ] 
  
 const whyUs  = [
  "List your Practise",
  "Create Competitive Offering",
  "Start seeing Patients"
 ] 

 const cards = [
  {
    title:"Beign Your Journey",
    Description:"Start a new Application to join our network of Healthcare providers.",
    link: "/",
    link_title:"Start Application",
  },
  {
    title:"Resume Application ",
    Description:"Pick up where you Left off and complete your onboarding process Schedule for Physical Approval.",
    link: "/",
    link_title:"Continue your Application",
  },
  {
    title:"Schedule a Call",
    Description:"Arrange a Call to finalize your application",
    link: "/",
    link_title:"Schedule a Call",
  },
  {
    title:"Track Your Progress",
    Description:"Monitor the status of your application and approvals in real-time .",
    link: "/",
    link_title:"Check status",
  },
 ]
  

  return (
    <div className="min-h-screen overflow-x-hidden ">
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto gap-4 grid grid-cols-1 md:grid-cols-2">

          <div className="">
            <h2 className="sm:text-[3rem] text-[1.5rem] leading-[3.5rem] ">  Build a Thriving {" "}<span className="text-blue-600 font-semibold">Direct-Pay </span> practice with MediHub</h2>


            <p className="py-4 ">
              Welcome to MediHub App , where connecting with Patient is made Easier than ever before. Our Platform streamLines the Process of managing appointments, providing care remotely, and keeping track of patients records. Join these Ai powered Platform Now.
            </p>

            <CustomButton title="List Your Service" href="#" className="bg-blue-600 hover:bg-blue-800"  />

           <div className="py-6">
           {features.map((feature, i) => (
              <p key={i} className="flex items-center mt-2">
                <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                {feature}
              </p>
            ))}
           </div>
          </div>
          <Image
            src="/doctor1.jpeg"
            alt="Doctor consulting patient"
            className="w-full  drop-shadow-lg rounded-sm m-2"
            width={3000}
            height={2000}
          />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto gap-8 grid grid-cols-1 md:grid-cols-2">
        <Image
            src="/doctor1.jpeg"
            alt="Doctor consulting patient"
            className="w-full hidden md:block  drop-shadow-lg rounded-sm m-2"
            width={3000}
            height={2000}
          />
          <div className="">
            <h2 className="sm:text-3xl  text-2xl ">  Join MediHub to increase your {""}<span className="text-blue-600 font-semibold mx-2 ">revenue </span>{""} Today.</h2>

            {/* <div className="py-6">
           {whyUs.map((whyUs, i) => (
              <p key={i} className="flex items-center mt-2">
                <Check className="w-4 h-4 mr-2 flex-shrink-0 text-blue-500" />
                {whyUs}
              </p>
            ))}
           </div> */}


           <div className="grid grid-cols-2 gap-4 py-6">
            {
              cards.map((card,i) =>{
              return(
                <div key={i} className="bg-blue-900 p-4  rounded-lg shadow-2xl text-center">
              <h3 className="text-2xl font-semibold text-white">
                {card.title}
              </h3>
              <p className="text-gray-200 text-s py-3 ">
               {card.Description}
              </p>
              <CustomButton title={card.link_title} href={card.link} className="bg-blue-600 hover:bg-blue-800"  />

            </div>
              )
              })
            }

            

            

           
           </div>
          </div>
          
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-2xl mx-auto gap-4">
         <CustomAccordion FAQS={faqs}  />
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto gap-4">
         <Pricing />
        </div>
      </section>
    </div>
  )
}
