import Brands from '@/components/Frontend/Brands';
import DoctorsList from '@/components/DoctorsList';
import Hero from '@/components/Frontend/Hero';
import TabbedSection from '@/components/Frontend/TabbedSection';
import React from 'react'

export default function Home() {
  return (
    <section className=" overflow-x-hidden ">
        <Hero /> 
        <Brands />
        <TabbedSection />
        <DoctorsList />
        <DoctorsList title="In Person Doctor Visit" isInPerson={true}  className="bg-white py-8 lg:py-24 px-3 flex-wrap"/>
    </section>
  );
}
