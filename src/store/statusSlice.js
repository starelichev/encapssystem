import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helpers/api";

export const getStatus = createAsyncThunk(
    'status/getStatus',
    async function() {
        const getStatus = await axios.get(`${api}/api/plc-status`).then(res => res.data);
        console.log('refreshed status');
        return getStatus;
    }
);

const statusSlice = createSlice({
    name : 'status',
    initialState: {
        plcStatus: '',
        status: null,
        error: null,
    },
    extraReducers: {
        [getStatus.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [getStatus.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.plcStatus = action.payload;
        },
        [getStatus.rejected] : (state, action) => {},
    }
});

export default statusSlice.reducer;