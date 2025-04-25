"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { updatePreferences } from "@/services/CustomerServices";
import { Controller, FieldValues, useForm } from "react-hook-form";
import Select from 'react-select';
import { toast } from "sonner";

type TRestriction = {
    label:string,
    value:string 
}


const CustomerPreferences = () => {

    

    const restrictionOptions = [
        {label:"Vegan", value: "vegan"},
        {label:"Vegetarian", value: "vegetarian"},
        {label:"Gluten-Free", value: "gluten-free"},
        {label:"Nut-Free", value: "nut-free" },
        {label:"Halal", value: "halal"},
    ]

    const cuisineOptions = [
        {label:"Indian", value: "indian"},
        {label:"Italian", value: "italian"}, 
        {label:"Chinese", value: "chinese"},
        {label:"Thai", value: "thai"},
        {label:"Mexican", value: "mexican"},
    ]

    const portionOptions = [
        {label:"No-portion", value: " "},
        {label:"Small", value: "small"},
        {label:"Medium", value: "medium"},
        {label:"Large", value: "large"},
    ]

    const {control, handleSubmit, reset } = useForm( )

    const onSubmit = async (data:FieldValues) =>{
       console.log(data);

        const payload = {
            
            dietaryRestrictions: data.dietaryRestrictions?.map((item: TRestriction) => item.value),
            preferredCuisines: data.preferredCuisines?.map((item: TRestriction) => item.value),
            portionSize:data.portionSize?.value
        }
        const clearData = Object.fromEntries(
            Object.entries(payload).filter(([pair, value ] )=>{
                if(pair === undefined) return false
                if(value === undefined || value === null) return false
                if(Array.isArray(value) && value.length === 0 ) return false
                if(typeof value ==="string" && value.trim() === "") return false
                return true
            })
        )
        
      

        try{
            const res = await updatePreferences(clearData)
             
             if(res.status){
                toast.success(res?.message)
                reset({
                    dietaryRestrictions:[],
                    preferredCuisines:[ ],
                    portionSize:null

                })
              }else{ 
                toast.error(res?.message)
              }
            } catch(error){
              console.error(error)
           }

        



    }
    


    return (
        <div >
            <Card className="max-w-2xl mx-auto mt-10 py-6">
                <CardHeader>
                    <CardTitle className="text-2xl">Dietary Preferences</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                           
                             <Label className="mb-2 block">Dietary Restrictions </Label>
                             <Controller
                                name="dietaryRestrictions"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                    {...field}
                                    instanceId="dietary-select"
                                    isMulti
                                    options={restrictionOptions}
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                    />
                                )}
                                />
                        </div>
                                    <div>
                        <Label className="mb-2 block">Preferred Cuisines</Label>
                        <Controller
                        name="preferredCuisines"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                              instanceId="cuisines-select"
                            isMulti
                            options={cuisineOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            />
                        )}
                        />
                    </div>

                    {/* Portion Size */}
                    <div>
                        <Label className="mb-2 block">Portion Size</Label>
                        <Controller
                        name="portionSize"
                        control={control}
                        render={({ field }) => (
                            <Select
                            {...field}
                              instanceId="portion-select"
                            options={portionOptions}
                            className="react-select-container"
                            classNamePrefix="react-select"
                            />
                        )}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <Button type="submit" className="w-full cursor-pointer">
                        Save Preferences
                        </Button>
                    </div>

                    </form>
                </CardContent>

            </Card>
            
        </div>
    );
};

export default CustomerPreferences;