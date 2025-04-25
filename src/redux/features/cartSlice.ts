import { TMeal } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";

interface Iinit {
    products:TMeal[]
}

const initialState: Iinit = {
    products: [],
    
  };


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
         state.products.push(action.payload)
         
        },
         }
})

export const {
    addProduct,
  } = cartSlice.actions;

  
  export default cartSlice.reducer;



