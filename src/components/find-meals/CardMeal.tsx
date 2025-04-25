"use client"
import { TMeal } from "@/types/types";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { addProduct } from "@/redux/features/cartSlice";
import Image from "next/image";


const CardMeal = ({meal}:{meal:TMeal}) => {
    
    const dispatch = useAppDispatch()

    const handleAdd = (meal:TMeal) =>{
        
        dispatch(addProduct(meal))
        
    }

    return (
        <div >
            <Card className=" lg:w-10/12 lg:h-10/12 max-w-sm rounded-2xl overflow-hidden hovershadow-xl transition-shadow ">
            {/* <img 
             src={meal.image}
             alt={meal.mealname}
             className="h-48 w-full lg:w-[500px] object-cover"/> */}
            <Image
                    src={meal.image}
                    className="h-48 w-full lg:w-[500px] object-cover" alt={""}            />


             <CardContent className="px-4 space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">{meal.mealname}</h2>
                    <span className="text-lg font-semibold text-green-600">${meal.price}</span>

                </div>
               
                <div className="">
                   
                   <div className="flex  items-center gap-2">
                    <h1>category:</h1>
                    <Badge className="px-2 py-1 font-semibold" variant="secondary">{meal.category}</Badge>
                    </div>
                  
                    <div className="flex  items-center gap-2 py-3">
                    <h1>Portion Size:</h1>
                    <Badge variant="secondary">{meal.portionSize}</Badge>
                    </div>
                  
                    <div className="flex  items-center gap-2">
                        <h1>Tags</h1>
                    {
                        meal.tags?.map((tag, i) =>(
                            <Badge key={i} variant="outline">{tag}</Badge>
                        ))
                    }
                    </div>
                </div>
             </CardContent>
             <CardFooter className="p-2">
             
             <Button  className="w-full text-white text-xl cursor-pointer"
             onClick={ () => handleAdd(meal)}
             >Add Cart</Button>
                    
             </CardFooter>
            </Card>
            
        </div>
    );
};

export default CardMeal;