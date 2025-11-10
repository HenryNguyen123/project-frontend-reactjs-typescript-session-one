import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export interface UserData {
    access_token: string,
    data: object 
}

interface UserState {
    data: UserData | null,
    isLogin: boolean,
    isLoading: boolean
}

const initialState: UserState = {
  data: null,
  isLogin: false,
  isLoading: true
}

const AccountSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<UserData>) {
      state.isLogin = true
      if(state.isLogin && action.payload) {
          localStorage.setItem('JWT', JSON.stringify(action.payload));
          Cookies.set('JWT-FE', JSON.stringify(action.payload), { expires: 7 })
      } else {
          localStorage.removeItem('JWT');
      }
    },
    getLogin(state) {
      // state.isLoading = false
      // state.isError = false 
      const cookie = Cookies.get('JWT-FE')
      const getStorage = localStorage.getItem("JWT")
      if (cookie && !getStorage || (cookie && getStorage)) {
        console.log(' login by cookie')
        state.data = JSON.parse(cookie)
        state.isLogin = true
        state.isLoading = false
        return
      }
      if (getStorage && !cookie || (cookie && getStorage)) {
        console.log(' login by getStorage')
        state.data = JSON.parse(getStorage)
        state.isLogin = true
        state.isLoading = false
        return
      }
    },
  },
})

export const { setLogin, getLogin } = AccountSlice.actions
export default AccountSlice.reducer

