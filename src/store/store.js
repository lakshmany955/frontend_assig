import { configureStore } from '@reduxjs/toolkit'
import { api } from '../store/api'
import authReducer from '../store/authSlice'
import uiReducer from '../store/uiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
})