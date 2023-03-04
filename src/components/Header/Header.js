import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {MeetingRoom} from "@mui/icons-material";
import React from "react";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {
    const name = localStorage.getItem('name')?.replace( /"/g, '');
    const lastName = localStorage.getItem('lastName')?.replace( /"/g, '');
    const role = getRole();

    function getRole() {
        let role;
        const item = localStorage.getItem('role')?.replace( /"/g, '');
        if (item === "Admin") {
            role = 'Администратор'
        }
        else {
            role = 'Пользователь'
        }

        return role;
    }

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
                            <div>Добро пожаловать, &nbsp;<strong>{name}</strong>&nbsp;<strong>{lastName}</strong>
                            <br/>
                                <div style={{marginRight: "30px", fontSize: "15px", marginLeft: "200px"}}>{role}
                                </div></div>
                            <NavLink
                                onClick={handleLogOut}
                                to="/login"
                            >
                                <MeetingRoom style={{marginBottom: "18px"}} />
                                <div style={{marginBottom: "14px"}}>Выход</div>

                            </NavLink>
                        </nav>
                    : 'Вы не авторизованы!'

            }

        </header>
    );
};