"use client"
import React from 'react';
import CreateMeals from './CreateMeals';
import { TMeal } from '@/types/types';
import MealsListTable from './MealsListTable';



const ManageMenus = ({allMeals}:{allMeals:TMeal}) => {



    return (
        <div>
            {/* create meal */}
            <div className=' flex justify-end items-center '>
            <CreateMeals/>
            </div>

            {/* show Meal */}
            <div className='mt-5'>
                <MealsListTable  data={allMeals}/>
            </div>

        </div>
    );
};

export default ManageMenus;