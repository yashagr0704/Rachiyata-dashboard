import { useMutation, useQuery } from '@tanstack/react-query'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from 'store/slices/global/user.slice'
import { addContentToLibraryList, selectLibraryList, setLibraryList } from '../slices/library.slice'
import { addToLibraryAPI, fetchLibraryAPI, UpdateUserProfileAPI } from './userProfile.api'

export const useAddToLibraryAPI = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { mutate, isLoading, isSuccess } = useMutation(addToLibraryAPI, {
    onSuccess({ data }) {
      enqueueSnackbar('Book Added to Library !', {
        variant: 'success',
      })
    },
    onError: error => {
      enqueueSnackbar('Request Failed !', {
        variant: 'error',
      })
    },
  })

  const handleAddToLibrary = mutate

  return { mutate, handleAddToLibrary, isLoading, isSuccess }
}

export const useLibraryAPI = () => {
  const [page, setPage] = useState(1)

  const { list, v, previous_page, next_page } = useSelector(selectLibraryList)
  const dispatch = useDispatch()

  const { isLoading, isError, error, isFetching } = useQuery(['library-list', page], () => fetchLibraryAPI(page), {
    onSuccess: ({ data }) => {
      if (v === 0) {
        dispatch(
          setLibraryList({
            list: data?.data,
            // list: data?.resources?.data,
            // next_page: data?.resources?.next_page,
            // previous_page: data?.resources?.previous_page,
          }),
        )
      } else {
        dispatch(
          addContentToLibraryList({
            list: data?.data,
            // list: data?.resources?.data,
            // next_page: data?.resources?.next_page,
            // previous_page: data?.resources?.previous_page,
          }),
        )
      }
    },
  })

  const handleNextPage = () => {
    setPage(next_page)
  }

  const handlePrevPage = () => {
    setPage(previous_page)
  }

  return { ContentList: list, handleNextPage, handlePrevPage, isLoading, isError, error, isFetching }
}

export const useUpdateProfileAPI = () => {
  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useDispatch()

  const { mutate, isLoading, isSuccess } = useMutation(UpdateUserProfileAPI, {
    onSuccess({ data }) {
      enqueueSnackbar('Profile Updated Successfully!', {
        variant: 'success',
      })
      dispatch(setUserData(data?.user))
    },
    onError: error => {
      if (error.response?.data?.message)
        enqueueSnackbar(error.response?.data?.message, {
          variant: 'error',
        })
    },
  })

  const handleUpdateProfile = mutate

  return { handleUpdateProfile, isLoading, isSuccess }
}
