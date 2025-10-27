import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../setup/axios'

export interface User {
  id: number,
  email: string,
  userName: string,
  firstName: string,
  lastName: string,
  avatar: string,
  age: number,

}

export interface UserResponse {
  EM: string
  EC: number
  DT: User
}

export interface UsersState {
  getUser: User | null  
  isLoading: boolean
  isError: boolean
}

export const findUserById = createAsyncThunk<UserResponse, {id: number}>(
  'users/findUserById',
  async ({id}) => {
    const response = await axios.get<UserResponse>(import.meta.env.VITE_READ_Find_User_By_Id+ `${id}`)
    // console.log('reudx user, ', response.data)
    return response.data
  }
)


const initialState: UsersState = {
  getUser:  null,
  isLoading: false,
  isError: false
}

export const userFindByIdSlice = createSlice({
  name: 'getUserById',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(findUserById.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(findUserById.fulfilled, (state, action: PayloadAction<UserResponse>) => {
    //   console.log('payload get user by id: ', action.payload.DT)
        state.getUser = action.payload?.DT ?? null
        state.isLoading = false
        state.isError = false
    })
    .addCase(findUserById.rejected, (state) => {
        state.isLoading = false
        state.isError = true
    })
  },
})

// Action creators are generated for each case reducer function

export default userFindByIdSlice.reducer