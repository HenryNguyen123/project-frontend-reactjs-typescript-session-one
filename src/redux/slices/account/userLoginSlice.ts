import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'js-cookie';

export interface UserData {
  data: {
    age: number;
    avatar: string;
    firstName: string;
    lastName: string;
    userName: string;
  };
}
export interface dataLogin {
  rememberUser: boolean,
  data: UserData | null
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
    setLogin(state, action: PayloadAction<dataLogin>) {
      if (!action.payload || !action.payload.data) return
      state.isLogin = true
      if(state.isLogin && action.payload) {
          const dataLogin = {data: action.payload?.data?.data}
          // localStorage.setItem('USER', JSON.stringify(dataLogin));
          Cookies.set('USER', JSON.stringify(dataLogin), action.payload.rememberUser ? { expires: 7 } : undefined)
      } 
      // else {
      //     localStorage.removeItem('USER');
      // }
    },
    getLogin(state) {
      try {
        const cookie = Cookies.get('USER');
        // const getStorage = localStorage.getItem("USER");

        if (cookie) {
          const getcookie =  JSON.parse(cookie)
          const dataCookie: UserData = {
            // access_token: getcookie.access_token,
            data: getcookie.data
          } 
          state.data = dataCookie;
          state.isLogin = true;
          state.isLoading = false;
          return;
        }

        // if (getStorage) {
        //   const parseStoge =  JSON.parse(getStorage)
        //   const dataStoge: UserData = {
        //     // access_token: parseStoge.access_token,
        //     data: parseStoge.data
        //   }
        //   state.data = dataStoge;
        //   state.isLogin = true;
        //   state.isLoading = false;
        //   return;
        // }

        state.data = null;
        state.isLogin = false;
        state.isLoading = false;
      } catch (error) {
        console.error("Error parsing login data:", error);
        state.data = null;
        state.isLogin = false;
        state.isLoading = false;

        Cookies.remove('USER');
        // localStorage.removeItem('USER');
      }
    },
    logoutUser(state) {
      try {
        Cookies.remove('USER')
        Cookies.remove('USER')
        // localStorage.removeItem('USER')
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

