import { configureStore } from "@reduxjs/toolkit";
import { login, logout } from "./authSlice";
import authReducer from "./authSlice"

const store=configureStore({
    reducer:{
        // login,  Yaha par galti ye ho raha tha ki hum action ko bhej rahe the jabki humko reducer ko bhejna hai
        //Confirgure stor e jo hai wo reducer mangta hai na ki indiviual actions
        // logout
        auth:authReducer,
    }
});

export default store;


//Ye isliye banate hai tajki sari tarah ki state of application  ko hum ek hi jagah se store kar sake  ye configuraestore hotaha hai. Yahi iska kaam hai 
