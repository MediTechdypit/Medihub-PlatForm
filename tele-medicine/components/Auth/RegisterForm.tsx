// "use client"
// import { type RegisterInputProps } from "@/types/types";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import TextInput from "../FormInputs/TextInput";
// import SubmitButton from "../FormInputs/SubmitButton";
// import { useState } from "react";
// import { createUser } from "@/actions/users";
// import { UserRole } from "@prisma/client";
// import toast from "react-hot-toast";



// export default function RegisterForm({role = "USER"}:{role?:UserRole}) {
//   const [isLoading, setIsLoading] = useState(false);
//   const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterInputProps>();

//   async function onSubmit(data: RegisterInputProps) {
//     // console.log(data)
//     setIsLoading(true);
//     data.role = role;
//     try {
//       const user = await createUser(data);
//       if(user && user.status===200){
//          console.log("User created successfully")
//         reset();
//         setIsLoading(false);
//         toast.success("User created successfully");
//         console.log("user:", user.data);
//       }else{
//         console.log(user.error);
//       }
//       console.log("user:", user); 
//     } catch (error) {
//       console.log(error);

//     }
//   }


//   return (
//     <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//           alt="Your Company"
//           src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
//           className="mx-auto h-10 w-auto"
//         />
//         <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
//           Create new Account
//         </h2>
//       </div>

//       <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

//           <TextInput label="Full Name " register={register} name="fullName" errors={errors} />


//           {/* Email */}

//           <TextInput label="Email Address" register={register} name="email" errors={errors} type="email" />

//           {/* Phone Number  */}

//           <TextInput label="Phone Number" register={register} name="phone" errors={errors} type="tel" />


//           <TextInput label="Password" register={register} name="password" errors={errors} type="password" />

//           <div>
//             <SubmitButton title={"Create Account"} isLoading={isLoading} loadingTitle={"Creating Please wait"} />
//           </div>
//         </form>

//         <p className="mt-10 text-center text-sm/6 text-gray-500">
//           Already have an account?{" "}
//           <Link
//             href="/login"
//             className="font-semibold text-indigo-600 hover:text-indigo-500"
//           >
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


"use client";
import { type RegisterInputProps } from "@/types/types";
import Link from "next/link";
import { useForm } from "react-hook-form";
import TextInput from "../FormInputs/TextInput";
import SubmitButton from "../FormInputs/SubmitButton";
import { useState } from "react";
import { createUser } from "@/actions/users";
import { UserRole } from "@prisma/client";
import toast from "react-hot-toast";

export default function RegisterForm({ role = "USER" }: { role?: UserRole }) {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterInputProps>();

  async function onSubmit(data: RegisterInputProps) {
    setIsLoading(true);
    data.role = role;

    try {
      const user = await createUser(data);

      if (user && user.status === 200) {
        console.log("User created successfully");
        reset();
        toast.success("User created successfully");
      } else if (user && user.status === 409) {
        toast.error("Account already exists. Please log in.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }

      console.log("user:", user);
    } catch (error) {
      console.error("Error creating user:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Create new Account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <TextInput label="Full Name" register={register} name="fullName" errors={errors} />
          <TextInput label="Email Address" register={register} name="email" errors={errors} type="email" />
          <TextInput label="Phone Number" register={register} name="phone" errors={errors} type="tel" />
          <TextInput label="Password" register={register} name="password" errors={errors} type="password" />

          <div>
            <SubmitButton title={"Create Account"} isLoading={isLoading} loadingTitle={"Creating Please wait"} />
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
