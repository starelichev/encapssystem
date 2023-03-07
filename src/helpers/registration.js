import axios from "axios";
import authApi from "./authApi";

async function Registration(data) {
    const register = await axios.post(`${authApi}/users/register`, data)
        .then(response => response.data).catch((response) => {
            window.alert(response.response.data.message)
        })
    console.log(register)
    return register
}

export default Registration