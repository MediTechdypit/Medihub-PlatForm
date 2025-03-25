"use server";
import bcrypt from "bcrypt";
import {Resend} from "resend";
import { prismaClient } from "@/lib/db";
import { RegisterInputProps } from "@/types/types";
import EmailTemplate from "@/components/Emails/email.template";

// Define an async function to handle user registration
export async function createUser(formData: RegisterInputProps) {
  const { fullName, email, role, phone, password } = formData;
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    // Check if user already exists
    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        success: false,
        data: null,
        error: `User with this email (${email}) already exists in the database.`,
        status: 409,
      };
    }

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a 6-digit token
    const generateToken = () => {
      const min = 100000; // Minimum 6-digit number
      const max = 999999; // Maximum 6-digit number
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const userToken = generateToken();

    // Create new user in the database
    const newUser = await prismaClient.user.create({
      data: {
        name: fullName,
        email,
        phone,
        password: hashedPassword,
        role,
        token: userToken,
      },
    });
    
    const token = newUser.token;
    const userId = newUser.id;    
    const firstName = newUser.name.split(" ")[0];
    const linkText = "Verify your Account ";
    const message =
      "Thank you for registering with Gecko. To complete your registration and verify your email address, please enter the following 6-digit verification code on our website :";
    const sendMail = await resend.emails.send({
      from: "Medical App <admin@meditechub.tech>",
      to: email,
      subject: "Verify Your Email Address",
      react: EmailTemplate({ firstName, token, linkText, message }),
    });
    console.log(token);
    console.log(sendMail);
    console.log(newUser);


    return {
      success: true,
      data: newUser,
      message: "User registered successfully.",
      status: 200,
    };
  } catch (error) {
    console.error("Error registering user:", error);
    return {
      success: false,
      error: "Something went wrong.",
      status: 500,
    };
  }
}

export async function getUserById(id: string){
  if(id){
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.error("Error fetching user:", error);
      
    }
  }
}


export async function updateUserById(id: string){
if(id){
  try {
    const updatedUser = await prismaClient.user.update({
      where: {id},
      data:{
        isVerfied: true,
      }
    });
    return updatedUser;

  } catch (error) {
   console.error("Error updating user:", error);
    
  }
}}


