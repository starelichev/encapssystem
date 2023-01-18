import React from 'react';
import {Table} from "antd";
import {useSelector} from "react-redux";

const SimpleEventPage = () => {
    const events = useSelector(state => state.event.event);

    const dataSource = [...events];

    const columns = [
        {
            title: 'Сообщение',
            dataIndex: 'message',
        },
        {
            title: 'Время фиксации',
            dataIndex: 'start_dt',
        },
        {
            title: 'Время снятия',
            dataIndex: 'end_dt',
        },
        {
            title: 'Значение параметров',
            dataIndex: "data",
            render: (data) => data.map(data => data.v).join(),
        },
    ];

    return (
        <>
            <Table rowKey="id" pagination={false} columns={columns} dataSource={dataSource} bordered style={ {backgroundColor: "white"} }/>
        </>
    );
};

export default SimpleEventPage;