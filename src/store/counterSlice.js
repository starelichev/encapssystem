import {createSlice} from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name : 'params',
    initialState: {
        count: 0,
    },
    reducers: {
        increment(state) {
            state.count++
        },
        setNull(state) {
            state.count = 0
        }
    },
})

export const { increment, setNull } = counterSlice.actions;
export default counterSlice.reducer;