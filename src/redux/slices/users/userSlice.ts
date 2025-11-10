import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
// import axios from 'axios';
import axios from '../../../setup/axios'


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
  DT: {
    totalRows: number
    totalPages: number
    users: User[]
  }
}

export interface UsersState {
  listUser: {
    totalRows: number
    totalPages: number
    users: User[]
  } | null
  
  isLoading: boolean
  isError: boolean
}

// First, create the thunk
export const fetchAllUsers = createAsyncThunk<UserResponse, {limit: number, page: number}>(
  'users/fetchAllUsers',
  async ({limit, page}) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    const response = await axios.get<UserResponse>(import.meta.env.VITE_READ_ALL_USER_URL+ `?limit=${limit}&page=${page}`)
    // console.log('reudx user, ', response.data)
    return response.data
  }
)

const initialState: UsersState = {
  listUser:  null,
  isLoading: false,
  isError: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserResponse>) => {
      // console.log('payload: ', action.payload)
        state.listUser = action.payload?.DT
        state.isLoading = false
        state.isError = false
    })
    .addCase(fetchAllUsers.rejected, (state) => {
        state.isLoading = false
        state.isError = true
    })
  },
})

// Action creators are generated for each case reducer function

export default userSlice.reducer