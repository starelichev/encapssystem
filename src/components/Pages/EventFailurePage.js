import React from 'react';
import { useSelector} from "react-redux";
import {Table} from "antd";

const EventFailurePage = () => {
    const events = useSelector(state => state.eventFailure.eventFailure);

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
        {
            title: 'Кем прочитано',
            dataIndex: 'read_by_user',
            render: (text, record) => (
                <>
                    <div>{record.read_by_user}</div>
                    <div>{record.read_dt} </div>
                </>
            )
        },
    ];

    return (
        <>
            <Table rowKey="id" pagination={true} columns={columns} dataSource={dataSource} bordered style={ {backgroundColor: "white"} }/>
        </>
    );
};

export default EventFailurePage;