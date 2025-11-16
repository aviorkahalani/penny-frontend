import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { errorLogger } from './middlewares/errorLogger'
import { auth } from './apis/auth'

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(errorLogger).concat(auth.middleware)
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from './apis/auth'
