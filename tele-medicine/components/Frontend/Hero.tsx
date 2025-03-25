import { Pill } from "lucide-react";
import SearchBar from "./SearchBar";
import TransitionText from "./transitionText";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  const TEXTS = [
    "Acupuncture",
    "Dental",
    "Physiotherapy",
    "Homeopathy",
    "Orthopedic",
    "Osteopathy",
    "Ayurveda",
    "Hydrotherapy",
    "Hypnotherapy",
    "Sports Therapy",
  ];

  return (
    <div className="bg-blue-950 ">
      <div className="relative pb-[110px] pt-[50px] dark:bg-dark lg:pt-[50px] max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Section (Text & Search Bar) */}
          <div className="w-full lg:w-6/12">
            <div className="hero-content">
              <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-50 dark:text-white sm:text-[42px] lg:text-[45px] xl:text-5xl flex flex-wrap items-center gap-3">
                <span>Book Your</span>
                <br />
                <TransitionText TEXTS={TEXTS} className="text-amber-600/80" />
                <span> Session Now</span>
              </h1>

              <p className="mb-8 max-w-[500px] text-lg text-gray-100 dark:text-gray-50">
                Skip the wait! <span className="text-3xl font-extrabold relative">
                  <span className=" text-5xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)]">
                    M
                  </span>
                  ediHub
                </span>
                connects you to top doctors instantly
                with real-time consultations and personalized care - because
                your health deserves convenience.
              </p>

              {/* Search Bar */}
              <SearchBar />

              {/* CTA Buttons */}
              <div className="mt-6 flex gap-4">
                <Link
                  href="/#"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white hover:bg-blue-700 transition-all lg:px-7"
                >
                  Need Doctor Urgently
                </Link>
                <Link
                  href="/#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-50 hover:text-blue-500 dark:text-gray-300 transition-all"
                >
                  <Pill className="h-5 w-5 text-blue-600 mr-2" />
                  Need a Refill
                </Link>
              </div>

              {/* Stats Section */}
              <div className="py-6 pt-10 flex gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">16,000+</span>
                  <span className="text-sm text-gray-300">
                    Active Specialists
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-bold text-white">20,000+</span>
                  <span className="text-sm text-gray-300">Active Patients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Image) */}
          <div className="w-full lg:w-6/12 flex justify-end">
            <div className="relative z-10">
              <Image
                src="https://cdn.tailgrids.com/1.0/assets/images/hero/hero-image-01.png"
                alt="Doctor consulting patient"
                className="max-w-full lg:max-w-[480px] drop-shadow-lg"
                width={480}
                height={320}
              />

              {/* Decorative Background Elements */}
              <span className="absolute -bottom-8 -left-8 z-[-1] opacity-70">
                <svg
                  width="93"
                  height="93"
                  viewBox="0 0 93 93"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                  <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                  <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                  <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                  <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
