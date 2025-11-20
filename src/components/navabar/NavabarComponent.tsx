import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './navabarCss.scss'
import { useDispatch, useSelector } from "react-redux"
import type {RootState, AppDispatch} from '../../redux/store/store'
import {getLogin} from '../../redux/slices/account/userLoginSlice'
import type {UserData} from '../../redux/slices/account/userLoginSlice'
import {logoutAuthentication} from '../../redux/slices/auth/logoutSlice'

const NavabarComponent: React.FC = () => {
    const navigate = useNavigate()
    const locationHook = useLocation()
    const dispatch = useDispatch<AppDispatch>()

    const isLogin: boolean = useSelector((state: RootState) => state.account.isLogin)
    const data: UserData | null= useSelector((state: RootState) => state.account.data)
    const avatarUrl: string = data?.data?.avatar ?? ""

    //logout
    const checkIsLogin: boolean = useSelector((state: RootState) => state.logout.isLogin) 

    const handleClickUser = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigate('/user')
    }
    const handleClickHome = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigate('/')
    }
    const handleClickLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        navigate('/login')
    }
    
    const handleCallAuthen = async () => {
        try {
           dispatch(getLogin())
        } catch (error) {
            console.error("Auth check failed:", error)
        }
    }

    const handleLogoutUser = async() => {
        try {
            const pathPage = locationHook.pathname
            console.log('location page: ', pathPage)
            const data = await dispatch(logoutAuthentication(pathPage)).unwrap()
            if (data.EC === 0 && data.DT) return navigate(data.DT.path)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleCallAuthen()
    }, [])
    
    useEffect(() => {
        
    }, [checkIsLogin])
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light  navbar-container">
            <div className="container-fluid container">
                <a className="navbar-brand" href="/">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item nav-item_title">
                            <a className="nav-link active" aria-current="page" href="/" onClick={handleClickHome}>Home</a>
                        </li>
                        <li className="nav-item nav-item_title">
                            <a className="nav-link" href="/user" onClick={handleClickUser}>User</a>
                        </li>
                        <li className="nav-item dropdown nav-item_title">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                more
                            </a>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown" >
                            <li><a className="dropdown-item" href="#">Action</a></li>
                            <li><a className="dropdown-item" href="#">Another action</a></li>
                            <li><hr className="dropdown-divider"/></li>
                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                        </ul>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn button-search" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav mb-2 mb-lg-0 account-container">
                        {
                            !isLogin && (
                                <li className="nav-item account-login">
                                    <a className="nav-link" id="login-item" href="/login" onClick={handleClickLogin}>Login</a>
                                </li>
                            )
                        }
                        {
                            isLogin && (
                                <li className="nav-item dropdown account-content">
                                    <a className="nav-link dropdown-toggle gradient-custom" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={avatarUrl ? `${import.meta.env.VITE_SERVER_URL + avatarUrl}` : `${import.meta.env.BASE_URL}` + "/images/users/avatar/avatar_anonymous.png"} alt="avatar" />
                                        <span>Account</span>
                                    </a>
                                    <ul className="dropdown-menu account-content-item" aria-labelledby="navbarDropdown" >
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><a className="dropdown-item" onClick={handleLogoutUser}>Logout</a></li>
                                    </ul>
                                </li>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}

export default NavabarComponent