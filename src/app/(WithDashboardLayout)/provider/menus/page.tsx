import CreateManus from "@/components/provider/PostMenus/CreateManus";
import { getAllMeals } from "@/services/ProviderService";


const postMealManu = async() => {


    const {data } = await getAllMeals()
 

    return (
        <div className="flex justify-center items-center align-middle">
            <CreateManus data={data}/>
        </div>
    );
};

export default postMealManu;