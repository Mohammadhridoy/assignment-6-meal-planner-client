"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";  
import { toast } from "sonner";
import { loginSchema } from "./LoginValidation";
import { getCurrentUser, loginUser } from "@/services/AuthServices";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";



const LoginForm = () => {

  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirectPath")
  const router = useRouter()
 const  {setUser} = useUser()
    const form = useForm({
        resolver: zodResolver(loginSchema)
      });
    
      const {formState:{ isSubmitting}} = form
    
      const onSubmit:SubmitHandler<FieldValues> = async (data) =>{
    
        try{
          const res = await loginUser(data)
          console.log(res);
          if(res.status){
            toast.success(res?.message)
            const user =await getCurrentUser()
            setUser(user)
            if(redirect){
              router.push(redirect)
            }else{
              router.push('/')
            }
         
          }else{ 
            toast.error(res?.message)
          }
    
        }catch(error: any){
          console.error(error);
        }
    
      }
      

    return (
        <div className="shadow-sm md:w-2/6 p-6 rounded-2xl ">
       <Link href="/" className="text-xl font-bold text-primary flex justify-center items-center py-2">
            MealMate
            </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>

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


         <Button className="w-full mt-3  text-white text-xl p-5 shadow-sm " type="submit">
            {isSubmitting ? "logging....": "login"} 
          </Button>

        </form>
      </Form>
      <div className="text-center text-sm mt-5">
      Don&apos;t have an account?{" "}
        <Link href="/register" className="underline font-bold text-primary underline-offset-4">
        Register
        </Link>
      </div>
    </div>
    );
};

export default LoginForm;