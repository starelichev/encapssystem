import {configureStore} from '@reduxjs/toolkit'
import paramsReducer from "./paramsSlice";
import failureReducer from "./failureSlice";
import eventReducer from "./eventSlice";
import eventFailureReducer from "./eventFailureSlice";
import counterReducer from "./counterSlice";
import statusReducer from "./statusSlice";
import authOcReducer from "./authOcSlice";

export const store = configureStore({
    reducer: {
        params : paramsReducer,
        failure: failureReducer,
        event: eventReducer,
        eventFailure: eventFailureReducer,
        counter: counterReducer,
        plcStatus: statusReducer,
        authOc: authOcReducer,
    }
})