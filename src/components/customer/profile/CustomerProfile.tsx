"use client"
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    
  } from "@/components/ui/card"
  import { Form, FormControl, FormDescription, FormField, FormItem,
     FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input"
import { useUser } from "@/context/UserContext";
import { MailCheck, MapPinHouse, PhoneCall, } from "lucide-react";


import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";





const CustomerProfile = () => {


    const {user} = useUser()
    const authUser = user

    const form = useForm();
        
          const {formState:{ isSubmitting}} = form
        
          const onSubmit:SubmitHandler<FieldValues> = async (data) =>{
        
            console.log(data);
        
          }

         


    return (
      
       
        <div className="lg:flex justify-between  lg:gap-10 ">
            {/* profile card */}
            <div className=" shadow-none pb-4 md:pb-4 lg:pb-0  lg:w-2/5">
            <Card className="">
      
            <CardContent>
                <div className="  flex justify-center ">
                    <img className="w-2/3 " src="https://i.ibb.co.com/Dgpw4zzR/profile.png" alt="" />
                </div>
                <div className=" flex justify-start items-center gap-3 py-2" >
            
                <h1 className="text-2xl text-left font-bold"> {authUser?.name}</h1>
            
                </div>
                {/* email */}
                <div className="flex justify-start items-center gap-3 pb-2     " >
                    <MailCheck className="text-xl  lg:text-[14px]"/>
                <h1 className= " text-xl lg:text-[16px]">{authUser?.email}</h1>
                </div>
                <div className="flex justify-start align-middle gap-3 pb-2 " >
                    <PhoneCall className="text-[14px]"/>
                <h1 className="text-[16px] ">{authUser?.phone}</h1>
                </div>
                <div className="flex justify-start align-middle gap-3 pb-2 " >
                  
                    <MapPinHouse className="text-[16px]" />
                    
                {
                    authUser?.address ? <h1 className="text-[16px]">{authUser?.address}</h1> : "Dhamrai,Dhaka"
                }
                </div>

            </CardContent>
            <CardFooter className="flex justify-center align-middle">
                
            </CardFooter>
            </Card>
                
            </div>



            {/* edit profile card options */}
            <div className="md:w-full border-2 rounded-md p-3 md:p-5 lg:p-8 ">
             <h1 className="font-bold xl md:text-2xl  lg:text-3xl"> Profile </h1>
             <h1 className="font-semibold  py-2 text-gray-400  "> Customer Information</h1>
             {/* update input fields  */}
             <div>
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* input-01 */}
                <div className="md:flex   items-center  md:gap-11 lg:gap-7">
                    
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                        <Input className="md:w-44 lg:w-96"  placeholder="Enter your name"  type="text" {...field} value={field.value || ''} />
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
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input className="md:w-44 lg:w-96" type="email" placeholder="Enter your E-mail" {...field} value={field.value || ''} />
                    
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )} />
                </div>

                {/* input-02 */}
                <div className="md:flex   items-center  md:gap-11 lg:gap-7 lg:pt-3">
                    
                    <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel> Phone Number</FormLabel>
                        <FormControl>
                            <Input className="md:w-44 lg:w-96"  placeholder="Enter your phone number"  type="text" {...field} value={field.value || ''} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )} />
    
                    <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel> Address</FormLabel>
                        <FormControl>
                            <Input className="md:w-44 lg:w-96" type="text" placeholder="Enter address Divisions and District" {...field} value={field.value || ''} />
                        
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )} />
                    </div>


                <Button className=" mt-3  text-white text-xl p-5 shadow-sm " type="submit">
                    {isSubmitting ? "Saving....": "save"} 
                </Button>

                </form>
                </Form>
                {/* form-02 */}
                <CustomerProfile/>
             </div>
         


            </div>
        </div>
        
    
        
    );
};

export default CustomerProfile;