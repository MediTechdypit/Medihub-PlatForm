"use client"
import Link from "next/link";
import TextInput from "../FormInputs/TextInput";
import { LoginInputProps} from "@/types/types";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import SubmitButton from "../FormInputs/SubmitButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Alert } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";
import Image from "next/image";


export default function LoginForm()  {
  const router = useRouter();
   const[isLoading, setIsLoading] = useState(false);
   const[showNotification, setShowNotification] = useState(false);
    const { register, handleSubmit,reset, formState:{errors}} = useForm<LoginInputProps>();
    async function onSubmit (data: LoginInputProps){
      try {
        setIsLoading(true);
       // console.log("Attempting to sign in with credentials:", data);
        const loginData = await signIn("credentials", {
          ...data,
          redirect: false,
        });
        // console.log("SignIn response:", loginData);
        if (loginData?.error) {
          setIsLoading(false);
          toast.error("Sign-in error: Check your credentials");
          setShowNotification(true);
        } else {
          // Sign-in was successful
          setShowNotification(false);
          reset();
          setIsLoading(false);
          toast.success("Login Successful");
          router.push("/dashboard");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Network Error:", error);
        toast.error("Its seems something is wrong with your Network");
      }
    }
    return (
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <Image
  alt="Your Company"
  width={40}  // Replace with actual width
  height={40} // Replace with actual height
  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
  className="mx-auto h-10 w-auto"
/>
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

          {showNotification && (
            <Alert color="failure" icon={HiInformationCircle}>
              <span className="font-medium">Sign-in error!</span> Please Check
              your credentials
            </Alert>
          )}
             <TextInput label="Email Address" register={register} name="email" errors={errors} type="email"  />

           <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
               {...register("password",{required:true})}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
              {errors["password"] && (
               <span className="text-red-600 text-sm "> Password is Required </span>
                   )}
            </div>
          </div>

          <div>
          <SubmitButton title={"Login Account"} isLoading={isLoading} loadingTitle={"Loging in Please wait......"} />
          </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Donn&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Register now 
            </Link>
          </p>
        </div>
      </div>
    );
  }
  