import { createSlice } from "@reduxjs/toolkit";

const initialState={
    status:false,
    userData:null
}
// CreateSlice define karta hai lsice of the state for specific part of your app. Isme 3 part hota hai initial State jimse initial stae store hota hai state ka, phir name diya jayyt hai aur reducers->reducer swirtch case ki tarah kaam kaeta hai ek specific kaam ko karta hai object mki taah likha jat ahii nncche likha hua hia na jaise ki login ek action hai logout hai waise hi bahut sare hote hai
const authSlice=createSlice({
    name:"auth",
    initialState:{
        status:false,
        user:null,
    },
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData=action.payload.userData;
        },
        logout:(state)=>{
            state.status=false;
            state.userData=null;
        }
    }
});
//.actions karke sare reducer ko edxport karte hai 
export const {login,logout}=authSlice.actions;

export default authSlice.reducer;