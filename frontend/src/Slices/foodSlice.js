import { createSlice } from "@reduxjs/toolkit";

const foodSlice = createSlice({
  name: "food",
  initialState: {
    foods: [],
    selectedFood: {},
    searchQuery: 'All',
    reviews: [],
    selectedReview: {
        _id:"666944dcd5464674f1fe77d5",
        fullname:"sagar parise",
        email:"sagarparise001@gmail.com",
        image:"https://avatar.iran.liara.run/public/boy?username=sagarparise",
        comment:"hello world Your food app has a user-friendly interface and a diverse menu selection, enhancing the overall user experience. However, consider improving the delivery tracking feature for better transparency. Additionally, optimizing the app for faster load times would further elevate user satisfaction",
        rating:4
    },
    selectedCategory: null,
  },
  reducers: {
   getAllFoods: (state, action)=> {
    state.foods = action.payload;
   },
   setSelectFood: (state, action)=>{
    state.selectedFood = action.payload;
   },
   getFoodReviews: (state, action)=>{
    state.reviews = action.payload;
   },
   setSelectReview: (state, action)=>{
    state.selectedReview = action.payload;
   },
   setSearchQuery: (state, action)=>{
    state.searchQuery = action.payload;
   },
   setCategory: (state, action)=>{
    state.selectedCategory = action.payload;
   }

  }
})

export const { getAllFoods, setSelectFood, getFoodReviews, setSelectReview, setSearchQuery, setCategory } = foodSlice.actions;

export default foodSlice.reducer;

