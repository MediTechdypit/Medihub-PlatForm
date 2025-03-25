
import LoginForm from '@/components/Auth/LoginForm';
import Image from 'next/image';
import React from 'react'

export default function page() {
  return (
    <div className="bg-blue-100 min-h-screen py-8 ">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full max-w-5xl mx-auto  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
        <div className="hidden md:flex linear-bg">{
          <Image 
          src="/LoginPage.webp" // Ensure the file is in the public/ folder
          alt="Login Page"
          width={800} // Adjust width as needed
          height={600} // Adjust height as needed
          priority // Ensures faster loading
        />

          }</div>
        <div className="">
          {/* Form  */}
          <LoginForm />

        </div>
      </div>
    </div>
  );
}
