import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helpers/api";

export const getFailure = createAsyncThunk(
    'failures/getFailure',
    async function() {
        const getFailure = await axios.get(`${api}/api/last-data-failure`).then(res => res.data);
        console.log('refreshed failure');
        return getFailure;
    }
);

const failureSlice = createSlice({
    name : 'failures',
    initialState: {
        failure: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getFailure.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [getFailure.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.failure = action.payload;
        },
        [getFailure.rejected] : (state, action) => {},
    }
});

export default failureSlice.reducer;