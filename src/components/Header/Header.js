import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {MeetingRoom} from "@mui/icons-material";
import React from "react";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {
    const name = localStorage.getItem('name')?.replace( /"/g, '');
    const lastName = localStorage.getItem('lastName')?.replace( /"/g, '');

    const handleLogOut = () => {
        localStorage.removeItem('jwt')
        localStorage.removeItem('name')
        localStorage.removeItem('userId')
        localStorage.removeItem('lastName')
        localStorage.removeItem('role')
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <header className={styles.mainHeader}>

            {

                isLoggedIn ?
                        <nav style={{fontSize: "18px"}}>
                            Добро пожаловать, &nbsp;<strong>{name}</strong>&nbsp;<strong>{lastName}</strong>
                            <NavLink
                                onClick={handleLogOut}
                                to="/login"
                            >
                                <MeetingRoom />
                                Выход
                            </NavLink>
                        </nav>
                    : 'Вы не авторизованы!'

            }

        </header>
    );
};