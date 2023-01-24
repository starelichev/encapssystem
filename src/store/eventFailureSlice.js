import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getEventFailure = createAsyncThunk(
    'eventsFailure/getEventFailure',
    async function() {
        const getEventFailure = await axios.get('http://ads40.ru:8081/api/failure').then(res => res.data);
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