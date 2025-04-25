import CreateManus from "@/components/provider/PostMenus/CreateManus";
import { getAllMeals } from "@/services/ProviderService";
import { Suspense } from "react";


const postMealManu = async() => {


    const {data } = await getAllMeals()
 

    return (
        <div className="flex justify-center items-center align-middle">
            <Suspense fallback={<div>Loading menus...</div>}>


            <CreateManus data={data}/>
            </Suspense>
        </div>
    );
};

export default postMealManu;