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

                </Route>
 
                <Route path='/login' element={isLogin && dataUser ? <Navigate to="/" replace /> : <LoginComponent />} />

            </Routes>
        </>
    )
}

export default AppRouter