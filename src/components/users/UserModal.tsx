import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalUser.scss'
import {createAddNewUser} from '../../services/userService'
import { toast } from "react-toastify";


interface UserModalProps {
  showModal: boolean,
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

const UserModal: React.FC<UserModalProps>  = ({showModal, onClose, onSuccess}) => {

    const [show, setShow] = useState(showModal);

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [age, setAge] = useState<number | string >("")
    const [avatar, setAvatar] = useState<File | null>(null)

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

    useEffect(() => {
        setShow(showModal)
    }, [showModal])

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
            toast.error('vui lòng nhập userName')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return
        }
        if(userName.trim().length <=2 || userName.trim().length >= 100) {
            toast.error('username phải nhiều hơn 2 ký tư và bé hơn 100 ký tự')
            setObjCheckValid({...checkIsValid, isUserName: false})
            return
        }
        if(!email.trim()) {
            toast.error('vui lòng nhập email')
            setObjCheckValid({...checkIsValid, isEmail: false})
            return
        }
        const re = /\S+@\S+\.\S+/;
        if(!re.test(email.trim())) {
            toast.error('email không hợp lệ')
            setObjCheckValid({...checkIsValid, isEmail: false})
            return
        }
        if(!password.trim()) {
            toast.error('vui lòng nhập password')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if(password.trim().length < 6) {
            toast.error('password phải từ 6 ký tự trở lên')
            setObjCheckValid({...checkIsValid, isPassword: false})
            return
        }
        if(!confirmPassword.trim()) {
            toast.error('vui lòng nhập confirmPassword')
            setObjCheckValid({...checkIsValid, isConfirmPassword: false})
            return
        }
        if(password != confirmPassword) {
            toast.error('password và confirm password không khớp, vui lòng nhập lại')
            setObjCheckValid({...checkIsValid, isConfirmPassword: false, isPassword: false})
            return
        }
        if(!firstName.trim()) {
            toast.error('vui lòng nhập firstname')
            setObjCheckValid({...checkIsValid, isFirstName: false})
            return
        }
        if(!lastName.trim()) {
            toast.error('vui lòng nhập last name')
            setObjCheckValid({...checkIsValid, isLastName: false})
            return
        }

        return true
    }

    const handleCreateUser = async () => {
        const checkResValid = handleCheckValid()
        if(checkResValid){
            const response = await createAddNewUser(firstName, lastName, email, userName, password, avatar, age)
            if (response && response.data.EC == 0){
                toast.success(response.data.EM)
                if(onSuccess) onSuccess()
            } else {
                toast.error(response.data.EM)
            }
            
            setShow(false);
            if (onClose)  onClose()
            return
        }
    }

    return (
        <>
            <div className="modal-user">
                    <Modal show={show} onHide={handleClose} className="show-modal">
                        <Modal.Header closeButton>
                        <Modal.Title className="title-modal-user"><span>Add New User</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="content-body row">
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="username">UserName</label>
                                    <input type="text" id="username" value={userName} onChange={e => setUserName(e.target.value)} className={objCheckValid.isUserName  ? 'form-control' : 'form-control is-invalid'} />
                                </div> 
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}   className={objCheckValid.isEmail  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Password</label>
                                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)}   className={objCheckValid.isPassword  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Confirm password</label>
                                    <input type="password" id="confirm_password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}   className={objCheckValid.isConfirmPassword  ? 'form-control' : 'form-control is-invalid'}  />
                                </div>
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
                                    <input type="number" id="age" value={age} onChange={e => setAge(parseInt(e.target.value))}   className='form-control'  />
                                </div>
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">avatar</label>
                                    <input type="file" id="age" accept="image/*" onChange={handleOnChangeAvatar}   className='form-control'  />
                                </div>
                                {/* {
                                    avatar && (
                                        <div className="col-12 col-sm-6 form-group">
                                            <img src={URL.createObjectURL(avatar)} alt="" width='80px' height='80px' />
                                        </div>        
                                    )
                                } */}
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" className="button-close" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCreateUser}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>

            </div>
        </>
    )
}

export default UserModal