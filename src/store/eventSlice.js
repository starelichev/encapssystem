import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helpers/api";

export const getEvent = createAsyncThunk(
    'events/getEvent',
    async function() {
        const getEvent = await axios.get(`${api}/api/events`).then(res => res.data);
        console.log('refreshed events');
        return getEvent;
    }
);

const eventSlice = createSlice({
    name : 'events',
    initialState: {
        event: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getEvent.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [getEvent.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.event = action.payload;
        },
        [getEvent.rejected] : (state, action) => {},
    }
});

export default eventSlice.reducer;