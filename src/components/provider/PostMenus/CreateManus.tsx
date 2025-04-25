"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import React from "react";



const CreateManus = () => {
    const [date, setDate] = React.useState<Date>()
    console.log(date?.toUTCString);

    const  form  = useForm()

const {control,  handleSubmit } = form 
    const onSubmit = (data:FieldValues) =>{
        // toast.success("Meal Menu submitted successfuly")
        console.log(data);


    }
    

    return (
        <div className=" w-2/3">
            <h1 className="py-5  text-center text-xl font-bold">Post Meal Menus</h1>

            <form onSubmit={handleSubmit(onSubmit)} >
                <div className="mb-4">
                    <label className="block mb-1">Menu Name</label>
                    <Controller 
                    
                    control={control}
                    name ="menuName"
                    render={({field})=>(
                        <Input {...field}  value={field.value ?? " "} placeholder="Enter Manu name"/>

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
                    name="dataAvailability"
                    render={({field})=>(
                        <Select onValueChange={field.onChange} value={field.value ?? ' '}>
                            <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select meal slot"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Lunch">Lunch</SelectItem>
                                <SelectItem value="Dinner">Dinner</SelectItem>
                            </SelectContent>
                        </Select>

                    )} />


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