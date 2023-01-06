import React from 'react';
import styles from './MainPage.module.css'
import {AlertOutlined} from "@ant-design/icons";
import Boiler from "../Boiler/Boiler";
import {Route, Routes} from "react-router-dom";
import {PrivateRoute} from "../PrivateRoute/PrivateRoute";
import InfoPage from "./InfoPage";

const MainPage = ( {isLoggedIn} ) => {

    return (
        <>
            <div className={styles.div1}>
                <AlertOutlined style={ {marginTop: "53px", marginRight: "5px", color: "green"} } />
                <h3 style={ {marginTop: "50px"}}>Восход</h3>
            </div>
            <div className={styles.div2}>
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