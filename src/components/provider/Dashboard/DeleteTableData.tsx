"use client"

import { Trash } from "lucide-react";


const DeleteTableData = ({id}:{id:string | undefined}) => {

    const handleDelete = (id:string | undefined) =>{
        console.log(id);
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