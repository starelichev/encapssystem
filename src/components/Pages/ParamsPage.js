import React, {useEffect} from 'react';
import {Table} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getParams} from "../../store/paramsSlice";

const ParamsPage = () => {
    const dispatch = useDispatch();
    const values = useSelector(state => state.params.params)

    useEffect(() => {
        dispatch(getParams())
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            dispatch(getParams())
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const dataSource = [...values];

    const columns = [
        {
            title: 'Название',
            dataIndex: 'device_id',
            key: 'device_id',
        },
        {
            title: 'Код параметра',
            dataIndex: 'format',
            key: 'format',
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
        },
    ];

    return (
        <>
            <Table columns={columns} dataSource={dataSource} bordered/>
        </>
    );
};

export default ParamsPage;