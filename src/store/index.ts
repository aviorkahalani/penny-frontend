import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { errorLogger } from './middlewares/errorLogger'
import { base } from './apis/base'

export const store = configureStore({
  reducer: {
    [base.reducerPath]: base.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(errorLogger).concat(base.middleware)
  },
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from './apis/auth'
export * from './apis/budget'
export * from './apis/category'
