import  React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import LayoutComponent from '../components/layouts/layoutComponent'
import UserComponent from '../components/users/UserComponent'
import HomeComponent from '../components/home/HomeComponent'
import LoginComponent from '../components/authentication/login/LoginComponent'
import { useDispatch, useSelector } from 'react-redux'
import type {RootState, AppDispatch} from '../redux/store/store'
import { getLogin } from '../redux/slices/account/userLoginSlice'
import LoadingComponent from '../components/waitLoading/waitPage/LoadingComponent'
import RegisterComponent from '../components/authentication/register/RegisterComponent'
import ForgotPassword from '../components/authentication/forgot_password/ForgotPassword'
import MailForgotPassword from '../components/authentication/forgot_password/MailForgotPassword'
import CallBackMe from '../components/callback/me/CallBackMe'

const AppRouter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    
    const dataUser = useSelector((state: RootState) => state.account.data)
    const isLogin = useSelector((state: RootState) => state.account.isLogin)
    const isLoadingAccount = useSelector((state: RootState) => state.account.isLoading)
    const [checkingLogin, setCheckingLogin] = useState<boolean>(true)

    const handleGetLogin = async () => {
        await dispatch(getLogin())
        setCheckingLogin(false)
    }
    useEffect(() => {
        handleGetLogin()
    }, [dispatch])


    if (isLoadingAccount && checkingLogin ) return (<> <LoadingComponent/> </>)
    return(
        <>
            <Routes>
                <Route path='/' element={<LayoutComponent/>} >
                    <Route index element={<HomeComponent/>}/>
                    <Route path='/user' element={<UserComponent/>} />


                    <Route path='/callback/me' element={<CallBackMe/>} />

                </Route>
                
                <Route path='/login' element={isLogin && dataUser ? <Navigate to="/" replace /> : <LoginComponent />} />
                <Route path='/register' element={isLogin && dataUser ? <Navigate to="/" replace /> : <RegisterComponent />} />
                <Route path='/forget-password/check-mail' element={isLogin && dataUser ? <Navigate to="/" replace /> : <MailForgotPassword />} />
                <Route path='/forget-password/reset-password' element={isLogin && dataUser ? <Navigate to="/" replace /> : <ForgotPassword />} />

            </Routes>
        </>
    )
}

export default AppRouter