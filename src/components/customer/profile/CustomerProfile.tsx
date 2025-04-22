"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    
  } from "@/components/ui/card"
  import { Form, FormControl, FormDescription, FormField, FormItem,
     FormLabel, FormMessage } from "@/components/ui/form";

import { Input } from "@/components/ui/input"
import {  updatedCustomerInfo, updatePassword } from "@/services/CustomerServices";
import { Tuser } from "@/types/types";

import { MailCheck, MapPinHouse, PhoneCall, } from "lucide-react";


import { useForm, SubmitHandler, FieldValues, } from "react-hook-form";
import { toast } from "sonner";






const CustomerProfile =  ({singlecustomer}:{singlecustomer:Tuser} ) => {


    
    const authUser = singlecustomer

    console.log(authUser);
   

    const form = useForm();
        
          const {formState:{ isSubmitting}, reset} = form

        
          const onSubmit:SubmitHandler<FieldValues> = async (data) =>{
        
            const clearData = Object.fromEntries(
                Object.entries(data).filter(([_, value ] )=> value !=="" && value !== undefined)
            )

        

           try{
             
            if(clearData?.currentpassword ){
                const res = await updatePassword(clearData)
                if(res.status){
                    toast.success(res?.message )
                    reset()
                 
                  }else{ 
                    toast.error(res?.message)
                  }
    
             }

          
             if(!clearData?.currentpassword){
              
             const res = await updatedCustomerInfo(clearData)
             
             if(res.status){
                toast.success(res?.message)
                reset()
              }else{ 
                toast.error(res?.message)
              }
             }

           }catch(error:any){
              console.error(error)
           }
        
          }

         


    return (
      
       
        <div className="lg:flex justify-between  lg:gap-10 ">
            {/* profile card */}
           <div className="lg:w-2/5">
           <div className=" shadow-none pb-4 md:pb-4 lg:pb-2  ">
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
                    authUser?.address ? <h1 className="text-[16px]">{authUser?.address}</h1> : "N/A"
                }
                </div>

            </CardContent>
            <CardFooter className="flex justify-center align-middle">
                
            </CardFooter>
            </Card>
                
            </div>
            {/* Show preferences */}
            <div className=" shadow-none  md:pb-4 lg:pb-0 ">
                
            <Card className="">
            <h1 className=" text-xl border-b-2 pb-2 text-left pl-6"> My Preferences</h1>
            <CardContent>
                <div className="" >
            
                <h1 className="text-xl text-left font-semibold pb-2">Dietary Restrictions </h1>
                {
                   authUser?.preferences?.dietaryRestrictions.map((item) =>
                        <Badge className="text-[16px] text-white cursor-pointer">{item}</Badge>
                    )
                }
               
            
                </div>
              
                <div className="py-2" >
            
                <h1 className="text-xl text-left font-semibold pb-2">Preferred Cuisines </h1>
                {
                   authUser?.preferences?.preferredCuisines.map((item) =>
                        <Badge className="text-[16px] text-white cursor-pointer m-1 flex-wrap">{item}</Badge>
                    )
                }
               
            
                </div>
                <div className="pb-2 " >
                   
                <h1 className="text-xl text-left font-semibold pb-2">Portion Size </h1>
                <Badge className="text-[16px] text-white cursor-pointer m-1 flex-wrap">{authUser?.preferences?.portionSize}</Badge>
                </div>

            </CardContent>
            <CardFooter className="flex justify-center align-middle">
                
            </CardFooter>
            </Card>
                
            </div>
           </div>



            {/* edit profile card options */}
            <div className="md:w-full border-2 rounded-md p-3 md:p-5 lg:p-8  ">
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


                <Button className=" mt-3  text-white text-xl p-5 shadow-sm cursor-pointer " type="submit">
                    Save
                </Button>

                
               
                {/* form-02 */}
               
                 <div className="pt-10">
                 <h1 className="font-semibold text-xl  pb-5">Change Password </h1> 
                 <div className="md:flex    items-center  md:gap-11 lg:gap-7  ">
                
                <FormField
                control={form.control}
                name="currentpassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel> Current Password</FormLabel>
                    <FormControl>
                        <Input className="md:w-44 lg:w-96"  placeholder="Enter your current password "  type="password" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )} />

                <FormField
                control={form.control}
                name="newpassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>New password</FormLabel>
                    <FormControl>
                        <Input className="md:w-44 lg:w-96" type="password" placeholder="Enter new password" {...field} value={field.value || ''} />
                    
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )} />
                </div>
                 </div>

              


                <Button className=" mt-3  text-white text-xl p-5 shadow-sm cursor-pointer" type="submit">
                    Save
                </Button>
                </form>
                </Form>
             </div>
         

             
            </div>
        </div>
        
    
        
    );
};

export default CustomerProfile;