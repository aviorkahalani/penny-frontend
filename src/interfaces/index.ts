export interface User {
  _id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface ErrorResponse {
  success: boolean
  code: number
  message: string
  details?: { path: string; message: string }[]
}

export interface Credentials {
  email: string
  name: string
  password: string
}

export type Currency = 'NIS' | 'USD'
export type Type = 'income' | 'expense' | 'saving'

export interface Budget {
  _id: string
  userId: string
  name: string
  currency: Currency
  notes?: string
  date: {
    year: number
    month: number
  }
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface Category {
  _id: string
  userId: string
  budgetId: string
  type: Type
  name: string
  plannedAmount: number
  createdAt: Date
  updatedAt: Date
}

export interface Transaction {
  _id: string
  userId: string
  budgetId: string
  type: Type
  description?: string
  amount: number
  date: Date
  createdAt: Date
  updatedAt: Date
}
