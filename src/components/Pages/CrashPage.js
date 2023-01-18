import React from 'react';
import {Table} from "antd";
import {useSelector} from "react-redux";

const CrashPage = () => {
    const failures = useSelector(state => state.failure.failure);

    const dataSource = [...failures];

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            width: '300px',
            onCell: (text, record) => ({ style: {background: parseInt(text['value']) === 1 ? "red" : "green", textAlign: 'center'} })
        },
    ];

    return (
        <>
            <Table rowKey="device_id" pagination={false} columns={columns} dataSource={dataSource} bordered style={ {backgroundColor: "white"} }/>
        </>
    );
};

export default CrashPage;