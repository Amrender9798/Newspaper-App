import { configureStore } from "@reduxjs/toolkit";
import  customerReducer  from "./slices/CustomerSlice";
import NewspaperReducer from "./slices/NewspaperSlice";


const store = configureStore({
    reducer: {
        customer: customerReducer,
        newspaper: NewspaperReducer
      
    },
  });
  
export default store;