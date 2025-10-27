import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { toast } from "react-toastify";

interface modalProps {
    showModal: boolean
    titleModal: string
    username: string
    onClose?: () => void
    onSuccess?: () => void
 }
const ConfirmUser: React.FC<modalProps> = ({showModal, titleModal, username, onClose, onSuccess}) => {
    const [show, setShow] = useState<boolean>(showModal);
    const [titleCard, setTitleCard] = useState<string>('') 
    const [titleBodyCard, setTitleBodyCard] = useState<string>('') 

    const handleClose = () => {
        setShow(false);
        if (onClose)  onClose()

    } 
    const handleSuccessClose = () => {
        if(onSuccess) onSuccess();
        // toast.success(`Delete success username: ${username}`)
        handleClose()
    } 

    useEffect(() => {
        setShow(showModal)
        if(titleModal == 'DELETE') setTitleCard(`Delete username: ${username}!`)
        if(titleModal == 'DELETE') setTitleBodyCard(`Do you want to delete username: ${username}?`)
    }, [showModal, titleModal])
    return (

        <>
            <div className="confirm_user">
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{titleCard}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{titleBodyCard}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSuccessClose}>
                        {titleModal == "DELETE" ? "Confirm" : "..."}
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    )
}

export default ConfirmUser