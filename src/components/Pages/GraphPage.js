import React, {useEffect, useRef, useState} from 'react';
import { Line } from '@ant-design/plots';
import {DatePicker, Select} from 'antd';
import dayjs from 'dayjs';
import axios from "axios";

const GraphPage = () => {
    const format = 'YYYY-MM-DD HH:mm:ss';
    const [fromDate, setFromDate] = useState(dayjs().subtract(0.5, 'hour'));
    const [toDate, setToDate] = useState(dayjs());
    const graphData = useRef([]);
    const [params, setParams] = useState([]);
    const [selectedPar, setSelectedPar] = useState(14783621);

    useEffect(() => {
        const fetchData = async function() {
            const getResponse = await axios.get('http://localhost:8081/api/device-list').then(response => response.data);
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

            const getResponse = await axios.post('http://localhost:8081/api/parameters/data', data).then(response => response.data);
            graphData.current = getResponse[0].values.map(el => {return {time: el.d, value: el.v}});
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
        width: 1000,
        height: 500,
        autoFit: true,
        xField: 'time',
        yField: 'value',
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