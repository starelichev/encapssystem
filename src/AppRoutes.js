import React from 'react';
import { Route, Routes, redirect } from 'react-router-dom';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { PublicRoute } from './components/PublicRoute/PublicRoute';
import Login from "./components/LoginForm";
import MainPage from "./components/Pages/MainPage";
import {NoMatch} from "./components/NoMatch/NoMatch";

export const AppRoutes = ({
                              isLoggedIn,
                              setIsLoggedIn,
                              setUserName,
                              setIsAdmin,
                              isAdmin,
                          }) => {
    return (
        <Routes>
            <Route
                exact
                path='/'
                render={() => {
                    if (isLoggedIn) return redirect("/MainPage");
                    return redirect("/login");
                }}
            />

            <PublicRoute isLoggedIn={isLoggedIn} path='/login' exact>
                <Login
                    setIsLoggedIn={setIsLoggedIn}
                    setUserName={setUserName}
                    setIsAdmin={setIsAdmin}
                />
            </PublicRoute>

            <PrivateRoute isLoggedIn={isLoggedIn} path='/MainPage' exact>
                <MainPage isAdmin={isAdmin} />
            </PrivateRoute>

            <Route exact path='/404'>
                <NoMatch />
            </Route>

            <Route
                path='*'
                render={({ location }) => {
                    return ( redirect( "/404", location )
                    );
                }}
            />
        </Routes>
    );
};