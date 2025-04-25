import { TMeal } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Iinit {
    meals:TMeal[]
}

const initialState: Iinit = {
    meals:[],
    
  };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
         state.meals.push(action.payload)
         
        },
         }
})


export const orderMeal = (state: RootState) =>{
    return state.cart.meals
}


export const {
    addProduct,
  } = cartSlice.actions;

  
  export default cartSlice.reducer;



