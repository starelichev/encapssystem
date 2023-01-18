import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const authOc = createAsyncThunk(
    'auth/fetchAuth',
    async (userdata) => {
        const data = {
            login: userdata.login,
            password: userdata.password,
        }
        const response = await axios.post('http://localhost:8081/api/login', data)
            .then(response => response.data);
        if (response === 'Вы авторизированы') {
            localStorage.setItem('Auth', JSON.stringify(response));
        }
        console.log(response)
        return response;
            });

const authSlice = createSlice({
    name : 'auth',
    initialState: {
        auth: '',
        status: null,
        error: null,
    },
    reducers: {
        quit(state) {
            state.auth = null;
        },
    },
    extraReducers: {
        [authOc.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [authOc.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.auth = action.payload;
        },
        [authOc.rejected] : (state, action) => {},
    }
});

export const { quit } = authSlice.actions;
export default authSlice.reducer;