import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modalUser.scss'

interface UserModalProps {
  showModal: boolean,
  onClose?: () => void
}

const UserModal: React.FC<UserModalProps>  = ({showModal, onClose}) => {

    const [show, setShow] = useState(showModal);

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        setShow(showModal)
    }, [showModal])

    const handleClose = () => {
        setShow(false);
        if (onClose)  onClose()
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
                                    <input type="text" id="username" value={userName} onChange={e => setUserName(e.target.value)} className='form-control'/>
                                </div> 
                                <div className="col-12 col-sm-6 form-group">
                                    <label htmlFor="">Email</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}  className='form-control' />
                                </div>

                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" className="button-close" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                        </Modal.Footer>
                    </Modal>

            </div>
        </>
    )
}

export default UserModal