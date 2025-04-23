import ProviderProfile from "@/components/userProvider/profile/ProviderProfile";
import UpdateProvider from "@/components/userProvider/profile/UpdateProvider";
import { getCurrentUser } from '@/services/AuthServices';
import { getSingleCustomer } from '@/services/CustomerServices';

const Profile =async () => {

    const user = await getCurrentUser()
        
    
         const {data:singlecustomer} = await getSingleCustomer(user?.email)

    return (
        <div>
            <ProviderProfile  singlecustomer={singlecustomer} />
            
        </div>
    );
};

export default Profile;