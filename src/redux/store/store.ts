import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/users/countSlice'
import userReducer from '../slices/users/userSlice'
import createUserReducer from '../slices/users/createUserSlice'
import deleteUserReducer from '../slices/users/deleteUserSlice'
import findUserByIdReduce from '../slices/users/userFindByIdSlice'
import updateUserByIdReduce from '../slices/users/updateUserSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    createUser: createUserReducer,
    deleteUser: deleteUserReducer,
    getUserById: findUserByIdReduce,
    updateUserById: updateUserByIdReduce,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch