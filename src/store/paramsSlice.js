import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getParams = createAsyncThunk(
    'params/getParams',
    async function() {
        const getParams = await axios.get('http://localhost:8081/api/last-data-sensor').then(res => res.data);
        console.log('Refreshed');
        return getParams;
    }
);

const todoSlice = createSlice({
    name : 'params',
    initialState: {
        params: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getParams.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [getParams.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.params = action.payload;
        },
        [getParams.rejected] : (state, action) => {},
    }
});

export default todoSlice.reducer;