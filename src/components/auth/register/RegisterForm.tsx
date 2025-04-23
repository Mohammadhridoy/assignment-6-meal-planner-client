
"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { registrationSchema } from "./RegisterValidation";
import { registerUser } from "@/services/AuthServices";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




function RegisterForm() {
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(registrationSchema)
  });

  const {formState:{ isSubmitting}} = form

  const onSubmit:SubmitHandler<FieldValues> = async (data) =>{

    try{
      const res = await registerUser( data)
      console.log(res);
      if(res.status){
        toast.success(res?.message)
        router.push("/login")
      }else{ 
        toast.error(res?.message)
      }

    }catch(error: any){
      console.error(error);
    }

  }

  return (
    <div className="shadow-sm md:w-2/6 p-6 rounded-2xl border">
       <Link href="/" className="text-xl font-bold text-primary flex justify-center items-center py-2">
            MealMate
            </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" type="text" {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Email</FormLabel>
              <FormControl>
                <Input  placeholder="Enter your email"  type="email" {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" type="text"  {...field} value={field.value || " "} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your Password" {...field} value={field.value || ''} />
               
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

        <FormField 
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Role</FormLabel>
             <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="customer">Customer</SelectItem>
                  <SelectItem value="provider">Provider</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />


         <Button className="w-full mt-3  text-white text-xl p-5 shadow-sm " type="submit">
            {isSubmitting ? "Registering....": "Register"} 
          </Button>

        </form>
      </Form>
      <div className="text-center text-sm mt-5">
        Already have an account?{" "}
        <Link href="/login" className="underline font-bold text-primary underline-offset-4">
          login
        </Link>
      </div>
    </div>

  );
}

export default RegisterForm;