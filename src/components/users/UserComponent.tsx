import React, { useEffect, useState } from "react"
import type {RootState, AppDispatch} from '../../redux/store/store'
import { useDispatch, useSelector } from "react-redux"
import { fetchAllUsers } from "../../redux/slices/users/userSlice"
import ReactPaginate from "react-paginate"
import './userCss.scss'
import UserModal from "./UserModal"
import { deleteUserById } from '../../redux/slices/users/deleteUserSlice'
import { toast } from "react-toastify"
import ConfirmUser from "./ConfirmUser"
import WaitDataComponent from "../waitLoading/waitData/WaitDataComponent"

export interface User {
  id: number,
  email: string,
  userName: string,
  firstName: string,
  lastName: string,
  avatar: string,
  age: number,

}
export interface UsersState {
    totalRows: number
    totalPages: number
    users: User[] | null
}
  

const UserComponent: React.FC = () => {
    const dispath = useDispatch<AppDispatch>()
    // const [listAllUser, setListAllUser] = useState<UsersState | null>(null);
    const [currentPage, setCurrentPage] = useState(1)
    const [currentLimit, setCurentLimit] = useState(10)
    const [totalPage, setTotalPage] = useState(0)
    const [isVistUserModal, setisVistUserModal] = useState<boolean>(false)
    const [titleModal, setTitleModal] = useState<string>("")

    const [titleConfirm, setTitleConfirm] = useState<string>('')
    const [isVisitConfirmUser, setIsVisitConfirmUser] = useState<boolean>(false)
    
    // call list all user
    const listUser = useSelector((state: RootState) => state.user.listUser || null)
    const isLoading = useSelector((state: RootState) => state.user.isLoading)
    const isError = useSelector((state: RootState) => state.user.isError) 

    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedUserName, setSelectedUserName] = useState<string>('')
    
    // call delete user by id
    const isDeleteEC = useSelector((state: RootState) => state.deleteUser.isEC)
    const isDeleteLoading = useSelector((state: RootState) => state.deleteUser.isLoading)
    const isDeleteError = useSelector((state: RootState) => state.deleteUser.isError)
    // const [isListenDelete, setIsListenDelete] = useState<boolean>(false) 

    // call edit user
    
    const fetchListUsers = async (): Promise<void>=> {
        await dispath(fetchAllUsers({limit: currentLimit, page: currentPage})).unwrap()
    }
    const handleCreateNewUser = (): void => {
        setTitleModal('CREATE')
        setisVistUserModal(true)
    }

    const handleEditUser = (id: number): void => {
        setSelectedUserId(id)
        setTitleModal('EDIT')
        setisVistUserModal(true)
    }
    
    const handlePageClick = (e: { selected: number }): void => {
        setCurrentPage(e.selected + 1)
    }

    useEffect(() => {
        setCurentLimit(10)
        document.title = "User Page"
    }, [])
    useEffect(() => {
        fetchListUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, currentLimit])

    useEffect(() => {
        if (listUser) {
            setTotalPage(listUser.totalPages)
            // nếu trang hiện tại rỗng thì lùi lại 1 trang
            if (listUser.users.length === 0 && currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [listUser, isDeleteLoading, isDeleteError, isDeleteEC])

    if (!isLoading && isError ) {
        return <div>somting wrongs. Please try again</div>
    }
    // if (isLoading && !isError ) {
    //     return <WaitDataComponent isLoading={isLoading} />
    // }

    const handleCheckUserCreated = () => { 
        fetchListUsers()
    }

    
    //**************************** */
    // handle delete user
    const handleDeleteuser = (id: number, username: string) =>{
        setSelectedUserId(id)
        setSelectedUserName(username)
        setIsVisitConfirmUser(true)
        setTitleConfirm("DELETE") 
    }

    const handleSuccessDelete = async ()  =>{
        if (selectedUserId == null ) return
        const data = {id: selectedUserId}
        await dispath(deleteUserById(data))
        await fetchListUsers()
        toast.warn(`Delete UserName: ${selectedUserName} successfuly!`)
    }


    return(
        <>
            <div className="user-container">
                <div className="user-btn">
                    <div>
                        <button className="btn btn-primary" onClick={handleCreateNewUser}>Create new user</button>
                    </div>
                </div>
                <h1 className="user-title">List User</h1>

                <div className="list-user">
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">No.</th>
                                <th scope="col">UserName</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Age</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listUser && listUser?.users?.length > 0 && listUser.users.map((value, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1 + (currentPage - 1) * currentLimit}</th>
                                        <td>{value.userName}</td>
                                        <td>{value.firstName}</td>
                                        <td>{value.lastName}</td>
                                        <td>{value.email}</td>
                                        <td>{value.age}</td>
                                        <td>
                                            <button type="button" className="btn btn-warning mx-1" onClick={() => handleEditUser(value.id)}>Eidt</button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDeleteuser(value.id, value.userName)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                        </table>
                        {
                        totalPage > 1 &&
                            <div className="user-footer">
                                <div className="pagination  justify-content-center">
                                    <ReactPaginate
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={3}
                                        marginPagesDisplayed={2}
                                        pageCount={totalPage}
                                        previousLabel="< previous"
                                        pageClassName="page-item"
                                        pageLinkClassName="page-link"
                                        previousClassName="page-item"
                                        previousLinkClassName="page-link"
                                        nextClassName="page-item"
                                        nextLinkClassName="page-link"
                                        breakLabel="..."
                                        breakClassName="page-item"
                                        breakLinkClassName="page-link"
                                        containerClassName="pagination"
                                        activeClassName="active"
                                        renderOnZeroPageCount={null}
                                        forcePage={currentPage - 1}
                                    />

                                </div>
                            </div>
                    }
                    {
                        isLoading && !isError && (
                            <div className="wait-loading">
                                <WaitDataComponent isLoading={isLoading} />
                            </div>
                        )
                    }
                </div>

                {/* show user model */}
                <UserModal 
                    showModal = {isVistUserModal}
                    titleModal = {titleModal}
                    selectedUserId = {selectedUserId}
                    onClose = {() => setisVistUserModal(false)}
                    onSuccess = {handleCheckUserCreated}
                />

                {/* show confirm user */}
                <ConfirmUser 
                    showModal = {isVisitConfirmUser}
                    titleModal = {titleConfirm}
                    username = {selectedUserName}
                    onClose = {() => setIsVisitConfirmUser(false)}
                    onSuccess = {handleSuccessDelete}
                />
            </div>


        </>
    )
}

export default UserComponent