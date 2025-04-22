import CustomerProfile from '@/components/customer/profile/CustomerProfile';
import { getCurrentUser } from '@/services/AuthServices';
import { getSingleCustomer } from '@/services/CustomerServices';
import React from 'react';

const customerProfile = async () => {

    const user = await getCurrentUser()
    

     const {data:singlecustomer} = await getSingleCustomer(user?.email)
  

    return (
        <div>
            <CustomerProfile  singlecustomer={singlecustomer} />
        </div>
    );
};

export default customerProfile;