import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft, faUser } from '@fortawesome/free-solid-svg-icons';
import type React from "react"
import './alertForgot.scss'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import type {RootState, AppDispatch} from '../../../redux/store/store'
import { useDispatch } from "react-redux";
import { checkMailForgotPassword } from "../../../redux/slices/auth/checkMailForgotPassword";

type eventHtml = React.ChangeEvent<HTMLInputElement>
interface validType {
    isEmail: boolean,
} 
const MailForgotPassword: React.FC = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>();
    
    const [email, setEmail] = useState<string>('')
    
    const objCheckValid = { isEmail: true }
    const [isCheckvalid, setIsCheckValid] = useState<validType>(objCheckValid)

    //step: check valid
    const HandleCheckValid = () => {
        if (!email) {
            toast.error('Please enter your email.')
            setIsCheckValid({...objCheckValid, isEmail: false})
            return false
        }
        const re = /\S+@\S+\.\S+/;
        if(!re.test(email.trim())) {
            toast.error('Please enter a valid email address.')
            setIsCheckValid({...objCheckValid, isEmail: false})
            return false
        }
        setIsCheckValid({...objCheckValid, isEmail: true})
        return true;
    }

    //step: click to login back
    const handleBackToLogin = () => {
        navigate('/login')
    } 
    //step: click to forget password component
    const handleToForgetPassword = async () => {
        const check = HandleCheckValid();
        if (!check) return
        try {
            const data = await dispatch(checkMailForgotPassword({email: email})).unwrap();
            if (data && data.EC === 0) return navigate('/client/forget-password')
            if (data && data.EC !== 0) {
                toast.error(data.EM)    
                setIsCheckValid({...objCheckValid, isEmail: false})
                return
            }
        } catch (error: unknown) {
            console.log(error)
        }
        // navigate('/client/forget-password')
    }
     
    //step: enter result input
    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.keyCode  === 13) {
            e.preventDefault()
            await handleToForgetPassword()
        }
    }
    useEffect(() => {
        document.title = 'Forgot password'
    }, [])
    return(
        <>
            <div className="alert-forgot-container">
                <div className="alert-forgot-content container ">
                    <div className="alert-forgot-form row">
                        <form className="col-10 col-sm-8 col-md-6 col-lg-4">
                            <div className="alert-forgot-title">
                                <h3>Forgot password!</h3>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 username">
                                <label className="form-label" htmlFor="form2Example1">Enter input your email</label>
                                <div>
                                    <FontAwesomeIcon icon={faUser} className="icon"/>
                                    <input type="email" id="form2Example1" 
                                        className={isCheckvalid.isEmail  ? 'form-control' : 'form-control is-invalid'}
                                        placeholder="Type your email" 
                                        value={email} 
                                        onChange={(e: eventHtml) => setEmail(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <button  type="button" 
                                data-mdb-button-init data-mdb-ripple-init 
                                className="btn btn-primary btn-block mb-4 button-alert-forgot "
                                onClick={handleToForgetPassword}
                            >
                                    Can you wanto reset password?
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
export default MailForgotPassword