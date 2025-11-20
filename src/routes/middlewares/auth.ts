import { store, auth } from '@/store'
import { redirect } from 'react-router'
import type { MiddlewareFunction } from 'react-router'

export const authMiddleware: MiddlewareFunction = (_, next) => {
  const state = store.getState()
  const { data: user, isUninitialized } = auth.endpoints.fetchMe.select()(state)

  if (!user && !isUninitialized) throw redirect('/login')

  next()
}
