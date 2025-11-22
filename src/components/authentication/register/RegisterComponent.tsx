
import React, { useEffect, useState } from "react"
import './register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faUnlockKeyhole, faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import type { AppDispatch} from '../../../redux/store/store'
// import type {RootState, AppDispatch} from '../../../redux/store/store'
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch  } from "react-redux";
import {loginAuthentication} from '../../../redux/slices/auth/loginSlice'
import {setLogin} from '../../../redux/slices//account/userLoginSlice'
// import type {UserData} from '../../../redux/slices/account/userLoginSlice'

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type eventHtml = React.ChangeEvent<HTMLInputElement>
 
interface valid {
    isUserName: boolean,
    isPassword: boolean
}

const RegisterComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

    const [userName, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    // const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [rememberUser, setRrememberUser] = useState<boolean>(true)
    
    // const loginUser: UserData | null = useSelector((state: RootState) => state.login.data)
    // const isLoadingUser = useSelector((state: RootState) => state.login.isLoading)
    // const isErrorUser = useSelector((state: RootState) => state.login.isError)
    
    const checkIsValid = {
        isUserName : true,
        isPassword : true
    }
    const [objCheckValid, setObjCheckValid] = useState<valid>(checkIsValid)

    const HandleCheckValid = (): boolean => {
        if(!userName.trim()) {
            toast.error('Please enter a username.')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return false
        }
        if(userName.trim().length <=2 || userName.trim().length >= 100) {
            toast.error('Username must be between 3 and 100 characters.')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return false
        }
        if(!password.trim()) {
            toast.error('Please enter a password.')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return false
        }
        if(password.trim().length < 6) {
            toast.error('Password must be at least 6 characters long.')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return false
        }
        return true
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.keyCode  === 13) {
            handleClickLogin()
        }
    }

    const handleClickLogin = async () => {
        const check  = HandleCheckValid()
        if (!check) return
        const data = await dispatch(loginAuthentication({userName, password})).unwrap()
        const {EM, EC} = data
        if (EC === 0) {
            toast.success(EM || "Login user  successfully!");
            // const setData = loginUser.DT
            if(rememberUser && data && data.DT) {
                await dispatch(setLogin(data.DT))
            }
            navigate('/')
            return;
        }
        if (EC !== 0) {
            toast.error(EM || "Login user fail!");
            setObjCheckValid({...checkIsValid, isUserName: false})
            setObjCheckValid({...checkIsValid, isPassword: false})
            return;
        }
    }
    
    const handleBackLogin = () => {
        navigate('/login')
    }
    useEffect(() => {
        document.title = 'Login';
    }, [])

    return(
        <>
            <div className="register-container">
                <div className="register-content container ">
                    <div className="register-form row">
                        <form className="col-10 col-sm-8 col-md-6 col-lg-4">
                            <div className="register-title">
                                <div className="icon-return"><span onClick={handleBackLogin}><FontAwesomeIcon icon={faArrowLeft} /></span></div>
                                <h3>Register</h3>
                                <div className="register-title-item_right"></div>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4 username">
                                <label className="form-label" htmlFor="form2Example1">UserName</label>
                                <div>
                                    <FontAwesomeIcon icon={faUser} className="icon"/>
                                    <input type="text" id="form2Example1" 
                                        className={objCheckValid.isUserName  ? 'form-control' : 'form-control is-invalid'}
                                        placeholder="Type your username" 
                                        value={userName} 
                                        onChange={(e: eventHtml) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 password">
                                <label className="form-label" htmlFor="form2Example2">Password</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="password" id="form2Example2" 
                                        className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Type your password"
                                        value={password}
                                        onChange={(e: eventHtml) => setPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 password">
                                <label className="form-label" htmlFor="form2Example2">Confirm Password</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="password" id="form2Example2" 
                                        className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Type your confirm password"
                                        value={password}
                                        onChange={(e: eventHtml) => setPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4 check-forget">
                                <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={rememberUser}  onChange={(e: eventHtml) => setRrememberUser(e.target.checked)} id="form2Example31"  />
                                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                    </div>
                                </div>

                                <div className="col forgot">
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </div>

                            <button  type="button" 
                                data-mdb-button-init data-mdb-ripple-init 
                                className="btn btn-primary btn-block mb-4 button-register "
                                onClick={handleClickLogin}
                            >
                                    Confirm
                            </button>

                            <div className="row mb-4 back-home">
                                <div className="col d-flex justify-content-center">
                                    <a href="/">
                                        <FontAwesomeIcon icon={faHouse} />
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        Back to home
                                    </a>
                                </div>
                            </div>
    
                            <div className="text-center abouts">
                                {/* <p>Not a member? <a href="#!">Register</a></p> */}
                                <p>or sign up with:</p>
                                <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                    <FontAwesomeIcon icon={faFacebook} size="lg" color="#1877F2"/>
                                </button>

                                <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                    <FontAwesomeIcon icon={faGoogle} size="lg" color="#DB4437"/>
                                </button>

                                <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                    <FontAwesomeIcon icon={faTwitter} size="lg" color="#1DA1F2"/>
                                </button>

                                <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                    <FontAwesomeIcon icon={faGithub} size="lg" color="#333"/>
                                </button>

                                <button  type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                                <i className="fab fa-github"></i>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        
        </>
    )
}

export default RegisterComponent