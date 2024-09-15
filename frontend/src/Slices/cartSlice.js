import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    total: 0,
    flag: false,
    myOrders: [],
    currentOrderStatus: null,
  },
  reducers: {
    getCart: (state, action)=>{
        state.cart = action.payload;  
        state.total = state.cart.length;   
    },
    
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id!== action.payload); 
      state.total = state.cart.length; 
    },
    setTotal: (state, action) => {
     state.total = action.payload;
    },
    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    setCurrentOrderStatus: (state, action) => {
      state.currentOrderStatus = action.payload;
    }

   
  }
})

export const { getCart,setTotal, removeFromCart , setMyOrders, setCurrentOrderStatus} = cartSlice.actions;

export default cartSlice.reducer;