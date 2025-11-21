import Cookies from "js-cookie"
import axios from '../setup/axios'

export const handleLogout = async () => {
    try {
        Cookies.remove('JWT-FE')
        localStorage.removeItem('JWT')
        await axios.post(import.meta.env.VITE_LOGOUT_USER_URL)
        console.log("logout thanh cong")
    } catch (error) {
        console.log(error)
    }
}