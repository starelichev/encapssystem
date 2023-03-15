import axios from "axios";
import authApi from "./authApi";

async function SetSettings(data) {
    const settings = await axios.post(`${authApi}/set-settings`, data)
        .then(response => response.data).catch((response) => {
            window.alert(response.response.data.message)
        })
    console.log(settings)
    return settings
}

export default SetSettings