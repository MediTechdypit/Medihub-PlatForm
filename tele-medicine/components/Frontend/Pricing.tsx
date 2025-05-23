import { Check, HelpCircle } from 'lucide-react';
import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

export default function Pricing() {
    const plans = [
        {
            name: "Free for user",
            desc: "Get the start with a free trial",
            price: 0,
            isMostPop: false,
            features: [
                "can have daily 10 Appointement",
                "get access to limited features of ai tool",
                "Basic anyalsis for future operation",
            ],
        },
        {
            name: "Executive",
            desc: "Something come with expenses",
            price: 300,
            isMostPop: true,
            features: [
                "all the free plan features",
                "Get upto 1000 credit for ai features",
                "Branding on platform for more Patient",
                "In depth anyalsis for user",
            ],
        },
        {
            name: "Enterprise",
            desc: "More in depth application",
            price: 500,
            isMostPop: false,
            features: ["all the Execplan features",
                "Get upto 1500 credit for ai platform features",
                "Branding on platform for more Patient",
                "In depth anyalsis for user",
            ],
        },
    ];

    return (
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="relative max-w-xl mx-auto sm:text-center">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Pricing for all sizes
            </h3>
            <div className="mt-3 max-w-xl">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                efficitur consequat nunc.
              </p>
            </div>
          </div>
          <div className="mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3">
            {plans.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? "mt-10" : ""}`}
              >
                {item.isMostPop ? (
                  <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold">
                    Most popular
                  </span>
                ) : (
                  ""
                )}
                <div className="p-8 space-y-4 border-b">
                  <span className="text-indigo-600 font-medium uppercase tracking-widest">
                    {item.name}
                  </span>
                  <div className="text-gray-800 text-3xl font-semibold">
                    {item.price} &#8377;{" "}
                    <span className="text-xl text-gray-600 font-normal">
                      /mo
                    </span>
                  </div>
                  <p className="text-sm">{item.desc}</p>
                  <div className="flex">
                    <p>+5% GST and Transaction fee</p>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button>
                            <HelpCircle className="w-4 h-4 ms-2" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> Paypal/Stripe will charge their regular Transaction fee </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <button className="px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700">
                    Get Started
                  </button>
                </div>
                <ul className="p-8 space-y-3">
                  <li className="pb-2 text-gray-800 font-medium">
                    <p>Features</p>
                  </li>
                  {item.features.map((featureItem, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                        <Check  className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                    
                      {featureItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
}
