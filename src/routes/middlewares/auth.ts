import { store, auth } from '@/store'
import { redirect } from 'react-router'
import type { MiddlewareFunction } from 'react-router'

export const authMiddleware: MiddlewareFunction = (_, next) => {
  const state = store.getState()
  const { data: user } = auth.endpoints.fetchMe.select()(state)

  if (!user) throw redirect('/login')

  next()
}
