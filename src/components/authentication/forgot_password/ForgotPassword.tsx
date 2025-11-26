import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUnlockKeyhole, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import type React from "react"
import './forgetPassword.scss'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {AppDispatch} from '../../../redux/store/store'
import { useDispatch } from "react-redux";
import { handelResetPassword } from "../../../redux/slices/auth/resetPasswordSlice";

type eventHtml = React.ChangeEvent<HTMLInputElement>
interface validType {
    isPassword: boolean,
    isConfirmPassword: boolean
} 
const ForgotPassword: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    
    const objCheckValid = {
        isPassword: true,
        isConfirmPassword: true
    }
    const [isCheckvalid, setIsCheckValid] = useState<validType>(objCheckValid)

    //step: check valid
    const HandleCheckValid = () => {
        setIsCheckValid({...objCheckValid})
        if (!password) {
            toast.error('Please enter your password.')
            setIsCheckValid({...objCheckValid, isPassword: false})
            return false
        }
        if (password.length < 6 ) {
            toast.error('Password must be at least 6 characters long.')
            setIsCheckValid({...objCheckValid, isPassword: false})
            return false
        }
        if (!confirmPassword) {
            toast.error('Please enter your confirm password.')
            setIsCheckValid({...objCheckValid, isConfirmPassword: false})
            return false
        }
        if (confirmPassword.length < 6 ) {
            toast.error('Confirm password must be at least 6 characters long.')
            setIsCheckValid({...objCheckValid, isConfirmPassword: false})
            return false
        }
        if (confirmPassword != password ) {
            toast.error('Password and confirm password do not match.')
            setIsCheckValid({...objCheckValid, isPassword: false})
            setIsCheckValid({...objCheckValid, isConfirmPassword: false})
            return false
        }
        return true;
    }

    //step: confirm reset password
    const handleConfirmResetPassword = async () => {
        const check = HandleCheckValid()
        if (!check) return
        try {
            const data = await dispatch(handelResetPassword({password: password})).unwrap()
            if (data && data.EC === 0) {
                toast.success(data.EM)
                setTimeout(() => {
                    navigate('/login')
                }, 500)
            }                
            if (data && data.EC !== 0) {
                toast.error(data.EM)
                setIsCheckValid({...objCheckValid, isPassword: false, isConfirmPassword: false})
                return
            }
        } catch (error: unknown) {
            console.log(error)
            toast.error('Password reset failed. Please try again.')
            setIsCheckValid({...objCheckValid, isPassword: false, isConfirmPassword: false})
        }
    }

    //step: enter result input
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.keyCode  === 13) {
            e.preventDefault()
            await handleConfirmResetPassword()
        }
    }

    //step: click to login back
    const handleBackToLogin = () => {
        navigate('/login')
    } 
    useEffect(() => {
        document.title = 'Forgot password'
    }, [])
    return(
        <>
            <div className="forget-password-container">
                <div className="forget-password-content container ">
                    <div className="forget-password-form row">
                        <form className="col-10 col-sm-8 col-md-6 col-lg-4">
                            <div className="forget-password-title">
                                <h3>Forgot password!</h3>
                            </div>
                            <div data-mdb-input-init className="form-outline mb-4 username">
                                <label className="form-label" htmlFor="form2Example1">Reset password</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="password" id="form2Example1" 
                                        className={isCheckvalid.isPassword  ? 'form-control' : 'form-control is-invalid'}
                                        placeholder="Type your password" 
                                        value={password} 
                                        onChange={(e: eventHtml) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 password">
                                <label className="form-label" htmlFor="form2Example2">Confirm password</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="password" id="form2Example2" 
                                        className={isCheckvalid.isConfirmPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Type your confirm password"
                                        value={confirmPassword}
                                        onChange={(e: eventHtml) => setConfirmPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            {/* <div className="row mb-4 check-forget">
                                <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={rememberUser}  onChange={(e: eventHtml) => setRrememberUser(e.target.checked)} id="form2Example31"  />
                                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                    </div>
                                </div>

                                <div className="col forgot">
                                    <a href="#!">Forgot password?</a>
                                </div>
                            </div> */}

                            <button  type="button" 
                                data-mdb-button-init data-mdb-ripple-init 
                                className="btn btn-primary btn-block mb-4 button-forget-password "
                                onClick={handleConfirmResetPassword}
                            >
                                    Confirm
                            </button>

                            <div className="row mb-4 back-home">
                                <div className="col d-flex justify-content-center">
                                    <a href="" onClick={handleBackToLogin} >
                                        <FontAwesomeIcon icon={faArrowLeft} />
                                        Back to login
                                    </a>
                                </div>
                            </div>
    
                            <div className="text-center abouts">
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
export default ForgotPassword