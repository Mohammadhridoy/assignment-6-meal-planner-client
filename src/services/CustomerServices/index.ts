"use server"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { FieldValues } from "react-hook-form"



export const updatedCustomerInfo = async (updatedData:FieldValues) =>{
   
   try{
    const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customer/update`,
        {
            method:"PATCH",
            headers:{
                "Content-Type": "application/json",
                Authorization: (await cookies()).get("accessToken")!.value
            },
            body: JSON.stringify(updatedData)
        },
    
        
    )
    revalidateTag('CUSTOMER')
    return res.json()
   }catch(error: any){
     return Error(error)
   }

}


export const updatePassword = async (updatedPassword:FieldValues) =>{
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customer/updatepassword`,
            {
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value
                },
                body: JSON.stringify(updatedPassword)
            },
        
            
        )
        revalidateTag('CUSTOMER')
        return res.json()
       }catch(error: any){
         return Error(error)
       }
} 


export const getSingleCustomer = async (email:string| undefined) =>{
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customer/singleuser/${email}`,
            {
                next:{
                    tags:['CUSTOMER']
                }
            },
        
            
        )
        return res.json()
       }catch(error: any){
         return Error(error)
       }
} 


export const updatePreferences = async (updatedPreferences:FieldValues) =>{
    try{
        const res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/customer/updatepreferences`,
            {
                method:"PATCH",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("accessToken")!.value
                },
                body: JSON.stringify(updatedPreferences)
            },
        
            
        )
        revalidateTag('CUSTOMER')
        return res.json()
       }catch(error: any){
         return Error(error)
       }
} 



