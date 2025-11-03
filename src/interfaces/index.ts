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
