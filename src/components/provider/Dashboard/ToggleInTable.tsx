import { Switch } from "@/components/ui/switch";
import { updateMeals } from "@/services/ProviderService";
import { useState } from "react";
import { toast } from "sonner";


const ToggleInTable = ({id}:{id:string | undefined}) => {

    const [toggle , setToggle] = useState(false)
   

    const handletoggle = async (id:string) =>{
        if(!toggle){
            setToggle(true)
        }else{
            setToggle(false)
        }
        
        const available:any = { }
        
        if(!toggle){
        available["available"] = false

        }else{
            available["available"] = true
        }

      

       try{
        const res = await updateMeals(available, id)
        console.log(res);
          if(res.status){
            toast.success(res?.message)
          }else{ 
            toast.error(res?.message)
          }

       }catch(error:any){
        console.error(error)
       }
    
    }


    return (
        <div>
             <Switch
                className="cursor-pointer  "
                id={id}
                checked={toggle}
                onCheckedChange={()=> handletoggle(id as string)}
               />
            
        </div>
    );
};

export default ToggleInTable;