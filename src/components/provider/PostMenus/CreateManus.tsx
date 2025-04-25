"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Controller, FieldValues, useForm,} from "react-hook-form";
import { toast } from "sonner";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
 
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import React, { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import Select from 'react-select';
import { TMeal } from "@/types/types";
import { useUser } from "@/context/UserContext";
import { createMenus } from "@/services/ProviderService";


type Titem = {
    label:string,
    value:string
}

const CreateManus = ({data}:{data:TMeal[]}) => {

    const [option, setOption] = useState<{label:string, value:string | undefined}[]>([])
    const mealSlot = [
        {label:"Lunch", value:"Lunch"},
        {label:"Dinner", value:"Dinner"},
        {label:"Breakfast", value:"Breakfast"}

    ]

    useEffect(( )=>{
        if(data){
            const  mealOptions = data?.map((item) => ({
                label:item.mealname,
                value : item._id,
            }  ))
            setOption(mealOptions)
        }
    }, [data])

    const{ user} = useUser()
  

    const [date, setDate] = React.useState<Date>()
   

    const  form  = useForm()

const {control,  handleSubmit, reset} = form 
    const onSubmit = async (data:FieldValues) =>{
      

        const filterData = {
            menuname : data?.menuname?.trim(),
            mealSlot: data?.mealSlot.value?.trim(),
            meals: data?.meals.map((item:Titem) => item.value?.trim() ),
            mealPublishDate: date?.toISOString(),
            specialNotes: data?.specialNotes?.trim(),
            providerId: user?.id 
        }

        console.log("fill", filterData);

        if(!filterData?.menuname || filterData?.meals.length === 0 || !filterData?.providerId){
                toast.error("Please complete all required fields")
        }
          try{
                  const res = await createMenus(filterData)
                  
                  console.log(res);
                  if(res.status){
                    toast.success(res?.message)
                    reset({
                        menuname : " ",
                        mealSlot: null,
                        meals: [],
                        mealPublishDate: null, 
                        specialNotes: " ",
                    })
                    
                    
                  }else{ 
                    toast.error(res?.message)
                  }
            
                }catch(error: any){
                  console.error(error);
                }


    }
    

    return (
        <div className=" w-2/3">
            <h1 className="py-5  text-center text-xl font-bold">Post Meal Menus</h1>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-4">
                    <label className="block mb-1">Menu Name</label>
                    <Controller 
                    
                    control={control}
                    name ="menuname"
                    render={({field})=>(
                        <Input {...field}   placeholder=" Enter Manu name" value={field.value ?? " "}/>

                    )}
                    />
                </div>

                {/* date */}
                <div className="mb-4">
                   
                        <Popover >
                            <PopoverTrigger asChild>
                                <Button
                                variant={"outline"}
                                className={cn(
                                    "lg:w-full  justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                                >
                                <CalendarIcon />
                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                                
                                />
                            </PopoverContent>
                            </Popover>
                </div>
                {/* meal Slot */}
                <div className="mb-4">
                    <label className="block mb-1">Meal Slot</label>
                    <Controller 
                    control={control}
                    name="mealSlot"
                    render={({field})=>(
                        // 
                        <Select 
                        {...field}
                        instanceId="mealSlot-3"
                        options={ mealSlot}
                        placeholder="Select Meal Slot"
                        isClearable
                        />
                    )} 
                    />


                </div>
                    {/* map meals  */}
                <div>
                        <Label className="mb-2 block">Meals</Label>
                        <Controller
                        name="meals"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                            instanceId ="meals-select"
                            isMulti
                            options={ option}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            />
                        )}
                        />
                    </div>


                {/* note */}
                <div className="mb-4">
                    <label className="block mb-1">Special Notes </label>
                    <Controller 
                    control={control}
                    name="specialNotes"
                    render={({field})=>(
                        <Input {...field} value={field.value ?? " "}  placeholder="Enter special notes"/>

                    )} />
                </div>
                <div className="mt-4">
                    <Button type="submit"className="w-full text-white cursor-pointer text-xl">
                        Post Meal Menu
                    </Button>

                </div>
            </form>
        </div>
    );
};

export default CreateManus;