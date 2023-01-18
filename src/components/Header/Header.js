import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {MeetingRoom} from "@mui/icons-material";
import {Button, Input, Modal} from "antd";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {authOc} from "../../store/authOcSlice";

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {

    const authDispatch = useDispatch();
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    const handleLogOut = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userName')
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    const onSubmit = () => {
        const data = {
            login,
            password
        }
        authDispatch(authOc(data));
        setIsModalOpen(false);
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <header className={styles.mainHeader}>

            {

                isLoggedIn ?
                        <nav style={{fontSize: "18px"}}>
                            <Modal title="Авторизация OC" open={isModalOpen} onOk={onSubmit} onCancel={handleCancel}>
                                <Input value={login} onChange={event => setLogin(event.target.value)} name="username" placeholder="Имя пользователя" style={ {margin: "5px"} }/>
                                <Input name="password" value={password} onChange={event => setPassword(event.target.value)} placeholder="Пароль" style={ {margin: "5px"} }/>
                            </Modal>
                            Добро пожаловать, &nbsp;<strong>{userName}</strong>
                            {JSON.parse(localStorage.getItem("Auth")) ? <></> // Не забыть вырезать кнопку авторизации в овенклауде перед деплоем
                            : <Button onClick={showModal} style={{marginRight: "10px", marginLeft: "10px"}} type="primary">Авторизация в OC</Button>
                            }
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