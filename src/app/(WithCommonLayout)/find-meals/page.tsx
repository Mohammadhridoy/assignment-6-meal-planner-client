import FilterCard from "@/components/find-meals/FilterCard";
import ShowMealsData from "@/components/find-meals/ShowMealsData";
import { getAllMenus } from "@/services/ProviderService";
import { IMenus } from "@/types/types";




const findMeals = async () => {


    const {data:getAllMenusData } = await getAllMenus()


    return (
        <div className="h-screen ">
            {/* filter data */}
            <div className="lg:h-1/5 lg:px-[84px] ">
                <FilterCard  />
            </div>
            {/* Showing Data */}
            <div className="">
                {
                    getAllMenusData.map((getAllMenu:IMenus) => <ShowMealsData 
                     key={getAllMenu._id} getAllMenu={getAllMenu} />)
                }
            </div>
            
        </div>
    );
};

export default findMeals;