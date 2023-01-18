import React, {useEffect, useState} from 'react';
import {Button, Col, Row} from "antd";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import SimpleEventPage from "./SimpleEventPage";
import EventFailurePage from "./EventFailurePage";

const EventPage = ( {isLoggedIn} ) => {

    let location = useLocation();
    const [simpleEventsButtonStyle, setSimpleEventsButtonStyle] = useState('')
    const [eventsFailuresButtonStyle, setEventsFailuresButtonStyle] = useState('')

    useEffect(() => {
        if (location.pathname === '/info/event') {
            setSimpleEventsButtonStyle('aquamarine')
        }
        else {
            setSimpleEventsButtonStyle('')
        }

        if (location.pathname === '/info/event/failure') {
            setEventsFailuresButtonStyle('aquamarine')
        }
        else {
            setEventsFailuresButtonStyle('')
        }
    }, [location])

    let navigate = useNavigate();

    const goToEvent = () => {
        navigate('/info/event')
    }

    const goToFailure = () => {
        navigate('failure')
    }

    return (
        <>
            <Row style={ {backgroundColor: "aliceblue", padding: "10px"} }>
                <Col span={12} style={ {textAlign: "center"} }>
                    <Button onClick={() => goToEvent() } style={ { backgroundColor: simpleEventsButtonStyle } }>Обычные события</Button>
                </Col>
                <Col span={12} style={ {textAlign: "center"} }>
                    <Button onClick={() => goToFailure()} style={ { backgroundColor: eventsFailuresButtonStyle } }>Аварии</Button>
                </Col>
            </Row>

            <div>
                <Routes>
                    <Route path="/" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <SimpleEventPage/>
                        </PrivateRoute>}/>

                    <Route path="/failure" element={
                        <PrivateRoute isLoggedIn={isLoggedIn}>
                            <EventFailurePage/>
                        </PrivateRoute>}/>
                </Routes>
            </div>
        </>
    );
};

export default EventPage;