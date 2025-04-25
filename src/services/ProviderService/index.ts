"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"



export const updateSpecialties = async (updatedPassword:FieldValues) =>{
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/provider/updatespecialties`,
            {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value
                },
                body: JSON.stringify(updatedPassword)
            },
        
            
        )
        revalidateTag('PROVIDER')
        return res.json()
       }catch(error: any){
         return Error(error)
       }
}       



export const createMeal = async ( mealData:FieldValues) =>{
    
    try{
     const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/provider/createmeal`,
         {
             method:"POST",
             headers:{
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value
             },
             body: JSON.stringify(mealData)
         },
     
         
     )

     if(!res.ok){
        throw new Error(`${res.status}`)
     }
     revalidateTag('PROVIDER')
     return res.json()
    }catch(error: any){
      return Error(error)
    }
 
 }



 export const getAllMeals = async () =>{
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/provider/getallmeals`,
            {
                next:{
                    tags:['PROVIDER']
                }
            },
        
            
        )

        const data = await res.json()
       
        return data

       }catch(error: any){
         return Error(error)
       }
} 


export const updateMeals = async (data:FieldValues, mealId: string) =>{
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/provider/meal/update/${mealId}`,
            {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value
                },
                body: JSON.stringify(data)
            },
        
            
        )
        revalidateTag('PROVIDER')
        return res.json()
       }catch(error: any){
         return Error(error)
       }
}  


export const createMenus = async ( menuData:FieldValues) =>{
    
    try{
     const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/provider/createmenus`,
         {
             method:"POST",
             headers:{
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value
             },
             body: JSON.stringify(menuData)
         },
     
         
     )

     if(!res.ok){
        throw new Error(`${res.status}`)
     }
     revalidateTag('PROVIDER')
     return res.json()
    }catch(error: any){
      return Error(error)
    }
 
 }


 export const getAllMenus = async (query?:{[key:string]:string | string[] | undefined}) =>{
   
    const params = new URLSearchParams()
  
    console.log(query);

    if(query?.search){
        params.append('search', query?.search.toString())
    }
    if(query?.cuisine){
        params.append('cuisine', query?.cuisine.toString())
    }
    if(query?.portion){
        params.append('portion', query?.portion.toString())
    }
    if(query?.mealSlot){
        params.append('mealslot', query?.mealSlot.toString())
    }
    if(query?.dietary){
        params.append('dietary', query?.dietary.toString())
    }
  
   
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/provider/getallmenus?${params}`,
            {
                next:{
                    tags:['PROVIDER']
                }
            },
        
            
        )

        const data = await res.json()
       
        return data

       }catch(error: any){
         return Error(error)
       }
} 