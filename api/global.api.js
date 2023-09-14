import axios from 'axios'

import { MutationCache, QueryCache } from '@tanstack/react-query'
import { authTokenHandles } from './global.hook'

const API_URL = 'https://rachayitha.com/api/v1/'

export const ApiInstance = axios.create({
  baseURL: `${API_URL}`,
})

export const silentRenewalAPI = data => {
  return ApiInstance({
    url: '/token/refresh/',
    method: 'POST',
    data,
  })
}

const handleLogout = () => {
  window.localStorage.clear()
  window.location.replace('/login')
}

const handleToken = res => {
  const { setAccess, setRefresh } = authTokenHandles()

  setRefresh(res.data.refresh)
  setAccess(res.data.access)
  setAuthToken(res.data.access)
}

export const mutationCache = new MutationCache({
  onError: async (error, variables, context, mutation) => {
    if (error?.response?.status === 401) {
      try {
        const { getRefresh } = authTokenHandles()

        const res = await silentRenewalAPI({ refresh: getRefresh })

        if (res.status === 200) {
          handleToken(res)

          mutation.execute()

          enqueueSnackbar('Token has been updated  mutation!', {
            variant: 'success',
          })
        }
      } catch (error) {
        if (error?.response?.data?.status === 401) handleLogout()
      }
    }
  },
})

export const queryCache = new QueryCache({
  onError: async (error, query) => {
    if (error?.response?.status === 401) {
      try {
        const { getRefresh } = authTokenHandles()

        const res = await silentRenewalAPI({ refresh: getRefresh })

        if (res.status === 200) {
          handleToken(res)

          query.fetch()

          enqueueSnackbar('Token has been updated !', {
            variant: 'success',
          })
        }
      } catch (error) {
        if (error?.response?.data?.status === 401) handleLogout()
      }
    }
  },
})

export function setAuthToken(token) {
  const AUTHORIZATION = 'Authorization'

  const instances = [axios, ApiInstance]

  instances.forEach(item => {
    item.defaults.headers.common[AUTHORIZATION] = token && `Bearer ${token}`
  })

  instances.forEach(item => {
    if (item === 'instance') {
      item.interceptors.request.use(
        config => {
          return config
        },
        error => {
          return Promise.reject(error)
        },
      )
      item.interceptors.response.use(
        config => {
          return config
        },
        error => {
          return Promise.reject(error)
        },
      )
    }
  })
}
