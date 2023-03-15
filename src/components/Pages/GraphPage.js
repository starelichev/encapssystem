import React, {useCallback, useEffect, useRef, useState} from 'react';
import { Line } from '@ant-design/plots';
import {DatePicker, Select} from 'antd';
import dayjs from 'dayjs';
import axios from "axios";
import api from "../../helpers/api";
import Checkbox from "antd/lib/checkbox/Checkbox";

const GraphPage = () => {
    const format = 'YYYY-MM-DD HH:mm:ss';
    const [fromDate, setFromDate] = useState(dayjs().subtract(0.5, 'hour'));
    const [toDate, setToDate] = useState(dayjs());
    const graphData = useRef([]);
    const [params, setParams] = useState([]);
    const [selectedPar, setSelectedPar] = useState([]);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [placeholder, setPlaceHolder] = useState();

    useEffect(() => {
        const fetchData = async function() {
            const getResponse = await axios.get(`${api}/api/device-list`).then(response => response.data);
            setParams([...getResponse])
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async function() {
            const data = {
                ids: selectedPar,
                start: fromDate?.format(format),
                end: toDate?.format(format),
                step: 1,
            };

            const getResponse = await axios.post(`${api}/api/parameters/data`, data).then(response => response.data);
            const replaceName = getResponse.map(el => {
                const name = params.filter(par => par.device_id === el.id);
                return {...el, id: name[0].name}
            })
            const getData = replaceName.map(el => {return [...el.values.map(par => {return {time: par.d, value: parseFloat(par.v), id: el.id}})]});
            graphData.current = [];
            getData.forEach(el => graphData.current.push(...el));
            setMinValue(Math.min(...graphData.current.map(value => value.value)));
            setMaxValue(Math.max(...graphData.current.map(value => value.value)));
        }
        fetchData()
    }, [fromDate, toDate, selectedPar, params])

    const onOkFrom = (value) => {
        setFromDate(value)
    };

    const onOkTo = (value) => {
        setToDate(value)
    };

    const config = {
        data: graphData.current,
        autoFit: true,
        padding: 'auto',
        xField: 'time',
        yField: 'value',
        seriesField: 'id',
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
        },
        yAxis: {
            // type: 'timeCat',
            tickCount: 10,
            label: {
                formatter: useCallback((v) => `${Math.round(v * 100) / 100}`, []),
            },
        },
        meta: {
            value: {
                min: minValue,
                max: maxValue,
            }
        },
    };

    const handleChange = (value) => {
        setSelectedPar([+value]);
    };

    useEffect(() => {
        const name = params.filter(par => par.device_id === `${selectedPar}`);
        setPlaceHolder(name[0]?.name)
    }, [selectedPar, params])

    const onChangeCheckBox = (el) => {
        setOpen(true);
        if (selectedPar.includes(+el.device_id)){
            setSelectedPar(selectedPar.filter(x => x !== +el.device_id))
        }
        else{
            setSelectedPar([...selectedPar, +el.device_id])
        }
    }

    const checkBox = (el) => {
        if (selectedPar.includes(+el.device_id)) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <div>
            <DatePicker showTime style={{margin: "15px", width: "230px"}} defaultValue={fromDate} onOk={onOkFrom} placeholder="Выберите начальную дату" />
            <DatePicker showTime style={{margin: "15px", width: "230px"}} defaultValue={toDate} onOk={onOkTo} placeholder="Выберите конечную дату"/>
            <Select
                onDropdownVisibleChange={(visible) => setOpen(visible)}
                open={open}
                value={placeholder}
                defaultValue="Выберите параметр"
                style={{ width: 300, margin: "15px" }}
                onChange={handleChange}
                options={params.map(el => {
                    return {value: el.device_id, label: <div style={{display: "flex"}}>
                            <div style={{width: 300}}>{el.name}</div>
                            <Checkbox checked={checkBox(el)} onChange={() => {onChangeCheckBox(el)}}/>
                        </div>}
                })}
            />
            <Line style={{padding: "15px"}} {...config} />
        </div>
    );
};

export default GraphPage;