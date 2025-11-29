import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/users/countSlice'
import userReducer from '../slices/users/userSlice'
import createUserReducer from '../slices/users/createUserSlice'
import deleteUserReducer from '../slices/users/deleteUserSlice'
import findUserByIdReduce from '../slices/users/userFindByIdSlice'
import updateUserByIdReduce from '../slices/users/updateUserSlice'
import loginAuthReduce from '../slices/auth/loginSlice'
import accountReduce from '../slices/account/userLoginSlice'
import logoutAuthReduce from '../slices/auth/logoutSlice'
import checkMailForgotPasswordReduce from '../slices/auth/checkMailForgotPassword'
import resetPasswordReduce from '../slices/auth/resetPasswordSlice'
import loginOauth2Reduce from '../slices/auth/loginOauth2Slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    // user
    user: userReducer,
    createUser: createUserReducer,
    deleteUser: deleteUserReducer,
    getUserById: findUserByIdReduce,
    updateUserById: updateUserByIdReduce,

    //login
    login: loginAuthReduce,
    //logout
    logout: logoutAuthReduce,
    //check mail forget password
    mailForgetPassword: checkMailForgotPasswordReduce,
    //reset password
    resetPassword: resetPasswordReduce,
    //login by Oauth2
    loginOauth: loginOauth2Reduce,
    // account
    account: accountReduce,
    
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch