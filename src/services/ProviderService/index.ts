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
        revalidateTag('Provider')
        return res.json()
       }catch(error: any){
         return Error(error)
       }
} 