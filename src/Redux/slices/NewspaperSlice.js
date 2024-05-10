import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNewspapers = createAsyncThunk(
    "newspapers/fetchNewspapers",
    async () => {
       try {
        const response = await axios.get("https://newspaper-backend-1.onrender.com/newspapers");
        return response.data;
       } catch (error) {
        console.log(error);  
       }
    }
)

export const addNewspaper = createAsyncThunk(
    "newspapers/addNewspaper",
    async ({name,price}) => {
       try {
        const response = await axios.post("https://newspaper-backend-1.onrender.com/newspapers",{name,price});
        return response.data;
       } catch (error) {
        console.log(error);  
       }
    }
)

export const updateNewspaper = createAsyncThunk(
    "newspapers/updateNewspaper",
    async({id,name,price}) => {
       try {
        const response = await axios.put(`https://newspaper-backend-1.onrender.com/newspapers/${id}`,{name,price});
        return response.data;
       } catch (error) {
        console.log(error);  
       }
    }
)

export const deleteNewspaper = createAsyncThunk(
    "newspapers/deleteNewspaper",
    async ({id}) => {
       try {
        await axios.delete(`https://newspaper-backend-1.onrender.com/newspapers/${id}`);
        return id;
       } catch (error) {
        console.log(error);  
       }
    }
)



export const newspaperSlice = createSlice({
    name: "newspapers",
    initialState: {
        newspapers: [],
        isLoading: false,
        error: null
    },
    reducers: {
        setNewspapers : (state, action) => {
            state.newspapers = action.payload;
        }
        
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNewspapers.pending, (state) => {
            state.isLoading = true;
            state.error = null;

        })
        .addCase(fetchNewspapers.fulfilled, (state, action) => {
            localStorage.setItem("newspapers", JSON.stringify(action.payload));
            state.newspapers = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchNewspapers.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;

        })
        .addCase(updateNewspaper.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(updateNewspaper.fulfilled, (state, action) => {
            state.newspapers = state.newspapers.map((newspaper) => newspaper._id === action.payload._id ? action.payload : newspaper);
            localStorage.setItem("newspapers", JSON.stringify(state.newspapers));
            state.isLoading = false;
        })
        .addCase(updateNewspaper.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(deleteNewspaper.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(deleteNewspaper.fulfilled, (state, action) => {
            state.newspapers = state.newspapers.filter((newspaper) => newspaper._id !== action.payload);
            localStorage.setItem("newspapers", JSON.stringify(state.newspapers));
            state.isLoading = false;
        })
        .addCase(deleteNewspaper.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(addNewspaper.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        .addCase(addNewspaper.fulfilled, (state, action) => {
            state.newspapers.push(action.payload);
            localStorage.setItem("newspapers", JSON.stringify(state.newspapers));
            state.isLoading = false;
        })
        .addCase(addNewspaper.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })  

    }
})

export const selectNewspapers = (state) => state.newspaper;

export const {setNewspapers} = newspaperSlice.actions;

export default newspaperSlice.reducer;

