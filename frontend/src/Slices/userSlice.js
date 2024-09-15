import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    token: null,
   
  },
  reducers: {
   setAuthUser : (state, action)=>{
    state.user = action.payload;
   },
   setAuthToken : (state, action)=>{
    state.token = action.payload;
   }
  }
})

export const {setAuthUser, setAuthToken} = userSlice.actions;

export default userSlice.reducer;