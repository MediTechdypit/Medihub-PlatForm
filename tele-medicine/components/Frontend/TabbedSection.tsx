"use client"

import React from "react";
import TabbedItemsWrapper from "./TabbedItemsWrapper";

const TabbedSection = () => {
  return (
    <section className="pb-12 pt-20 m-5 dark:bg-dark lg:py-[60px] ">
      <div className="container mx-auto max-w-full">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-5xl text-center lg:mb-20">
             
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
               Browse your  doctors By.
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
              choose from thousands of providers at every day 
              affordable prices . Book online today.
              </p>
            </div>
          </div>
        </div>
            {/* tabs */}
            <div className="mx-auto max-w-6xl  ">
            <TabbedItemsWrapper />
           
            </div>
      </div>
    </section>
  );
};

export default TabbedSection;


