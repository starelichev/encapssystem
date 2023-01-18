import React, {useEffect, useState} from 'react';
import styles from './MainPage.module.css'
import {AlertOutlined} from "@ant-design/icons";
import Boiler from "../Boiler/Boiler";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import InfoPage from "./InfoPage";
import {increment, setNull} from "../../store/counterSlice";
import {useDispatch, useSelector} from "react-redux";
import {getEventFailure} from "../../store/eventFailureSlice";
import {getFailure} from "../../store/failureSlice";
import {getParams} from "../../store/paramsSlice";
import {getEvent} from "../../store/eventSlice";
import {getStatus} from "../../store/statusSlice";

const MainPage = ( {isLoggedIn} ) => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.plcStatus.plcStatus);
    const [iconColor, setIconColor] = useState('');
    const timer = useSelector(state => state.counter.count);

    useEffect(() => {
        const interval = setInterval(() => dispatch(increment()), 1000)
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
        if (timer === 60) {
            dispatch(getParams());
            dispatch(getFailure());
            dispatch(getEventFailure());
            dispatch(getEvent());
            dispatch(getStatus());
            dispatch(setNull());
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
                {JSON.parse(localStorage.getItem("Auth")) ? <> <AlertOutlined style={ {marginTop: "53px", marginRight: "5px", color: iconColor} } />
                    <h3 style={ {marginTop: "50px"}}>Восход</h3> </> : <></> }

            </div>
            <div className={styles.div2}>
                {JSON.parse(localStorage.getItem("Auth")) ?
                    <>
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
                    </>
                    : <h1 style={{ padding: "50px" }}>Вы не авторизованы во внутренней системе!</h1>
                }
            </div>
        </>
    );
};

export default MainPage;