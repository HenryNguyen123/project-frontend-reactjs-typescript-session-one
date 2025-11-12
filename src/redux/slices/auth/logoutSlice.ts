import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import {logoutApi} from '../../../api/auth/authAPI'

export interface DataResponse{
    EM: string
    EC: number
    DT: []
}
export interface DataState {
    data: DataResponse | null
    isLogin: boolean
    isLoading: boolean
}


export const logoutAuthentication = createAsyncThunk<DataResponse>(
  'auth/logout',
  async () => {
    // const response =  await axios.post<DataResponse>(import.meta.env.VITE_REMOVE_JWT_URL)
    const response =  await logoutApi()
    return response.data
  }
)

const initialState: DataState = {
  data: null,
  isLoading: false,
  isLogin: true
}

export const LogoutAuthenSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(logoutAuthentication.pending, (state) => {
        state.isLoading = true
        state.isLogin = true
    })
    .addCase(logoutAuthentication.fulfilled, (state, action: PayloadAction<DataResponse>) => {
      console.log('payload logout: ', action.payload)
        state.data = action.payload ? action.payload : null
        state.isLoading = false
        state.isLogin = false
        Cookies.remove('JWT-FE')
        localStorage.removeItem('JWT')
    })
    .addCase(logoutAuthentication.rejected, (state) => {
        state.isLoading = false
        state.isLogin = true
    })
  },
})

// Action creators are generated for each case reducer function

export default LogoutAuthenSlice.reducer