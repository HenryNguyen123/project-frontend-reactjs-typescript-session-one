import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from '../../../setup/axios'
import type {UserData} from '../../../redux/slices/account/userLoginSlice'


interface DataResponse{
    EM: string
    EC: number
    DT: UserData | null
}

export interface DataState {
    data: DataResponse | null
    isLoading: boolean
    isError: boolean
}

export const fetchAccountGetMe = createAsyncThunk<DataResponse>(
  'auth/login',
  async () => {
    const response =  await axios.get<DataResponse>(import.meta.env.VITE_CALL_ME_ACCOUNT_URL)
    return response.data
  }
)

const initialState: DataState = {
  data: null,
  isLoading: false,
  isError: false
}

export const getMeAccountSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    .addCase(fetchAccountGetMe.pending, (state) => {
        state.isLoading = true
        state.isError = false
    })
    .addCase(fetchAccountGetMe.fulfilled, (state, action: PayloadAction<DataResponse>) => {
        state.data = action.payload ? action.payload : null
        state.isLoading = false
        state.isError = false
    })
    .addCase(fetchAccountGetMe.rejected, (state) => {
        state.isLoading = false
        state.isError = true
    })
  },
})

// Action creators are generated for each case reducer function

export default getMeAccountSlice.reducer