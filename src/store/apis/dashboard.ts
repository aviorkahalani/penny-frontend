import { base } from './base'
import type { DashboardData } from '@/interfaces'

export const dashboard = base.injectEndpoints({
  endpoints: (build) => ({
    fetchDashboardData: build.query<DashboardData, string>({
      query: (budgetId) => ({ url: '/dashboard/' + budgetId }),
      providesTags: [{ type: 'Dashboard', id: 'LIST' }],
    }),
  }),
})

export const { useFetchDashboardDataQuery } = dashboard
