import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../setup/axios'

interface data {
    id: number
}

interface UserResponse {
  EM: string
  EC: number
  DT: []
}

export interface UsersState {
  isEC: number  
  isLoading: boolean
  isError: boolean
}

export const deleteUserById = createAsyncThunk<UserResponse, data>(
  'users/deleteUser',
  async (data) => {
    const response =  await axios.delete<UserResponse>(import.meta.env.VITE_Delete_USER_URL + `/${data.id}`)
    return response.data
  },
)

const initialState: UsersState = {
  isEC: 1,  
  isLoading: false,
  isError: false
}

export const deleteUserSlice = createSlice({
  name: 'createUser',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(deleteUserById.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(deleteUserById.fulfilled, (state, action: PayloadAction<UserResponse>) => {
      console.log('payload delete user: ', action.payload)
        state.isEC = action.payload?.EC ?? 0
        state.isLoading = false
        state.isError = false
    })
    .addCase(deleteUserById.rejected, (state) => {
        state.isLoading = false
        state.isError = true
    })
  },
})

export default deleteUserSlice.reducer