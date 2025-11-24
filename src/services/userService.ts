import axios from '../setup/axios';

interface userData {
  email: string,
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  avatar?: File,
  age?: number | string ,
}

interface UserResponse {
  EM: string
  EC: number
  DT: {users: userData[]}
}

export const createAddNewUser = async (firstName: string, lastName: string, email: string, userName: string, password: string, avatar?: File | null, age?: number | string) => {
    return await axios.post<UserResponse>(import.meta.env.VITE_CREATE_USER_URL, {firstName: firstName, lastName: lastName, email: email, userName: userName, password: password, avatar: avatar, age: age})
}
