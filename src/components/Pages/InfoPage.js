import styles from './InfoPage.module.css'
import {Button} from "antd";
import {Route, Routes, useNavigate} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import CrashPage from "./CrashPage";
import GraphPage from "./GraphPage";
import EventPage from "./EventPage";
import ParamsPage from "./ParamsPage";

const InfoPage = ( {isLoggedIn} ) => {
    let navigate = useNavigate();

    const goToMain = () => {
        navigate('/')
    }

    const goToInfo = () => {
        navigate('info')
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

    return (
        <div style={ {width: "100%"} }>
            <div className={styles.headFirst}>
                <h2 onClick={() => goToMain()} style={ {marginLeft: "15px", cursor: "pointer"} }>КОТЕЛЬНАЯ ВОСХОД</h2>
                <hr style={ {marginTop: "15px"} }/>
            </div>
            <div className={styles.headSecond}>
                <Button onClick={() => goToInfo()} style={ {marginLeft: "15px", width: "200px"} } type="primary">Параметры</Button>
                <Button onClick={() => goToCrash()} style={ {marginLeft: "15px", width: "200px"} } type="primary">Аварии</Button>
                <Button onClick={() => goToEvent()} style={ {marginLeft: "15px", width: "200px"} } type="primary">События</Button>
                <Button onClick={() => goToGraph()} style={ {marginLeft: "15px", width: "200px"} } type="primary">Графики</Button>
                <hr style={ {marginTop: "15px"} }/>
            </div>
            <div>
                <Routes>
                    <Route path="/info" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <ParamsPage/>
                        </PrivateRoute>}/>

                    <Route path="/crash" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <CrashPage/>
                        </PrivateRoute>}/>

                    <Route path="/event" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <EventPage/>
                        </PrivateRoute>}/>

                    <Route path="/graph" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <GraphPage/>
                        </PrivateRoute>}/>
                </Routes>
            </div>
        </div>
    );
};

export default InfoPage;