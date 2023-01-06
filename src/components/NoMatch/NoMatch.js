import React from 'react';
import {Navigate, useLocation, useNavigate} from 'react-router-dom';
import { Result, Button } from 'antd';

export const NoMatch = () => {
    let navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    const backHome = () => {
        navigate('/');
    }

    if (!location.pathname) return <Navigate to='/'/>

    return (
        <div className='page404'>
            <Result
                status='404'
                title='404'
                subTitle={`Страница ${location.pathname} не найдена`}
                extra={<Button onClick={backHome} type='primary'>Вернуться на главную</Button>}
            />
        </div>
    );
};