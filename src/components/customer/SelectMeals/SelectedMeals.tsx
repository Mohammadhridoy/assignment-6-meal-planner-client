"use client"
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { orderMeal } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";


const SelectedMeals = () => {
    const meals = useAppSelector(orderMeal)
    console.log(meals);

    return (
        <div className="flex justify-between items-center gap-5">
            <div className="w-10/12 flex flex-wrap gap-5">
            {
                meals.map((meal) => <Card key={meal._id} className=" flex flex-row      max-w-sm rounded-2xl overflow-hidden hovershadow-xl transition-shadow ">
                <img 
                 src={meal.image}
                 alt={meal.mealname}
                 className="h-32  lg:w-[500px] object-cover"/>
                <div>
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
                      
                       
                    </div>
                 </CardContent>
                </div>
                 <CardFooter className="">
                 
                
                        
                 </CardFooter>
                </Card>)
            }
            </div>
            <div className="border shadow-md w-full p-4">

                
            </div>



        </div>

    );
};

export default SelectedMeals;