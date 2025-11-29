import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface LoginOauthType{
    title: string
}

interface UsersState {
    isLoading: boolean,
    isError: boolean,
}

export const fetchLoginByOauth2 = createAsyncThunk<void, LoginOauthType>(
  'auth/loginByOauth2',
  (data) => {
    const title: string = data.title;
    let keyUrl = import.meta.env.VITE_SERVER_URL || ''
    switch(title) {
        case 'google':
            keyUrl += import.meta.env.VITE_LOGIN_GOOGLE_USER_URL
            break;
        case 'facebook':
            keyUrl += import.meta.env.VITE_LOGIN_FACEBOOK_USER_URL
            break; 
    }
    window.location.href = keyUrl
  },
)

const initialState: UsersState = {
  isLoading: false,
  isError: false,
}

export const loginByOauth2Slice = createSlice({
  name: 'loginOauth2',
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
    //step1: waiting loading api
    .addCase(fetchLoginByOauth2.pending, (state) => {
        state.isLoading= true
        state.isError =false
    })
    //step2: get success api
    .addCase(fetchLoginByOauth2.fulfilled, (state) => {
        state.isLoading= false
        state.isError =false
    })
    //step3: get api fail
    .addCase(fetchLoginByOauth2.rejected, (state) => {
        state.isLoading= false
        state.isError = true
    })
  },
})

export default loginByOauth2Slice.reducer



