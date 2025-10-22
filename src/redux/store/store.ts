import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../slices/countSlice'
import userReducer from '../slices/userSlice'
import createUserReducer from '../slices/createUserSlice'
import deleteUserReducer from '../slices/deleteUserSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    createUser: createUserReducer,
    deleteUser: deleteUserReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch