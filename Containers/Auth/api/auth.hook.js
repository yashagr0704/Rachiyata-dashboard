import { useQuery, useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useDispatch } from 'react-redux'
import { LOGIN_SUCCESS } from '../../../store'
import { setLoginToken, setUserData, setUserLogout } from '../../../store/slices/global/user.slice'
import { createAccountAPI, fetchUserDataAPI, loginAPI } from './auth.api'
import useAuthTokens from '../../../api/global.hook'
import { getFormErrorMessage } from 'hooks/useFormError'

export const useFetchUserDataAPI = (props, work) => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const { data, isFetching, isSuccess, refetch, isError } = useQuery([`user-data-${work}`], fetchUserDataAPI, {
    enabled: false,
    onSuccess({ data }) {
      dispatch(setUserData(data.user))

      dispatch({ type: LOGIN_SUCCESS })

      if (typeof props?.onSuccess === 'function') {
        props.onSuccess(data)
      }

      // enqueueSnackbar(data.message, {
      //   variant: "success",
      // });
    },
    onError: error => {
      if (error.response?.data?.message)
        enqueueSnackbar(error.response?.data?.message, {
          variant: 'error',
        })
    },
  })

  return {
    isLoading: isFetching,
    isSuccess,
    isError,
    refetch,
    status: data?.status,
  }
}

export const useCreateAccountAPI = handleFormError => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const dispatch = useDispatch()

  const { mutate, isLoading, isSuccess } = useMutation(createAccountAPI, {
    onSuccess({ data }) {
      dispatch(setUserData(data.user))
      dispatch(setLoginToken(data.token))
      dispatch({ type: LOGIN_SUCCESS })
      router.push('/otp')
      enqueueSnackbar(data.message, {
        variant: 'success',
      })
    },
    onError: error => {
      enqueueSnackbar(getFormErrorMessage(error), {
        variant: 'error',
      })

      if (error.response?.data?.message)
        enqueueSnackbar(error.response?.data?.message, {
          variant: 'error',
        })
    },
  })

  const handleCreateAccount = mutate

  return { handleCreateAccount, isLoading, isSuccess }
}

export const useLoginAPI = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const dispatch = useDispatch()
  const { setAccess, setRefresh } = useAuthTokens()
  const { mutate, isLoading, isSuccess } = useMutation(loginAPI, {
    onSuccess({ data }) {
      dispatch(setUserData(data?.user))
      dispatch(setLoginToken(data?.user?.tokens))
      setAccess(data?.user?.tokens?.access)
      setRefresh(data?.user?.tokens?.refresh)
      dispatch({ type: LOGIN_SUCCESS })
      router.push('/dashboard/novel')
      // enqueueSnackbar(data?.message, {
      //   variant: 'success',
      // })
    },
    onError: error => {
      enqueueSnackbar(error.response?.data?.user?.error[0], {
        variant: 'error',
      })

      if (error.response?.data?.message)
        enqueueSnackbar(error.response?.data?.message, {
          variant: 'error',
        })
    },
  })

  const handleLogin = mutate

  return { handleLogin, isLoading, isSuccess }
}

export const useLogoutUserAPI = () => {
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLogoutUser = () => {
    dispatch(setUserLogout())
    router.push('/')
    window && window.localStorage.setItem('persist:root', '')
  }

  // const { mutate, isLoading, isSuccess } = useMutation(logoutUserAPI, {
  //   onSuccess({ data }) {
  //     dispatch(setUserLogout())
  //     router.push('/login')
  //     window.localStorage.setItem('persist:root', '')
  //     enqueueSnackbar(data.message, {
  //       variant: 'success',
  //     })
  //   },
  //   onError: error => {
  //     if (error.response?.data?.message)
  //       enqueueSnackbar(error.response?.data?.message, {
  //         variant: 'error',
  //       })
  //   },
  // })

  return { handleLogoutUser }
}
