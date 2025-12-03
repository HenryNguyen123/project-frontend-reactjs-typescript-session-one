
import React, { useEffect, useRef, useState } from "react"
import './register.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faGoogle, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUser, faUnlockKeyhole, faHouse, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import type { AppDispatch} from '../../../redux/store/store'
// import type {RootState, AppDispatch} from '../../../redux/store/store'
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch  } from "react-redux";
// import {loginAuthentication} from '../../../redux/slices/auth/loginSlice'
// import {setLogin} from '../../../redux/slices//account/userLoginSlice'
// import type {UserData} from '../../../redux/slices/account/userLoginSlice'
import {createAddNewUser} from '../../../redux/slices/users/createUserSlice'

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type eventHtml = React.ChangeEvent<HTMLInputElement>
 
interface valid {
    isUserName: boolean,
    isEmail: boolean,
    isPassword: boolean,
    isConfirmPassword: boolean,
    isLastName: boolean,
    isFirstName: boolean,
    isAvatar: boolean,
    isAge: boolean,
}

const RegisterComponent: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [userName, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [age, setAge] = useState<number | string>('')
    const [avatar, setAvatar] = useState<File | null>(null)
    // const [isChangePassword, setIsChangePassword] = useState<boolean>(false)

    // const [rememberUser, setRrememberUser] = useState<boolean>(true)
    
    // const loginUser: UserData | null = useSelector((state: RootState) => state.login.data)
    // const isLoadingUser = useSelector((state: RootState) => state.login.isLoading)
    // const isErrorUser = useSelector((state: RootState) => state.login.isError)

    const handleBackLogin = () => {
        navigate('/login')
    }
    useEffect(() => {
        document.title = 'Register';
    }, [])
    
    const checkIsValid = {
        isUserName: true,
        isEmail: true,
        isPassword: true,
        isConfirmPassword: true,
        isLastName: true,
        isFirstName: true,
        isAvatar: true,
        isAge: true,
    }
    const [objCheckValid, setObjCheckValid] = useState<valid>(checkIsValid)

    const handleCheckValid = () => {
        setObjCheckValid(checkIsValid)

        if(!userName.trim()) {
            toast.error('Please enter a username.')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return
        }
        if(userName.trim().length <=2 || userName.trim().length >= 100) {
            toast.error('Username must be between 3 and 100 characters.')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return
        }
        if(!email.trim()) {
            toast.error('Please enter an email address.')
            setObjCheckValid({...checkIsValid, isEmail: false})
            return
        }
        const re = /\S+@\S+\.\S+/;
        if(!re.test(email.trim())) {
            toast.error('Please enter a valid email address.')
            setObjCheckValid({...checkIsValid, isEmail: false})
            return
        }
        if(!password.trim()) {
            toast.error('Please enter a password.')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if(password.trim().length < 6 ) {
            toast.error('Password must be at least 6 characters long.')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if(!confirmPassword.trim() ) {
            toast.error('Please confirm your password.')
            setObjCheckValid({...checkIsValid, isConfirmPassword: false})
            return
        }
        if(password != confirmPassword) {
            toast.error('Password and confirm password do not match.')
            setObjCheckValid({...checkIsValid, isConfirmPassword: false, isPassword: false})
            return
        }
        if(!firstName.trim()) {
            toast.error('Please enter your first name.')
            setObjCheckValid({...checkIsValid, isFirstName: false})
            return
        }
        if(!lastName.trim()) {
            toast.error('Please enter your last name.')
            setObjCheckValid({...checkIsValid, isLastName: false})
            return
        }
        if(age && parseInt(age.toString()) < 1) {
            toast.error('Please enter your age >= 1.')
            setObjCheckValid({...checkIsValid, isAge: false})
            return
        }

        return true
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.keyCode  === 13) {
            handleClickRegister()
        }
    }

    const handleClickRegister = async () => {
        const checkResValid = handleCheckValid()
        if(!checkResValid) return;

        try {
            console.log("avtar: ", avatar)
            const result = await dispatch(createAddNewUser({firstName, lastName, email, userName, password, avatar, age})).unwrap(); 
            const { EC, EM } = result;

            if (EC === -2) {
                toast.error("Username already exists. Please choose another one.");
                setObjCheckValid({ ...checkIsValid, isUserName: false });
                return;
            }
            if (EC === -3) {
                toast.error("Email already exists. Please choose another one.");
                setObjCheckValid({ ...checkIsValid, isEmail: false });
                return;
            }
            if (EC === 0) {
                toast.success(EM || "Create new user successfully!");
                navigate('/login')
                return;
            }

            toast.error(EM || "Something went wrong while creating user.");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Something went wrong: ${error.message}`);
            } else {
                toast.error("Something went wrong when creating user.");
            }
        }
    }


    // check avatar is image
    const checkFileImage = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"]
    const handleOnChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!checkFileImage.includes(file.type)) {
            alert('Vui lòng chọn file hình');
            setAvatar(null);
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert('File quá lớn, max 2MB');
            setAvatar(null);
            return;
        }

        setAvatar(file);
    }
    const handleClickAvatar = () => {
        fileInputRef.current?.click(); 
    };
    const handleImageCreateUser = () => {
        if(avatar) {
            URL.createObjectURL(avatar)
        }
    }

    return(
        <>
            <div className="register-container">
                <div className="register-content container ">
                    <div className="register-form row">
                        <form className="col-10 col-sm-8 col-md-6 col-lg-4 row">
                            <div className="register-title">
                                <div className="icon-return"><span onClick={handleBackLogin}><FontAwesomeIcon icon={faArrowLeft} /></span></div>
                                <h3>Register</h3>
                                <div className="register-title-item_right"></div>
                            </div>

                            <div data-mdb-input-init className="form-outline username col-sm-2 avatar-title">
                                <label className="form-label" htmlFor="form2Example1">Avatar</label>
                            </div>
                            <div data-mdb-input-init className="form-outline col-sm-10 image-avatar" onClick={handleClickAvatar}>
                                <div>
                                    <input type="file" id="avatar"  accept="image/*" 
                                        ref={fileInputRef}
                                        onChange={handleOnChangeAvatar}
                                    />
                                    <img src={avatar ? URL.createObjectURL(avatar) : `/images/users/avatar/avatar_anonymous.png`} 
                                        onChange={handleImageCreateUser} alt="avatar image"  className="avatar-image-item"
                                    />
                                </div>
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
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 username">
                                <label className="form-label" htmlFor="form2Example1">Email</label>
                                <div>
                                    <FontAwesomeIcon icon={faUser} className="icon"/>
                                    <input type="email" id="form2Example1" 
                                        className={objCheckValid.isUserName  ? 'form-control' : 'form-control is-invalid'}
                                        placeholder="Type your email" 
                                        value={email} 
                                        onChange={(e: eventHtml) => setEmail(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4  col-sm-4">
                                <label className="form-label" htmlFor="form2Example2">First Name</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="text" id="form2Example2" 
                                        className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Enter first name"
                                        value={firstName}
                                        onChange={(e: eventHtml) => setFirstName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4  col-sm-8">
                                <label className="form-label" htmlFor="form2Example2">Last Name</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="text" id="form2Example2" 
                                        className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Enter last name"
                                        value={lastName}
                                        onChange={(e: eventHtml) => setLastName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 password col-sm-6">
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

                            <div data-mdb-input-init className="form-outline mb-4 password col-sm-6">
                                <label className="form-label" htmlFor="form2Example2">Confirm Password</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="password" id="form2Example2" 
                                        className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Type your confirm password"
                                        value={confirmPassword}
                                        onChange={(e: eventHtml) => setConfirmPassword(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div data-mdb-input-init className="form-outline mb-4 col-sm-6">
                                <label className="form-label" htmlFor="form2Example2">Age</label>
                                <div>
                                    <FontAwesomeIcon icon={faUnlockKeyhole} className="icon"/>
                                    <input type="number" id="form2Example2" 
                                        className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'} 
                                        placeholder="Type your age"
                                        value={age}
                                        onChange={(e: eventHtml) => setAge(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4 check-forget">
                                {/* <div className="col d-flex justify-content-center">
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={rememberUser}  onChange={(e: eventHtml) => setRrememberUser(e.target.checked)} id="form2Example31"  />
                                        <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                                    </div>
                                </div> */}

                                {/* <div className="col forgot">
                                    <a href="#!">Forgot password?</a>
                                </div> */}
                            </div>

                            <button  type="button" 
                                data-mdb-button-init data-mdb-ripple-init 
                                className="btn btn-primary btn-block mb-4 button-register "
                                onClick={handleClickRegister}
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