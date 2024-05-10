import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCustomers = createAsyncThunk(
    "customers/fetchCustomers",
    async () => {
       try {
        console.log('api is getting called');
        const response = await axios.get("https://newspaper-backend-1.onrender.com/customers");
        return response.data;
       } catch (error) {
        console.log(error);  
       }
    }
)

export const addCustomers = createAsyncThunk(
    "customers/addCustomers",
    async ({name}) => {
       try {
        const response = await axios.post("https://newspaper-backend-1.onrender.com/customers",{name});
        return response.data;
       } catch (error) {
        console.log(error);  
       }
    }
)



export const customerSlice = createSlice({
    name: "customers",
    initialState: {
        customers: [],
        balance : 0,
        isLoading: false,
        error: null,

    },
    reducers: {
        filterCustomer : (state, action) => {
            state.customers = state.customers.filter((customer) => customer.name.startsWith(action.payload));
        },

        setCustomers : (state,action) => {
            state.customers = action.payload;

        }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchCustomers.pending, (state) => {

            state.isLoading = true;
            state.error = null;
        })
        .addCase(fetchCustomers.fulfilled, (state, action) => {
            state.customers = action.payload.customers;
            localStorage.setItem("customers", JSON.stringify(action.payload.customers));
            state.balance = action.payload.totalBalance;
            state.isLoading = false;
        })
        .addCase(fetchCustomers.rejected, (state, action) => {
            
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(addCustomers.pending, (state) => {

            state.isLoading = true;
            state.error = null;
        })
        .addCase(addCustomers.fulfilled, (state, action) => {
            const updatedCustomers = [...state.customers, action.payload];
            state.customers = updatedCustomers;
            localStorage.setItem("customers", JSON.stringify(updatedCustomers));
            state.isLoading = false;
        })
        .addCase(addCustomers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export const selectCustomers = (state) => state.customer;

export const {filterCustomer, setCustomers} = customerSlice.actions;
export default customerSlice.reducer;
