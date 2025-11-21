import axios from '../../setup/axios'
import type {DataResponse} from "../../redux/slices/auth/logoutSlice"

export const logoutApi = async(data: string)=>  {
    return await axios.post<DataResponse>(import.meta.env.VITE_LOGOUT_USER_URL, {path: data}, { withCredentials: true }) 
}
