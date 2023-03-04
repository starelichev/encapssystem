import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import api from "../helpers/api";

export const getParams = createAsyncThunk(
    'params/getParams',
    async function() {
        const getParams = await axios.get(`${api}/api/last-data-sensor`).then(res => res.data);
        const getParamsWithShortName = getParams.map(par => {
            if (par.name === 'Уровень в баке химочищенной вод') {
                return {...par, shortname: 'Ур. воды'}
            }
            if (par.name === 'Температура улицы') {
                return {...par, shortname: 'Т улицы'}
            }
            if (par.name === 'Температура подачи сети') {
                return {...par, shortname: 'Т подачи сети'}
            }
            if (par.name === 'Температура подачи котлового ко') {
                return {...par, shortname: 'Т под. конт.'}
            }
            if (par.name === 'Температура обратки сети') {
                return {...par, shortname: 'Т обрат. сети'}
            }
            if (par.name === 'Температура котла 4') {
                return {...par, shortname: 'Т котла №4'}
            }
            if (par.name === 'Температура котла 3') {
                return {...par, shortname: 'Т котла №3'}
            }
            if (par.name === 'Температура котла 2') {
                return {...par, shortname: 'Т котла №2'}
            }
            if (par.name === 'Температура котла 1') {
                return {...par, shortname: 'Т котла №1'}
            }
            if (par.name === 'Температура внутри котельной') {
                return {...par, shortname: 'Т котельной'}
            }
            if (par.name === 'Текущая частота на ПЧ 6.4') {
                return {...par, shortname: 'v на ПЧ 6.4'}
            }
            if (par.name === 'Текущая частота на ПЧ 6.3') {
                return {...par, shortname: 'v на ПЧ 6.3'}
            }
            if (par.name === 'Текущая частота на ПЧ 6.2') {
                return {...par, shortname: 'v на ПЧ 6.2'}
            }
            if (par.name === 'Текущая частота на ПЧ 6.1') {
                return {...par, shortname: 'v на ПЧ 6.1'}
            }
            if (par.name === 'Состояние работы насосов сети') {
                return {...par, shortname: 'Насосы сети'}
            }
            if (par.name === 'Состояние ПЧ 6.4') {
                return {...par, shortname: 'Работа ПЧ 6.4'}
            }
            if (par.name === 'Состояние ПЧ 6.3') {
                return {...par, shortname: 'Работа ПЧ 6.3'}
            }
            if (par.name === 'Состояние ПЧ 6.2') {
                return {...par, shortname: 'Работа ПЧ 6.2'}
            }
            if (par.name === 'Состояние ПЧ 6.1') {
                return {...par, shortname: 'Работа ПЧ 6.1'}
            }
            if (par.name === 'Состояние пускателей насосов ко') {
                return {...par, shortname: 'Насос котлов'}
            }
            if (par.name === 'Состояние аварий насосов') {
                return {...par, shortname: 'Работа нас.'}
            }
            if (par.name === 'Состояние аварий') {
                return {...par, shortname: 'Общ. работа'}
            }
            if (par.name === 'Перепад на сетевых насосах') {
                return {...par, shortname: 'P сет. насосов'}
            }
            if (par.name === 'Давление сырой воды') {
                return {...par, shortname: 'P воды'}
            }
            if (par.name === 'Давление подпиточной воды') {
                return {...par, shortname: 'P подпитки'}
            }
            if (par.name === 'Давление в обратке сети после н') {
                return {...par, shortname: 'P сети п. нас'}
            }
            if (par.name === 'Давление в обратке сети до насо') {
                return {...par, shortname: 'P сети до нас.'}
            }
            if (par.name === 'Давление в обратке котлового ко') {
                return {...par, shortname: 'P кот.контура'}
            }
            if (par.name === 'Температура обратки котлового к') {
                return {...par, shortname: 'Т обр. конт.'}
            }
            else return {...par, shortname: par.name}
        })

        console.log('refreshed params');
        return getParamsWithShortName;
    }
);

const todoSlice = createSlice({
    name : 'params',
    initialState: {
        params: [],
        status: null,
        error: null,
    },
    extraReducers: {
        [getParams.pending] : (state) => {
            state.status = 'load';
            state.error = null;
        },
        [getParams.fulfilled] : (state, action) => {
            state.status = 'resolved';
            state.params = action.payload;
        },
        [getParams.rejected] : (state, action) => {},
    }
});

export default todoSlice.reducer;