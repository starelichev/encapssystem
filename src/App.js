import React, {useState} from "react";
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

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userName, setUserName] = useState(localStorage.getItem('userName'));


    return <div className="App">
            <Header userName={userName} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <hr/>
            <main>
                <Routes>
                    <Route path="/login"
                    element={
                        <PublicRoute isLoggedIn={isLoggedIn}>
                            <LoginForm setIsLoggedIn={setIsLoggedIn} setUserName={setUserName}/>
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
