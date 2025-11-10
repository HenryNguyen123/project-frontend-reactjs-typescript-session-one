import  React from 'react'
import { Route, Routes } from 'react-router-dom'
import LayoutComponent from '../components/layouts/layoutComponent'
import UserComponent from '../components/users/UserComponent'
import HomeComponent from '../components/home/HomeComponent'
import LoginComponent from '../components/authentication/login/LoginComponent'

const AppRouter: React.FC = () => {
    return(
        <>
            <Routes>
                <Route path='/' element={<LayoutComponent/>} >
                    <Route index element={<HomeComponent/>}/>
                    <Route path='/user' element={<UserComponent/>} />

                </Route>
                <Route path='/login' element={<LoginComponent/>} />

            </Routes>
        </>
    )
}

export default AppRouter