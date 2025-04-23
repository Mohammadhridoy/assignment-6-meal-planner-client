"use client"

import Select from 'react-select';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Form , FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { toast } from 'sonner';
import { updateSpecialties } from '@/services/ProviderService';


type TRestriction = {
    label:string,
    value:string 
}


const UpdateProvider = () => {

    const cuisineOptions = [
        {label:"Indian", value: "indian"},
        {label:"Italian", value: "italian"}, 
        {label:"Chinese", value: "chinese"},
        {label:"Thai", value: "thai"},
        {label:"Mexican", value: "mexican"},
    ]

    const dayOptions = [
        {label:"Saturday", value: "Saturday"},
        {label:"Sunday", value: "Sunday"}, 
        {label:"Monday", value: "Monday"},
        {label:"Tuesday", value: "Tuesday"},
        {label:"Wednesday", value: "Wednesday"},
        {label:"Thursday", value: "Thursday"},
        {label:"Friday", value: "Friday"},
    ]


    const form = useForm( )
   const {control, handleSubmit, reset } = form

    const onSubmit = async (data:FieldValues) =>{
       console.log(data);

        const payload = {
            
            cuisinespecialties: data.cuisinespecialties?.map((item: TRestriction) => item.value),
            availability: data.availability?.map((item: TRestriction) => item.value),
            price:data.price
        }
       
        const clearData = Object.fromEntries(
            Object.entries(payload).filter(([_, value ] )=>{
                if(value === undefined || value === null) return false
                if(Array.isArray(value) && value.length === 0 ) return false
                if(typeof value ==="string" && value.trim() === "") return false
                return true
            })
        )
        
        console.log(clearData)
        
        try{
              
            const res = await updateSpecialties(clearData)
            
            if(res.status){
               toast.success(res?.message)
               reset({
                cuisinespecialties:[],
                availability:[ ],
                price:null

            })
             }else{ 
               toast.error(res?.message)

             }
            

          }catch(error:any){
             console.error(error)
          }
        



    }


    return (
        <div className='w-full'>
            <Card className=" mt-10 shadow-none border-0 lg:-ml-6   ">
                <CardHeader>
                    <CardTitle className="text-2xl"> Provider Specialties</CardTitle>
                </CardHeader>

                <CardContent>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                           
                             <Label className="mb-2 block"> Cuisine Specialties</Label>
                             <Controller
                                name="cuisinespecialties"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                    {...field}
                                    instanceId="cuisine-select"
                                    isMulti
                                    options={cuisineOptions }
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    />
                                )}
                                />
                        </div>
                                    <div>
                        <Label className="mb-2 block">Availability</Label>
                        <Controller
                        name="availability"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                              instanceId="availability-select"
                            isMulti
                            options={dayOptions}
                            className="reSundaylect-container"
                            classNamePrefix = "PrefMondayact-select"
                            />
                        )}
                        />
                    </div>

                    {/* Portion Size */}
                    <div>
                        {/* <Label className="mb-2 block">Price of per Meal</Label> */}
                        <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel> Price of per Meal</FormLabel>
                            <FormControl>
                                <Input className="md:w-44 lg:w-96"  placeholder="Enter amount of per meal"  type="text" {...field} value={field.value || ''} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                            </FormItem>
                        )} />
                    </div>

                    {/* Submit Button */}
                    
                        <Button type="submit" className=" mt-3  text-white text-xl p-5 shadow-sm cursor-pointer ">
                        Save 
                        </Button>
                   

                    </form>
                    </Form>
                </CardContent>

            </Card>
            
        </div>
    );
};

export default UpdateProvider;