import { redirect } from 'react-router'

export const isAuthenticated = async () => {
  // todo: get user from store
  const user = null

  // redirect to login in case there is no user
  if (!user) throw redirect('/login')

  // continue otherwise
  console.log('isAuthenticated middleware!')
}
