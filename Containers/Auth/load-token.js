import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LOGIN_SUCCESS } from '../../store'
import { selectUser, setUserLogout } from '../../store/slices/global/user.slice'
import { useFetchUserDataAPI } from './api/auth.hook'

const whiteList = ['/login', '/create-account', '/forgot-password']

const blockListForLoggedIn = ['/login', '/create-account', '/forgot-password']

const LoadToken = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const { isError, refetch, status } = useFetchUserDataAPI()
  const { push, pathname } = useRouter()

  useEffect(() => {
    dispatch({ type: LOGIN_SUCCESS })
  }, [dispatch])

  useEffect(() => {
    if (user.token) {
      refetch()
    }
  }, [refetch, user.token])

  useEffect(() => {
    if (isError && Number(status) === 401) {
      dispatch(setUserLogout())
    }
  }, [dispatch, isError, status])

  useEffect(() => {
    if (!user?.isLoggedIn) {
      if (!(pathname === '/login' || pathname === '/create-account' || pathname === '/forgot-password')) {
        push('/login')
      }
    }
    if (user?.isLoggedIn) {
      blockListForLoggedIn.forEach(path => {
        if (pathname.includes(path)) {
          push('/')
        }
      })
    }
  }, [pathname, push, user?.isLoggedIn])

  return <></>
}

export default LoadToken
