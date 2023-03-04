import React, {useState} from 'react';
import styles from './LoginForm.module.css'
import {Input, Button} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import authApi from "../helpers/authApi";

const Login = ( { setIsLoggedIn, setUserName } ) => {
    let navigate = useNavigate();
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    async function Auth(login, password) {
        const data = {
            username: login,
            password
        }

        const response = await axios.post(`${authApi}/users/authenticate`, data)
            .then(response => response.data).catch((response) => {
                window.alert(response.response.data.message)
            })

        if (response !== undefined) {
            if (response.id !== null && response.token !== null) {
                localStorage.setItem('userId', JSON.stringify(response.id));
                localStorage.setItem('jwt', JSON.stringify(response.token));
                localStorage.setItem('name', JSON.stringify(response.firstName));
                localStorage.setItem('lastName', JSON.stringify(response.lastName));
                localStorage.setItem('role', JSON.stringify(response.role));
                setIsLoggedIn(true);
                navigate('/');
            }
        }
    }

    const handleLogin = () => {
        Auth(login, password)
        }

        return (
        <div>
            <h1 className={styles.myHead}>ENCAPS SYSTEM</h1>
            <form className={styles.myForm}>
                <Input className={styles.myMargin} type="text" value={login} onChange={event => setLogin(event.target.value)} name="username" placeholder="Имя пользователя"/>
                <Input className={styles.myMargin} type="password" value={password} onChange={event => setPassword(event.target.value)} name="password" placeholder="Пароль"/>
                <Button onClick={() => handleLogin()} className={styles.myMargin} type="primary">Вход</Button>
            </form>
        </div>
    );
};

export default Login;