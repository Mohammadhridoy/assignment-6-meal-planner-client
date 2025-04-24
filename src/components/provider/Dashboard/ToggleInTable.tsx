import { Switch } from "@/components/ui/switch";
import { useState } from "react";


const ToggleInTable = ({id}:{id:string | undefined}) => {

    const [toggle , setToggle] = useState(false)
    console.log(toggle);

    const handletoggle = (id:string) =>{
        if(!toggle){
            setToggle(true)
        }else{
            setToggle(false)
        }
        
        console.log(id);
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