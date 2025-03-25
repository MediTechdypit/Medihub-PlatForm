import React from "react";
import { UseFormRegister, FieldErrors, FieldValues, Path } from "react-hook-form";

type TextInputProps<T extends FieldValues> = {
  label: string;
  register: UseFormRegister<T>;
  name: Path<T>; // Ensure correct type for useForm
  errors: FieldErrors<T>;
  type?: string;
};

export default function TextInput<T extends FieldValues>({
  label,
  register,
  name,
  errors,
  type = "text",
}: TextInputProps<T>) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          {...register(name, { required: true })} // ✅ No more casting issue
          id={name}
          name={name}
          type={type}
          autoComplete="name"
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
        />
        {errors[name] && (
          <span className="text-red-600 text-sm">{label} is Required</span>
        )}
      </div>
    </div>
  );
}
