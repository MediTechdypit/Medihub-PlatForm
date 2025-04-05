"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { HiInformationCircle } from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { updateUserById } from "@/actions/users";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const FormSchema = z.object({
  token: z.string().min(6, {
    message: "Your Token must be 6 characters.",
  }),
});

export default function VerifyTokenForm({
  userToken,
  id,
}: {
  userToken: number | undefined;
  id: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const router = useRouter();
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      token: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true); // ✅ Correct usage of setLoading
    const userInputToken = parseInt(data.token);
    
    if (userInputToken === userToken) {
      setShowNotification(false);
      try {
        await updateUserById(id);
        toast.success("Account Verified");
        router.push("/login");
      } catch (error) {
        console.error(error);
        toast.error("An error occurred. Please try again.");
      }
    } else {
      setShowNotification(true);
    }
    setLoading(false); // ✅ Ensure loading state resets
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {showNotification && (
          <Alert
            color="failure"
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 flex items-center"
          >
            <HiInformationCircle className="w-6 h-6 mr-2 text-red-700" />
            <span>
              <strong>Wrong Token!</strong> Please check the token and enter it again.
            </span>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Token Here</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the 6-digit OTP sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
