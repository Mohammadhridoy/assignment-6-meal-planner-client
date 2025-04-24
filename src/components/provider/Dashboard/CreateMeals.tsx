"use client"
 


import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, 
    FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from "lucide-react";
import { createMeal } from "@/services/ProviderService";
import { toast } from "sonner";






const CreateMeals = () => {

    const[ingredients, setIngredients] = useState<string[]>([ ])
    const[tags, setTags] = useState<string[]>([])


    const form = useForm();
    
      const {formState:{ isSubmitting}, reset} = form
    
      const onSubmit:SubmitHandler<FieldValues> = async (data) =>{
      

      const filupAlldata = {
            mealname: data?.mealName?.trim()  || " ",
            category : data?.category?.trim(),
            description : data?.description?.trim() || " ",
            image: data?.image?.trim() || " ",
            ingredients : ingredients.map((item) => item?.trim?.() || item), 
            portionSize:data?.portionSize?.trim() || " ",
            preparationTime : data?.preparationTime?.trim() || " ",
            price : data?.price?.trim() || " ",
            tags: tags.map((item) => item?.trim?.() || item)
                }
      console.log("filupAlldata", filupAlldata);


        try{
          const res = await createMeal(filupAlldata )
          
          console.log(res);
          if(res.status){
            toast.success(res?.message)
            reset()
            setIngredients([])
            setTags([])
          }else{ 
            toast.error(res?.message)
          }
    
        }catch(error: any){
          console.error(error);
        }
    
      }


      const handleIngredientsButton = (data:string ) =>{
        setIngredients((prevIngredients)=> [ ...prevIngredients, data])

      }
      const handleTagsButton = (data:string) =>{
        setTags((prevTags) => [...prevTags, data])
      }

      const handleRemoveTags = () => {
        setTags((prev)=> prev.slice(0, -1))
      }

        const handleRemove = () =>{
            setIngredients((prev) => prev.slice(0, -1))
        }

    return (
 
              <Dialog >
      <DialogTrigger className="" asChild>
        <Button  className="bg-primary cursor-pointer text-white hover:text-black transition-all ease-in delay-75" variant="outline">Create Meal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md ">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {/* Main content */}
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="mealName"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Meal Name </FormLabel>
              <FormControl>
                <Input placeholder="Enter meal name" type="text" {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Image</FormLabel>
              <FormControl>
                <Input  placeholder="Enter meal image"  type="text" {...field} value={field.value || ''} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Description</FormLabel>
              <FormControl>
                <Input  type="text"  placeholder="Enter short descriptin" {...field} value={field.value || " "} />
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

          <div className="md:flex justify-between items-center gap-3">
          <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
             <FormLabel> Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your Price like { 90 } " {...field} value={field.value || ''} />
               
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

              {/* preparationTime */}
              <FormField
          control={form.control}
          name="preparationTime"
          render={({ field }) => (
            <FormItem>
             <FormLabel>Meal PreparationTime</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter Making Time " {...field} value={field.value || ''} />
               
              </FormControl>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />
          </div>



          {/* category */}
          <FormField 
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
             <FormLabel>category</FormLabel>
             <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select category " />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Veg">Veg</SelectItem>
                  <SelectItem value="Non-Veg">Non-Veg</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />

          {/* portionSize */}
          <FormField 
          control={form.control}
          name="portionSize"
          render={({ field }) => (
            <FormItem>
             <FormLabel>PortionSize</FormLabel>
             <Select onValueChange={field.onChange} defaultValue={field.value} >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select portionSize" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Small">Small</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Large">Large</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription />
              <FormMessage />
            </FormItem>
          )} />
          {/* tags */}
          <FormField 
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem className="relative ">
             <FormLabel className="flex flex-wrap" > Tags:
             {
                    tags.map((tag, index) => <h1 className="text-primary text-[16px] " key={index}>{tag}</h1>)
                }
             </FormLabel>
             <div className="flex justify-between items-center gap-3">
             <FormControl>
                <Input  type="text" placeholder="Enter Meal Tags like Asign, Comfornt-food.." {...field} value={field.value || ''} />
               
              </FormControl>
              <button 
              className="bg-black px-5 py-1 rounded-md text-white cursor-pointer "
              type="button"
              onClick={()=>{
                handleTagsButton(field.value)
                form.setValue("tags", " ")
              }}
               > Add </button>

                <button 
              type="button"
               className="bg-black px-5 py-1 rounded-md text-white cursor-pointer "
              onClick={
                handleRemoveTags
              }
               > <X/> </button>

                </div>  
              <FormDescription />
              <FormMessage />
            </FormItem>

          )} />

          {/* ingredients */}
        <FormField 
          control={form.control}
          name="ingredients"
          render={({ field }) => (
            <FormItem className="relative ">
             <FormLabel className="flex flex-wrap"> ingredients:
             {
                    ingredients.map((ingredient, index) => <h1 className="text-primary text-[16px]  " key={index}>{ingredient}</h1>)
                }
             </FormLabel>
             <div className="flex justify-between items-center gap-3">
             <FormControl>
                <Input  type="text" placeholder="Enter meal ingredients like eggs, tomato, ..." {...field} value={field.value || ''} />
               
              </FormControl>
              <button 
              type="button"
               className="bg-black px-5 py-1 rounded-md text-white cursor-pointer "
              onClick={()=>{
                handleIngredientsButton(field.value)
                form.setValue("ingredients"," ")
              }}
               > Add</button>

                <button 
                 className="bg-black px-5 py-1 rounded-md text-white cursor-pointer "
              type="button"
              onClick={
                handleRemove
              }
               >  <X/></button>

                </div>  
              <FormDescription />
              <FormMessage />
            </FormItem>

          )} />
      

     

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="submit" className="mt-3  text-white text-xl p-5 shadow-sm cursor-pointer"  variant="default">
            {isSubmitting ? "Creating....": "Create"} 
            </Button>
          </DialogClose>
        </DialogFooter>

        </form>
        </Form>
      </DialogContent>
    </Dialog>
            
       
    );
};

export default CreateMeals;