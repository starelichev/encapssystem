import React, {useEffect, useRef, useState} from 'react';
import { Line } from '@ant-design/plots';
import {DatePicker, Select} from 'antd';
import dayjs from 'dayjs';
import axios from "axios";
import api from "../../helpers/api";

const GraphPage = () => {
    const format = 'YYYY-MM-DD HH:mm:ss';
    const [fromDate, setFromDate] = useState(dayjs().subtract(0.5, 'hour'));
    const [toDate, setToDate] = useState(dayjs());
    const graphData = useRef([]);
    const [params, setParams] = useState([]);
    const [selectedPar, setSelectedPar] = useState(14783621);
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0)

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
                ids: [selectedPar],
                start: fromDate?.format(format),
                end: toDate?.format(format),
                step: 1,
            };

            const getResponse = await axios.post(`${api}/api/parameters/data`, data).then(response => response.data);
            graphData.current = getResponse[0].values.map(el => {return {time: el.d, value: parseFloat(el.v)}});
            setMinValue(Math.min(...graphData.current.map(value => value.value)));
            setMaxValue(Math.max(...graphData.current.map(value => value.value)));
        }
        fetchData()
    }, [fromDate, toDate, selectedPar])

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
        xAxis: {
            // type: 'timeCat',
            tickCount: 5,
        },
        yAxis: {
            // type: 'timeCat',
            tickCount: 10,
        },
        meta: {
            value: {
                min: minValue,
                max: maxValue,
            }
        },
        point: {
            size: 5,
            shape: 'diamond',
        },
        label: {
            style: {
                fill: '#aaa',
            },
        },
    };

    const handleChange = (value) => {
        setSelectedPar(+value);
    };

    return (
        <div>
            <DatePicker showTime style={{margin: "15px", width: "230px"}} defaultValue={fromDate} onOk={onOkFrom} placeholder="Выберите начальную дату" />
            <DatePicker showTime style={{margin: "15px", width: "230px"}} defaultValue={toDate} onOk={onOkTo} placeholder="Выберите конечную дату"/>
            <Select
                defaultValue="Выберите параметр"
                style={{ width: 230, margin: "15px" }}
                onChange={handleChange}
                options={params.map(el => {
                    return {value: el.device_id, label: el.name}
                })}
            />
            <Line style={{padding: "15px"}} {...config} />
        </div>
    );
};

export default GraphPage;