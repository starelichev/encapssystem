import React, {useState} from 'react';
import styles from './LoginForm.module.css'
import {Input, Button} from "antd";
import {useNavigate} from "react-router-dom";

const Login = ( { setIsLoggedIn, setUserName } ) => {
    let navigate = useNavigate();
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = () => {
        localStorage.setItem('isLoggedIn', true);
        localStorage.setItem('userName', login);

        setIsLoggedIn(true);
        setUserName(login)
        navigate('/');
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