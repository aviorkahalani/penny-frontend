export interface ILink {
  to: string
  label: string
  variant:
    | 'ghost'
    | 'subtle'
    | 'solid'
    | 'outline'
    | 'surface'
    | 'plain'
    | undefined
}

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

export interface Budget {
  _id: string
  userId: string
  name: string
  currency: 'NIS' | 'USD'
  notes?: string
  date: {
    year: number
    month: number
  }
}
