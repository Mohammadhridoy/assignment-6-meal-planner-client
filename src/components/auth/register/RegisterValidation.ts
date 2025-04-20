import { z } from "zod";



export const registrationSchema = z.object({
    name:z.string({required_error: "Name is required!"})
    .min(2, "Name must be between 2 and 50 characters")
    .max(50, "Name must be between 2 and 50 characters"),

    email: z.string({required_error:"Email is required!"}).email("Invalid email address"),
    phone: z.string({required_error: "Phone number is required"}).min(11, "Enter 11 digit phone number").max(11),
    password: z.string({required_error:"Password is required"}).min(8, "Password must be least 8 characters"),
    role: z.enum(["customer", "provider"] , {required_error: "User role is required"})
})