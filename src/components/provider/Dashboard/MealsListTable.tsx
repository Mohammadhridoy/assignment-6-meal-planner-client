"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { TMeal } from "@/types/types";
import {  CircleCheck, DollarSign, X } from "lucide-react";
import ToggleInTable from "./ToggleInTable";
import DeleteTableData from "./DeleteTableData";
import EditTableData from "./EditTableData";




const MealsListTable = ({data}:{data:TMeal}) => {
console.log(data);

    return (
        <div>
            <div>
                        <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader >
                            <TableRow className="">
                            <TableHead className="w-[100px]">Image </TableHead>
                           <TableHead className="text-center">Meal Name</TableHead>
                            <TableHead className="text-center"> Price</TableHead>
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-center">Actions</TableHead>
                            
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((item:TMeal) => (
                            <TableRow className="" key={item?._id}>
                                <TableCell className="font-medium"><img  className="rounded-full lg:h-20 lg:w-20 border-4 border-green-400 shadow-md" src={item?.image} alt=""  /></TableCell>
                                <TableCell className="text-center">
                                    {item?.mealname}
                                </TableCell>
                                <TableCell className=" flex justify-center items-center"><DollarSign /> <span className="text-xl"> {item?.price} </span></TableCell>
                                <TableCell className="text-center">{item?.available? <h1 className="flex text-center justify-center ">
                                     <CircleCheck className="text-green-600 w-10"/> Available</h1>: 
                                <h1 className="flex text-center justify-center items-center" > <X className="text-red-800 "/> Unavailable</h1>}</TableCell>
        
                                <TableCell className="flex justify-center  items-center   gap-3 lg:mt-6 ">
                                   
                                    <EditTableData item={item}/>
                                    <DeleteTableData id={item?._id}/>
                                  <ToggleInTable  id={item?._id}/>
                                  

                                </TableCell>
                               
            
                               
                               
                            
                                
                            </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter className="bg-white">
                            <TableRow>
                            </TableRow>
                        </TableFooter>
                        </Table>
                                
                    </div>
            
        </div>
    );
};

export default MealsListTable;