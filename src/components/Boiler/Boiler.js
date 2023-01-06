import React, {useEffect} from 'react';
import styles from  './Boiler.module.css'
import {useNavigate} from "react-router-dom";

import {getParams} from "../../store/paramsSlice";
import {useDispatch, useSelector} from "react-redux";

const Boiler = () => {
    const dispatch = useDispatch();
    const values = useSelector(state => state.params.params.map(val => val.value))

    useEffect(() => {
        dispatch(getParams())
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            dispatch(getParams())
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    let navigate = useNavigate();
    const gotoInfo = () => {
        navigate('/info')
    }

    return (
        <div>
            <h2 onClick={() => gotoInfo()} style={ {marginLeft: "90px", cursor: "pointer"} }>Восход</h2>
            <div className={styles.myBoiler}>
                <div className={styles.indicator}/>
                <div className={styles.nameDiv}>
                    <h4>P обр. сети</h4>
                    <h4>P под. сети</h4>
                    <h4>P котл. конт</h4>
                    <h4>T под. сети</h4>
                    <h4>Т обр. сети</h4>
                    <h4>Т котл. конт</h4>
                    <h4>U пиб</h4>
                </div>
                <div className={styles.numDiv}>
                    <h4 style={ {color: "green"} }>{values[0]}</h4>
                    <h4 style={ {color: "green"} }>{values[1]}</h4>
                    <h4 style={ {color: "green"} }>{values[2]}</h4>
                    <h4 style={ {color: "green"} }>{values[3]}</h4>
                    <h4 style={ {color: "green"} }>{values[4]}</h4>
                    <h4 style={ {color: "red"} }>{values[5]}</h4>
                    <h4 style={ {color: "green"} }>{values[6]}</h4>
                </div>
            </div>
        </div>
    );
};

export default Boiler;