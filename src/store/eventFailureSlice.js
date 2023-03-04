import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helpers/api";

export const getEventFailure = createAsyncThunk(
    'eventsFailure/getEventFailure',
    async function() {
        const getEventFailure = await axios.get(`${api}/api/failure`).then(res => res.data);
        console.log('refreshed events failure');
        return getEventFailure;
    }
);

const eventFailureSlice = createSlice({
    name : 'eventsFailure',
    initialState: {
        eventFailure: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getEventFailure.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [getEventFailure.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.eventFailure = action.payload;
        },
        [getEventFailure.rejected] : (state, action) => {},
    }
});

export default eventFailureSlice.reducer;