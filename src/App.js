import React, {useEffect, useState} from "react";
import LoginForm from "./components/LoginForm";
import "./App.css"
import {Header} from "./components/Header/Header";
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/Pages/MainPage";
import {Footer} from "./components/Footer/Footer";
import {PublicRoute} from "./components/PublicRoute/PublicRoute";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import {NoMatch} from "./components/NoMatch/NoMatch";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('userId') !== null && localStorage.getItem('jwt') !== null) {
            setIsLoggedIn(true)
        }
        else {
            setIsLoggedIn(false)
        }
    },[isLoggedIn])

    console.log(isLoggedIn)

    return <div className="App">
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <hr/>
            <main>
                <Routes>
                    <Route path="/login"
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn}>
                            <LoginForm setIsLoggedIn={setIsLoggedIn}/>
                        </PublicRoute>}
                    />

                    <Route path="/*"
                           element={
                               <PrivateRoute isLoggedIn={isLoggedIn}>
                                   <MainPage isLoggedIn={isLoggedIn}/>
                               </PrivateRoute>}
                    />

                    <Route path="*"
                           element={<NoMatch/>}
                    />
                </Routes>
            </main>
            <Footer year={new Date().getFullYear()}/>
        </div>

}

export default App;
