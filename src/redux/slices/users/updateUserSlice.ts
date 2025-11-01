import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../setup/axios'

interface UserUpdateData {
    id: number,
    email: string,
    userName: string,
    password: string,
    firstName: string,
    lastName: string,
    avatar?: File | null,
    age?: number | string ,
}
interface UserData {
  email: string,
  userName: string,
  password: string,
  firstName: string,
  lastName: string,
  avatar?: File | null,
  age?: number | string ,
}

interface UserResponse {
  EM: string
  EC: number
  DT: {user: UserData[]} | null
}


export interface UsersState {
  data: UserResponse| null
//   user: {user: UserData[]} | null
  isLoading: boolean
  isError: boolean
}

export const updateUserById = createAsyncThunk<UserResponse, UserUpdateData>(
  'users/updateUserById',
  async (data) => {
    const formData = new FormData()
    formData.append('firstName', data.firstName)
    formData.append('lastName', data.lastName)
    formData.append('password', data.password)
    if (data.age) formData.append('age', String(data.age))
    if (data.avatar) formData.append('avatar', data.avatar)
    const response =  await axios.put<UserResponse>(import.meta.env.VITE_Update_User_By_Id + `${data.id}`,formData)
    return response.data
  }
)

const initialState: UsersState = {
  data: null,
  isLoading: false,
  isError: false
}


export const updateUserByIdSlice = createSlice({
  name: 'updateUserById',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(updateUserById.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(updateUserById.fulfilled, (state, action: PayloadAction<UserResponse>) => {
      console.log('payload update user: ', action.payload)
        state.data = action.payload ? action.payload : null
        // state.user = action.payload?.DT ? action.payload.DT : null
        state.isLoading = false
        state.isError = false
    })
    .addCase(updateUserById.rejected, (state) => {
        state.isLoading = false
        state.isError = true
    })
  },
})

// Action creators are generated for each case reducer function

export default updateUserByIdSlice.reducer