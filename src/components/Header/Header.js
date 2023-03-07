import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import {MeetingRoom} from "@mui/icons-material";
import React, {useState} from "react";
import {Button, Collapse, Divider, Input, Modal} from "antd";
const { Panel } = Collapse;

export const Header = ({ isLoggedIn, setIsLoggedIn, userName, setIsAdmin }) => {
    const name = localStorage.getItem('name')?.replace( /"/g, '');
    const lastName = localStorage.getItem('lastName')?.replace( /"/g, '');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const role = getRole();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
                                {role === 'Администратор' ? <Button onClick={showModal} style={{marginLeft: "20px", marginRight: "20px"}}>
                                    Админ. панель
                                </Button> : <></>}
                                <Modal title="Панель администратора" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                                    <Divider orientation="left">Регистрация нового пользователя</Divider>
                                    <Collapse>
                                        <Panel header="Регистрация нового пользователя" key="1">
                                            <div style={{display: "flex", height: "30px", margin: "10px"}}>
                                                <p style={{width: "100px"}}>Имя</p>
                                                <Input style={{marginLeft: "10px"}}/>
                                            </div>
                                            <div style={{display: "flex", height: "30px", margin: "10px"}}>
                                                <p style={{width: "100px"}}>Фамилия</p>
                                                <Input style={{marginLeft: "10px"}}/>
                                            </div>
                                            <div style={{display: "flex", height: "30px", margin: "10px"}}>
                                                <p style={{width: "100px"}}>Логин</p>
                                                <Input style={{marginLeft: "10px"}}/>
                                            </div>
                                            <div style={{display: "flex", height: "30px", margin: "10px"}}>
                                                <p style={{width: "100px"}}>Пароль</p>
                                                <Input style={{marginLeft: "10px"}}/>
                                            </div>
                                            <div style={{display: "flex", height: "30px", margin: "10px"}}>
                                                <p style={{width: "100px"}}>Роль</p>
                                                <Input style={{marginLeft: "10px"}}/>
                                            </div>
                                        </Panel>
                                    </Collapse>
                                    <Divider orientation="left">Регистрация в OwenCloud</Divider>
                                    <Collapse size="small">
                                        <Panel header="Регистрация в OwenCloud" key="1" >
                                            Пусто
                                        </Panel>
                                    </Collapse>
                                </Modal>
                            <br/>
                                <div style={{marginRight: "30px", fontSize: "15px", marginLeft: "35px"}}>
                                    {role}
                                </div></div>
                            <NavLink
                                onClick={handleLogOut}
                                to="/login"
                                style={{marginBottom: "20px"}}
                            >
                                <MeetingRoom/>
                                <div>Выход</div>
                                <br/>
                            </NavLink>
                        </nav>
                    : 'Вы не авторизованы!'

            }

        </header>
    );
};