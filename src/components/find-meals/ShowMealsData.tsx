import { IMenus } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, ChefHat, Clock } from "lucide-react";

import { Button } from "../ui/button";
import CardMeal from "./CardMeal";

type getallMenuProps = {
    getAllMenu:IMenus
}


const ShowMealsData: React.FC<getallMenuProps> = ({ getAllMenu}) => {

    const { menuname, mealPublishDate, mealSlot, meals, providerId, specialNotes } = getAllMenu
   
    return (
        <div className="lg:px-[84px] mb-3 ">
            <Card className="w-fll  rounded-2xl py-8 ">
                <CardHeader className="flex flex-col gap-1">
                    <CardTitle className="text-xl">{menuname}</CardTitle>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4"/>
                        {mealSlot} | <CalendarIcon className="h-4 w-4"/>
                        {new Date(mealPublishDate).toDateString()}
                    </div>
                    <div className="text-sm flex items-center gap-2 mt-1 ">
                        <ChefHat className="h-4 w-4 text-orange-500"/>
                        <span>{providerId.name}</span>
                        {
                     specialNotes && (
                        <div>
                            <p className="text-sm italic  text-blue-300">Note: {specialNotes}</p>
                        </div>
                     )   
                    }
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div>
                        <h4 className="font-semibold">Meals included:</h4>
                        <ul className="list-disc  mt-4 space-y-1 flex justify-start items-center ">
                            {
                                meals.map((meal, idx)=>(

                                    <CardMeal  key={meal._id} meal={meal} />
                                    // <li key={idx} className="text-sm">
                                    //     {meal.mealname}<span className="text-muted-foreground">{meal?.portionSize}</span>
                                    //     {meal.tags && meal.tags.length> 0 && (
                                    //         <div className="flex flex-wrap gap-1 mt-1">
                                    //             {meal.tags.map((tag, i) => (
                                    //                 <Badge key={i} variant="outline" className="text-xs">{tag}</Badge>
                                    //             ))}
                                    //         </div>
                                    //     )}
                                    // </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/*  */}
                    
                   

                </CardContent>
            </Card>
        </div>
    );
};

export default ShowMealsData;