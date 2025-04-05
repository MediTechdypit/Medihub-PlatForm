"use client";
 
import React from "react";
import { Avatar, Dropdown } from "flowbite-react";

import { useRouter } from "next/navigation";
import { AlignJustify, Bell, Mail, Search } from "lucide-react";
 
export default function Navbar() {
  const router = useRouter();
  async function handleLogout() {
    router.push("/");
  }
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
        <div className="flex items-center justify-center">
  {/* Button */}
  <div className="xl:hidden">
    <button
      type="button"
      className="p-2 text-gray-400 bg-white rounded-lg hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
    >
      <AlignJustify className="w-6 h-6" />
    </button>
  </div>

  {/* Space
  <div className="w-4"></div> Adjust width as needed */}

  {/* MediHub Logo */}
  <h1 className="text-black font-bold text-lg flex items-center ml-5">
    <span className="text-4xl text-red-500">M</span> {/* Larger and red */}
    <span className="animate-text-change text-3xl">ediHub</span> 
  </h1>
</div>



 
          <div className="flex-1 hidden max-w-xs ml-40 mr-auto lg:block">
            <label htmlFor="" className="sr-only">
              {" "}
              Search{" "}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
 
              <input
                type="search"
                name=""
                id=""
                className="block w-full py-2 pl-10 border border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
                placeholder="Type to search"
              />
            </div>
          </div>
 
          <div className="flex items-center justify-end ml-auto space-x-6">
            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
              >
                <Mail className="w-6 h-6" />
              </button>
              <span className="inline-flex items-center px-1.5 absolute -top-px -right-1 py-0.5 rounded-full text-xs font-semibold bg-indigo-600 text-white">
                {" "}
                2{" "}
              </span>
            </div>
 
            <div className="relative">
              <button
                type="button"
                className="p-1 text-gray-700 transition-all duration-200 bg-white rounded-full hover:text-gray-900 focus:outline-none hover:bg-gray-100"
              >
                <Bell className="w-6 h-6" />
              </button>
            </div>
 
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img= {
                    "/doctor.jpg"
                     }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Johson Joh </span>
                <span className="block truncate text-sm font-medium">
                  Johson@gmail.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}