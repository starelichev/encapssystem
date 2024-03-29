import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.css'
import {AlertOutlined} from "@ant-design/icons";
import Boiler from "../Boiler/Boiler";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import InfoPage from "./InfoPage";
import {setDateNow} from "../../store/counterSlice";
import {useDispatch, useSelector} from "react-redux";
import {getEventFailure} from "../../store/eventFailureSlice";
import {getFailure} from "../../store/failureSlice";
import {getParams} from "../../store/paramsSlice";
import {getEvent} from "../../store/eventSlice";
import {getStatus} from "../../store/statusSlice";
import { clearInterval, setInterval} from 'worker-timers';

const MainPage = ( {isLoggedIn} ) => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.plcStatus.plcStatus);
    const [iconColor, setIconColor] = useState('');
    const timer = useSelector(state => state.counter.dateCount);

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch(setDateNow())
        }, 1000)
        return () => clearInterval(interval);
    }, [dispatch, timer]);

    useEffect(() => {
        dispatch(getParams());
        dispatch(getFailure());
        dispatch(getEventFailure());
        dispatch(getEvent());
        dispatch(getStatus());
    }, [dispatch])

    useEffect(() => {
        if (timer === '00') {
            dispatch(getParams());
            dispatch(getFailure());
            dispatch(getEventFailure());
            dispatch(getEvent());
            dispatch(getStatus());
        }
    }, [dispatch, timer]);

    useEffect(() => {
        if (status.status === 'online') {
            setIconColor('green')
        }
        if (status.status === 'offline' || status.status === 'alarm') {
            setIconColor('red')
        }
        if (status.status === 'unreadalarm') {
            setIconColor('orange')
        }
    }, [status.status])

    return (
        <>
            <div className={styles.div1}>
                <AlertOutlined style={ {marginTop: "53px", marginRight: "5px", color: iconColor} } />
                    <h3 style={ {marginTop: "50px"}}>Восход</h3>

            </div>
            <div className={styles.div2}>
                <div className={styles.myHr}></div>
                <Routes>

                    <Route path="/"
                           element={
                               <PrivateRoute isLoggedIn={isLoggedIn}>
                                   <Boiler/>
                               </PrivateRoute>}/>

                    <Route path="/info/*"
                           element={
                               <PrivateRoute isLoggedIn={isLoggedIn}>
                                   <InfoPage isLoggedIn={isLoggedIn}/>
                               </PrivateRoute>}/>
                </Routes>
            </div>
        </>
    );
};

export default MainPage;