import type React from "react";
import WaitDataComponent from "../../waitLoading/waitData/WaitDataComponent";
import { useEffect, useState } from "react";

// get account me
import type {AppDispatch} from '../../../redux/store/store'
import {fetchAccountGetMe} from '../../../redux/slices/auth/callMeSlice'
import {setLogin} from '../../../redux/slices/account/userLoginSlice'
import type {dataLogin} from '../../../redux/slices/account/userLoginSlice'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CallBackMe : React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const [isLoading, setIsloading] = useState<boolean>(true)

    const handleCallBackMe = async () => {
        try {
            const data = await dispatch(fetchAccountGetMe()).unwrap();
            const {EM, EC, DT} = data
            if (EC === 0) {
                toast.success(EM)
                const dataLogin: dataLogin = {
                    rememberUser: true,
                    data: DT
                }
                await dispatch(setLogin(dataLogin))
                setIsloading(false)
                navigate('/')
                return
            }
            toast.error(EM)
            navigate('/login')
        } catch (error: unknown) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        handleCallBackMe()
    }, [])

    return(
        <>
            <WaitDataComponent isLoading={isLoading}/>
        </>
    )
}

export default CallBackMe