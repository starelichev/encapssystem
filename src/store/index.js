import {configureStore} from '@reduxjs/toolkit'
import paramsReducer from './paramsSlice'

export const store = configureStore({
    reducer: {
        params : paramsReducer
    }
})