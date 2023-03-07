import React, {useEffect, useRef, useState} from 'react';
import styles from  './Boiler.module.css'
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Button} from "antd";

const Boiler = () => {
    const [iconColor, setIconColor] = useState('');
    const localValues = useRef(JSON.parse(localStorage.getItem("Восход")));
    const values = useSelector(state => state.params.params?.filter(el => (localValues.current ? localValues.current.indexOf(el.name) !== -1 : '')));
    const status = useSelector(state => state.plcStatus.plcStatus);

    useEffect(() => {
        if (status.status === 'online') {
            setIconColor('green')
        }
        if (status.status === 'offline' || status.status === 'alarm') {
            setIconColor('red')
            console.log('set red')
        }
        if (status.status === 'unreadalarm') {
            setIconColor('orange')
        }
    }, [status.status])

    let navigate = useNavigate();
    const gotoInfo = () => {
        navigate('/info/scheme')
    }

    return (
        <div>
            <div onClick={() => gotoInfo()} className={styles.divBoilerName}><Button className={styles.divButton} type="primary">Восход</Button></div>
            <div className={styles.myBoiler}>
                <div className={styles.indicator} style={ {backgroundColor: iconColor} }/>
                <div className={styles.nameDiv}>
                    {values.map(param => {
                        return <h4 key={param.shortname}>{param.shortname}</h4>
                    })}
                </div>
                <div className={styles.numDiv}>
                    {values.map(val => {
                        return <h4 key={val.shortname}>{val.value}</h4>
                    })}
                </div>
            </div>
        </div>
    );
};

export default Boiler;