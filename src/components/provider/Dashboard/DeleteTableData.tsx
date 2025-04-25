"use client"

import { updateMeals } from "@/services/ProviderService";
import { Trash } from "lucide-react";
import { toast } from "sonner";


const DeleteTableData = ({id}:{id:string | undefined}) => {

    const handleDelete = async (id:string | undefined) =>{
        console.log(id);
        const isDeleted ={
            isDeleted : true
        }

        try{
            const res = await updateMeals(isDeleted, id as string)
            console.log(res);
              if(res.status){
                toast.success(res?.message)
              }else{ 
                toast.error(res?.message)
              }
    
           }catch(error){
            console.error(error)
           }
    }

    return (
        <div>
            <Trash 
            onClick={()=> handleDelete(id)}
             className="cursor-pointer" />
        </div>
    );
};

export default DeleteTableData;