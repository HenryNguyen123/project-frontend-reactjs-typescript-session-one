import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export interface UserData {
  access_token: string;
  data: {
    age: number;
    avatar: string;
    firstName: string;
    lastName: string;
    userName: string;
  };
}
interface UserState {
    data: UserData | null ,
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
          localStorage.setItem('USER', JSON.stringify(action.payload?.data));
          Cookies.set('USER', JSON.stringify(action.payload?.data), { expires: 7 })
      } else {
          localStorage.removeItem('USER');
      }
    },
    getLogin(state) {
      try {
        const cookie = Cookies.get('USER');
        const getStorage = localStorage.getItem("USER");

        if (cookie) {
          state.data = JSON.parse(cookie);
          state.isLogin = true;
          state.isLoading = false;
          return;
        }

        if (getStorage) {
          state.data = JSON.parse(getStorage);
          state.isLogin = true;
          state.isLoading = false;
          return;
        }

        state.data = null;
        state.isLogin = false;
        state.isLoading = false;
      } catch (error) {
        console.error("Error parsing login data:", error);
        state.data = null;
        state.isLogin = false;
        state.isLoading = false;

        Cookies.remove('USER');
        localStorage.removeItem('USER');
      }
    },
    logoutUser(state) {
      try {
        Cookies.remove('USER')
        Cookies.remove('USER')
        localStorage.removeItem('USER')
        state.isLogin = false
        state.isLoading = false
        state.data =null
        console.log('logout success!')
      } catch (error) {
        console.log(error)
      }
    }
  },
})

export const { setLogin, getLogin, logoutUser } = AccountSlice.actions
export default AccountSlice.reducer

