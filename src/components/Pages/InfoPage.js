import styles from './InfoPage.module.css'
import {Button, Col, Modal, Row} from "antd";
import {Route, Routes, useNavigate} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import CrashPage from "./CrashPage";
import GraphPage from "./GraphPage";
import EventPage from "./EventPage";
import ParamsPage from "./ParamsPage";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import { useLocation } from 'react-router-dom';
import {SettingOutlined} from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import SchemePage from "./SchemePage";

const InfoPage = ( {isLoggedIn} ) => {
    let location = useLocation();
    const [schemeButtonStyle, setSchemeButtonStyle] = useState('');
    const [paramsButtonStyle, setParamsButtonStyle] = useState('');
    const [failuresButtonStyle, setFailuresButtonStyle] = useState('');
    const [eventsButtonStyle, setEventsButtonStyle] = useState('');
    const [graphsButtonStyle, setGraphsButtonStyle] = useState('');
    const timer = useSelector(state => state.counter.dateCount);
    const params = useSelector(state => state.params.params.map(par => par.name));
    const [isChecked, setIsChecked] = useState(localStorage.getItem("Восход") ? [...JSON.parse(localStorage.getItem("Восход"))] : []);
    const initParams = useRef();
    initParams.current = params;

    const checkMyBox = (par) => {

        if (isChecked.includes(par)) {
            return true;
        }
        else {
            return false;
        }
    }

    const onChange = (e) => {
        if (isChecked.includes(e)) {
            setIsChecked(isChecked.filter(el => el !== e))
            return;
        }
        else {
            setIsChecked([...isChecked, e])
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        if (isChecked.length > 7) {
            window.alert('Колличество параметров не должно превышать 7')
        }
        if (isChecked.length === 0) {
            window.alert('Колличество параметров не должно быть равно 0')
        }
        if (isChecked.length <= 7 && isChecked.length !== 0) {
            localStorage.removeItem('Восход');
            localStorage.setItem('Восход', JSON.stringify(isChecked));
            setIsModalOpen(false);
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setIsChecked([]);
    };

    useEffect(() => {
        if (location.pathname === '/info') {
            setParamsButtonStyle('aquamarine')
        }
        else {
            setParamsButtonStyle('')
        }

        if (location.pathname === '/info/crash') {
            setFailuresButtonStyle('aquamarine')
        }
        else {
            setFailuresButtonStyle('')
        }

        if (location.pathname === '/info/event' || location.pathname === '/info/event/failure') {
            setEventsButtonStyle('aquamarine')
        }
        else {
            setEventsButtonStyle('')
        }

        if (location.pathname === '/info/graph') {
            setGraphsButtonStyle('aquamarine')
        }
        else {
            setGraphsButtonStyle('')
        }

        if (location.pathname === '/info/scheme') {
            setSchemeButtonStyle('aquamarine')
        }
        else {
            setSchemeButtonStyle('')
        }
    }, [location])

    let navigate = useNavigate();

    const goToMain = () => {
        navigate('/')
    }

    const goToInfo = () => {
        navigate('/info')
    }

    const goToCrash = () => {
        navigate('crash')
    }

    const goToEvent = () => {
        navigate('event')
    }

    const goToGraph = () => {
        navigate('graph')
    }

    const goToScheme = () => {
        navigate('scheme')
    }

    return (
        <div style={ {width: "100%"} }>
            <Row className={styles.headFirst}>
                <Col span={20}>
                    <div onClick={() => goToMain()} style={ {marginLeft: "15px", cursor: "pointer"} }><Button className={styles.divButton} type="primary">Котельная восход</Button></div>
                </Col>
                <Col span={4}>
                    <Row>
                        <h3>Обновлено</h3>
                    </Row>
                    <Row style={ {textAlign: "right", marginRight: "15px"} }>
                        <h4 style={ {color: "green"} }>{timer} секунд назад</h4>
                    </Row>
                </Col>
            </Row>
            <hr style={ {marginTop: "15px"} }/>
            <div className={styles.headSecond}>
                <Button onClick={() => goToScheme()} style={ {marginLeft: "15px", width: "200px", backgroundColor: schemeButtonStyle } }>Мнемосхема</Button>
                <Button onClick={() => goToInfo()} style={ {marginLeft: "15px", width: "200px", backgroundColor: paramsButtonStyle } }>Параметры</Button>
                <Button onClick={() => goToCrash()} style={ {marginLeft: "15px", width: "200px", backgroundColor: failuresButtonStyle} }>Аварии</Button>
                <Button onClick={() => goToEvent()} style={ {marginLeft: "15px", width: "200px", backgroundColor: eventsButtonStyle} }>События</Button>
                <Button onClick={() => goToGraph()} style={ {marginLeft: "15px", width: "200px", backgroundColor: graphsButtonStyle} }>Графики</Button>
                <Button onClick={showModal} style={ {marginLeft: "15px", width: "50px"} }>
                    <SettingOutlined/>
                </Button>
                <Modal title="Настройки параметров" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    {initParams.current.map(par => {
                        return (
                            <>
                                <div style={ {display: "flex", justifyContent: "space-between"} }>
                                    <p>{par}</p>
                                    <Checkbox checked={checkMyBox(par)} onChange={() => {onChange(par)}}/>
                                </div>
                                <hr/>
                            </>
                        )
                    })}
                </Modal>
                <hr style={ {marginTop: "15px"} }/>
            </div>
            <div>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <ParamsPage/>
                        </PrivateRoute>}/>

                    <Route path="/crash" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <CrashPage/>
                        </PrivateRoute>}/>

                    <Route path="/event/*" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <EventPage isLoggedIn={isLoggedIn}/>
                        </PrivateRoute>}/>

                    <Route path="/graph" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <GraphPage/>
                        </PrivateRoute>}/>

                    <Route path="/scheme" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <SchemePage/>
                        </PrivateRoute>}/>
                </Routes>
            </div>
        </div>
    );
};

export default InfoPage;