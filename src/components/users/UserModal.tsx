import React, { useEffect, useRef, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalUser.scss'
import { toast } from "react-toastify";
import type {RootState, AppDispatch} from '../../redux/store/store'
import { useDispatch, useSelector} from "react-redux";
import {createAddNewUser} from '../../redux/slices/users/createUserSlice'
import {findUserById} from '../../redux/slices/users/userFindByIdSlice'
import {updateUserById} from '../../redux/slices/users/updateUserSlice'

export interface User {
  id: number,
  email: string,
  userName: string,
  firstName: string,
  lastName: string,
  avatar: string,
  age: number,

}

interface UserModalProps {
  showModal: boolean,
  titleModal: string,
  selectedUserId: number | null,
  onClose?: () => void,
  onSuccess?: () => void
}

interface checkIsValidType{
    isUserName: boolean,
    isEmail: boolean,
    isPassword: boolean,
    isConfirmPassword: boolean,
    isLastName: boolean,
    isFirstName: boolean,
    isAvatar: boolean,
    isAge: boolean,
}

const UserModal: React.FC<UserModalProps>  = ({showModal, titleModal, selectedUserId, onClose, onSuccess}) => {
    const dispath = useDispatch<AppDispatch>()
    
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    //create user
    // const createUser = useSelector((state: RootState) => state.createUser.user || null)
    // const createUserData = useSelector((state: RootState) => state.createUser.data || null)
    // const isLoadingCreate = useSelector((state: RootState) => state.createUser.isLoading)
    // const isErrorCreate = useSelector((state: RootState) => state.createUser.isError) 
    
    //find user by id
    const getUser = useSelector((state: RootState) => state.getUserById.getUser || null)
    // const isLoadingFindId = useSelector((state: RootState) => state.getUserById.isLoading)
    // const isErrorFindId = useSelector((state: RootState) => state.getUserById.isError) 
    
    const [show, setShow] = useState(showModal);
    const [calltitle, setCallTitle] = useState(titleModal)

    const [userName, setUserName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [age, setAge] = useState<number | string >("")
    const [avatar, setAvatar] = useState<File | null>(null)
    const [urlAvatar, setUrlAvatar] = useState<string>('')
    const [isChangePassword, setIsChangePassword] = useState<boolean>(false)

    const checkIsValid: checkIsValidType = {
        isUserName: true,
        isEmail: true,
        isPassword: true,
        isConfirmPassword: true,
        isLastName: true,
        isFirstName: true,
        isAvatar: true,
        isAge: true,
    }

    const [objCheckValid, setObjCheckValid] = useState<checkIsValidType>(checkIsValid)

    const resetForm = () => {
        setUserName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setFirstName('');
        setLastName('');
        setAge('');
        setAvatar(null);
        setObjCheckValid(checkIsValid);
    };

    useEffect(() => {
        setShow(showModal)
        if(titleModal == "CREATE") {
            setUserName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setFirstName('');
            setLastName('');
            setAge('');
            setAvatar(null);
            setUrlAvatar('');
            setCallTitle("Add New User")
            resetForm()
        }
        if(titleModal == "EDIT") {
            setUserName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setFirstName('');
            setLastName('');
            setAge('');
            setAvatar(null);
            setCallTitle("Edit User")
            handleFinduserById()
        }
    }, [showModal, titleModal, selectedUserId])

    useEffect(() => {

        if (getUser && titleModal === "EDIT") {
            resetForm()
            setUserName(getUser.userName ?? "");
            setEmail(getUser.email ?? "");
            setFirstName(getUser.firstName ?? "");
            setLastName(getUser.lastName ?? "");
            setAge(getUser.age ?? "");
            setUrlAvatar(getUser.avatar ? `${import.meta.env.VITE_SERVER_URL}${getUser.avatar}` : "")
        }
    }, [getUser, titleModal, selectedUserId]);

    const handleClose = () => {
        setShow(false);
        if (onClose)  onClose()
    } 

    // check avatar is image
    const checkFileImage = ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp"]
    const handleOnChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if(!file) return

        if(!checkFileImage.includes(file.type)) {
            alert('vui long chon file hinh')
            setAvatar(null)
            return
        }
        
        if(file.size > 2 * 1024*1024) {
            // kiểm tra kich thước file nếu cần
        }

        setAvatar(file)
    } 

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
        if(!password.trim() && (titleModal == "CREATE" || isChangePassword)) {
            toast.error('Please enter a password.')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if(password.trim().length < 6  && (titleModal == "CREATE" || isChangePassword)) {
            toast.error('Password must be at least 6 characters long.')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if(!confirmPassword.trim()  && (titleModal == "CREATE" || isChangePassword)) {
            toast.error('Please confirm your password.')
            setObjCheckValid({...checkIsValid, isConfirmPassword: false})
            return
        }
        if(password != confirmPassword && (titleModal == "CREATE" || isChangePassword)) {
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

    const handleCloseModal = () => {
        setShow(false);
        if (onClose) onClose();
    };

    // create new user
    const handleCreateUser = async () => {
        const checkResValid = handleCheckValid()
        if(!checkResValid) return;

        try {
            console.log("avtar: ", avatar)
            const result = await dispath(createAddNewUser({firstName, lastName, email, userName, password, avatar, age})).unwrap(); 
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
            if (onSuccess) onSuccess();
            handleCloseModal();
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

    // handle edit user
    
    const handleEditUser = async () => {
        const checkResValid = handleCheckValid()
        if(!checkResValid) return;
        try {
            if (!selectedUserId) return toast.error("dont find user update!")
            const id: number = selectedUserId
            const resultUpdate = await dispath(updateUserById({id, email, userName, firstName, lastName, password, avatar, age})).unwrap(); 
            const { EC, EM } = resultUpdate;
            if (EC === 0) {
                toast.success(EM || "Upadete user successfully!");
                if (onSuccess) onSuccess();
                handleCloseModal();
                return;
            }
            toast.error(EM || "Upadete user fail!");
            if (onSuccess) onSuccess();
            handleCloseModal();
            return;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Something went wrong: ${error.message}`);
            } else {
                toast.error("Something went wrong when update user.");
            }
        }
    }
    //handle click if want to change passsword (edit)
    const handleEditClickTitle = () => {
        setIsChangePassword(!isChangePassword)
    }   
    // function call user find by id
    const handleFinduserById = async () => {
        resetForm()
        try {
            if (titleModal == "EDIT" && selectedUserId) {
                await dispath(findUserById({id: selectedUserId}))
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Something went wrong: ${error.message}`);
            } else {
                toast.error("Something went wrong when creating user.");
            }
        }
    }

    // image avatar
    const handleClickAvatar = () => {
        fileInputRef.current?.click(); 
    };
    const handleImageCreateUser = () => {
        if(avatar) {
            URL.createObjectURL(avatar)
        }
    }; 

    return (
        <>
            <div className="modal-user">
                    <Modal show={show} onHide={handleClose} className="show-modal">
                        <Modal.Header closeButton className="modal-header-content">
                            <Modal.Title className="title-modal-user">
                                <span>{calltitle}</span>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="modal-body-content">
                            <div className="content-body row form-user-modal">
                                <div className="col-12 col-sm-12 form-group avatar-image" onClick={handleClickAvatar}>
                                    <input type="file" id="image" accept="image/*" ref={fileInputRef} onChange={handleOnChangeAvatar}   className='form-control input-avatar-item'  />
                                    <img src={avatar ? URL.createObjectURL(avatar) : (urlAvatar || `/images/users/avatar/avatar_anonymous.png`)} onChange={handleImageCreateUser} alt="avatar image"  className="avatar-image-item"/>
                                </div> 
                                <div className="col-12 col-sm-12 form-group avatar-title">
                                    <div className="avatar-title-item1">
                                    </div>
                                    <div className="avatar-title-item2">
                                        <h6>Avatar</h6>
                                    </div>
                                    <div className="avatar-title-item1">
                                    </div>
                                </div> 
                                <div className="col-12 col-sm-12 form-group">
                                    <label htmlFor="username">UserName</label>
                                    <input type="text" id="username" value={userName} disabled={titleModal == "EDIT"} onChange={e => setUserName(e.target.value)} className={objCheckValid.isUserName  ? 'form-control' : 'form-control is-invalid'} />
                                </div> 
                                <div className="col-12 col-sm-12 form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="email" id="email" value={email} disabled={titleModal == "EDIT"} onChange={e => setEmail(e.target.value)}   className={objCheckValid.isEmail  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
                                {
                                    titleModal == "EDIT" && (
                                        <div className="col-12 col-sm-12 form-group alert-password" onClick={handleEditClickTitle}>
                                            <h6>{isChangePassword ? 'Cancel change password' : 'Click here to change password'} <i className="fa-solid fa-triangle-exclamation"></i></h6>
                                        </div>
                                    )
                                }
                                {
                                    (titleModal == "CREATE" || isChangePassword)  && (
                                        <>
                                            <div className="col-12 col-sm-6 form-group">
                                                <label htmlFor="">Password</label>
                                                <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}   className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'}  />
                                            </div>
                                            <div className="col-12 col-sm-6 form-group">
                                                <label htmlFor="">Confirm password</label>
                                                <input type="password" id="confirm_password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}   className={objCheckValid.isConfirmPassword  ? 'form-control' : 'form-control is-invalid'}  />
                                            </div>
                                        </>    
                                    )
                                }
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">First name</label>
                                    <input type="text" id="firstname" value={firstName} onChange={e => setFirstName(e.target.value)}   className={objCheckValid.isFirstName  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Last Name</label>
                                    <input type="text" id="lastname" value={lastName} onChange={e => setLastName(e.target.value)}   className={objCheckValid.isLastName  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Age</label>
                                    <input type="number" id="age" value={age} onChange={e => setAge(parseInt(e.target.value))}   className={objCheckValid.isAge  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" className="button-close" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={titleModal == "CREATE" ? handleCreateUser : handleEditUser}>
                            {titleModal == "EDIT" ? "Confirm" : 'Save Changes'}
                        </Button>
                        </Modal.Footer>
                    </Modal>

            </div>
        </>
    )
}

export default UserModal