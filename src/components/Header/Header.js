import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {MeetingRoom} from "@mui/icons-material";
import React from "react";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {

    const handleLogOut = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userName')
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    return (
        <header className={styles.mainHeader}>

            {

                isLoggedIn ?
                        <nav style={{fontSize: "18px"}}>
                            Добро пожаловать, &nbsp;<strong>{userName}</strong>
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