import axios from '../../setup/axios'
import type {DataResponse} from "../../redux/slices/auth/logoutSlice"

export const logoutApi = async()=>  {
    return await axios.post<DataResponse>(import.meta.env.VITE_REMOVE_JWT_URL) 
}
