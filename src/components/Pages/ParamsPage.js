import React from 'react';
import {Table} from "antd";
import {useSelector} from "react-redux";

const ParamsPage = () => {
    const params = useSelector(state => state.params.params);

    const dataSource = [...params];

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
        },
        {
            title: 'Значение',
            dataIndex: 'value',
        },
    ];

    return (
        <>
            <Table rowKey="device_id" pagination={false}  columns={columns} dataSource={dataSource} bordered style={ {backgroundColor: "white"} }/>
        </>
    );
};

export default ParamsPage;