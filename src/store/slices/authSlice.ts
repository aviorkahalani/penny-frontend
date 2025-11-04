import type { User } from '@/interfaces'
import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: Error | null
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload
    },
    setError(state, action) {
      state.error = action.payload
    },
  },
})

export const { setUser, setIsLoading, setError } = authSlice.actions
