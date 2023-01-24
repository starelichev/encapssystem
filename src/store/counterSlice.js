import {createSlice} from "@reduxjs/toolkit";
import dayjs from 'dayjs';

const counterSlice = createSlice({
    name : 'params',
    initialState: {
        dateCount: dayjs().format('ss'),
    },
    reducers: {
        setDateNow(state) {
            state.dateCount = dayjs().format('ss')
        },
    },
})

export const { setDateNow, setCounter } = counterSlice.actions;
export default counterSlice.reducer;