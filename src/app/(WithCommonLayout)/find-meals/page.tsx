import FilterCard from "@/components/find-meals/FilterCard";
import ShowMealsData from "@/components/find-meals/ShowMealsData";
import { getAllMenus } from "@/services/ProviderService";
import { IMenus } from "@/types/types";
import { Suspense } from "react";


type SearchParams = Promise<{[key:string]:string | string[] | undefined}>


const findMeals = async ({searchParams}: { searchParams :SearchParams}) => {

    const query = await searchParams
    const {data:getAllMenusData } = await getAllMenus(query)



    return (
        <div className="h-screen  mt-4">
            {/* filter data */}
            <div className="lg:h-1/3 lg:px-[84px]  ">
            <Suspense fallback={<div>Loading filters...</div>}>
                <FilterCard  />
                </Suspense>
            </div>
            {/* Showing Data */}
            <div className=" lg:sticky">
                {
                    getAllMenusData.map((getAllMenu:IMenus) => <ShowMealsData 
                     key={getAllMenu._id} getAllMenu={getAllMenu} />)
                }
            </div>
            
        </div>
    );
};

export default findMeals;