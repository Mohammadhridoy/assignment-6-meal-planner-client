import ManageMenus from "@/components/provider/Dashboard/ManageMenus";
import { getAllMeals } from "@/services/ProviderService";


const manageManus = async () => {


    const { data: getallmeals } = await getAllMeals()
   

    return (
        <div>
            <ManageMenus  allMeals={getallmeals}/>
        </div>
    );
};

export default manageManus;