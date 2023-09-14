import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addContentToPoemChapterList, selectPoemChapterList, setPoemChapterList } from '../slices/PoemChapterList.slice'
import { addContentToWorkspacePoemList, selectWorkspacePoemList, setWorkspacePoemList } from '../slices/PoemList.slice'
import {
  checkPoemNameAPI,
  createOrUpdatePoemAPI,
  createOrUpdatePoemChapterAPI,
  deletePoemDetail,
  deleteChapterAPI,
  fetchPoemDetail,
  fetchCategoryAPI,
  fetchChapterAPI,
  fetchChapterListAPI,
  fetchMyPoemListAPI,
} from './poem.api'

export const useMyPoemList = (filter, disabled) => {
  const [page, setPage] = useState(1)

  const { all, published, trash, draft } = useSelector(selectWorkspacePoemList)
  const { list, v, previous_page, next_page } =
    filter === 'all'
      ? all
      : filter === 'published'
      ? published
      : filter === 'draft'
      ? draft
      : filter === 'trash'
      ? trash
      : {}

  const dispatch = useDispatch()

  const { isLoading, isError, error, isFetching, refetch, remove } = useQuery(
    ['WorkspacePoem-list', page, filter],
    () => fetchMyPoemListAPI(page, filter),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        if (data?.resources?.previous_page === null || page === 1) {
          dispatch(
            setWorkspacePoemList({
              tab: filter,
              list: data?.resources?.data,
              next_page: data?.resources?.next_page,
              previous_page: data?.resources?.previous_page,
            }),
          )
        } else if (data?.resources?.previous_page !== previous_page) {
          dispatch(
            addContentToWorkspacePoemList({
              tab: filter,
              list: data?.resources?.data,
              next_page: data?.resources?.next_page,
              previous_page: data?.resources?.previous_page,
            }),
          )
        }
      },
    },
  )

  useEffect(() => {
    refetch()
  }, [filter, page, refetch])

  const handleResetPage = useCallback(() => {
    setPage(1)
  }, [setPage])

  const handleNextPage = useCallback(() => {
    setPage(next_page)
  }, [setPage, next_page])

  const handlePrevPage = useCallback(() => {
    setPage(previous_page)
  }, [setPage, previous_page])

  return {
    isLoading,
    ContentList: list,
    handleNextPage,
    handlePrevPage,
    next_page,
    isError,
    error,
    isFetching,
    refetch,
    handleResetPage,
  }
}

export const useCategoryDropdown = () => {
  const { enqueueSnackbar } = useSnackbar()

  const _dropdownMapping = item => ({
    label: item.category_name,
    value: item.id,
  })

  const { isLoading, isError, isSuccess, data, refetch } = useQuery(['Category-List'], fetchCategoryAPI, {
    onError() {
      enqueueSnackbar('Failed to fetch category !', {
        variant: 'error',
      })
    },
  })

  return { dropdown: data?.data?.data?.map(_dropdownMapping) || [], isLoading, isSuccess, isError, data, refetch }
}

export const useCheckPoemName = (poemName, previousName) => {
  const { enqueueSnackbar } = useSnackbar()

  const { isLoading, isError, isSuccess, data, refetch } = useQuery(
    ['check-poem-name', poemName],
    () => checkPoemNameAPI(poemName),
    {
      enabled: Boolean(poemName) && previousName !== poemName,
      onSuccess({ data }) {
        // if (data?.msg.includes('already')) {
        //   enqueueSnackbar(data.msg, {
        //     variant: 'error',
        //   })
        // } else
        //   enqueueSnackbar(data.msg, {
        //     variant: 'success',
        //   })
      },
      onError() {
        enqueueSnackbar('Failed to fetch category !', {
          variant: 'error',
        })
      },
    },
  )

  return {
    message: data?.data?.msg || '',
    isTaken: data?.data?.msg.includes('already') && previousName !== poemName,
    isLoading,
    isSuccess,
    isError,
    data,
    refetch,
  }
}

export const useCreateOrUpdatePoemAPI = (editMode, poemId) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()
  const { refetch } = usePoemDetail(poemId, true)

  const { mutate, isLoading, isSuccess } = useMutation(createOrUpdatePoemAPI, {
    onSuccess({ data }, variables) {
      enqueueSnackbar('Poem Update Successfully!', {
        variant: 'success',
      })

      if (editMode) {
        refetch()
        push(`/workspace/poem/${variables?.poemId}`)
      } else push(`/workspace/poem`)
    },
    onError: error => {
      enqueueSnackbar('Some thing want wrong', {
        variant: 'error',
      })
    },
  })

  const handleSubmitPoem = mutate

  return { handleSubmitPoem, isLoading, isSuccess }
}

export const useDeletePoemAPI = poemId => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()
  const { refetch } = useMyPoemList('', true)

  const { mutate, isLoading, isSuccess } = useMutation(() => deletePoemDetail(poemId), {
    onSuccess({ data }) {
      refetch()
      enqueueSnackbar('Poem Deleted Successfully!', {
        variant: 'success',
      })

      push(`/workspace/poem`)
    },
    onError: error => {
      enqueueSnackbar('Some thing want wrong', {
        variant: 'error',
      })
    },
  })

  const handleDeletePoem = mutate

  return { handleDeletePoem, isLoading, isSuccess }
}

export const usePoemDetail = poemId => {
  const { data, isLoading, isError, error, isFetching, refetch, isSuccess } = useQuery(
    ['poem-details', String(poemId)],
    () => fetchPoemDetail(poemId),
    {
      enabled: false,
      onSuccess({ data }) {},
    },
  )

  useEffect(() => {
    if (poemId) refetch()
  }, [poemId, refetch])

  return { PoemDetail: data?.data?.data[0], isLoading, isError, error, isFetching, refetch, isSuccess }
}

export const useChapterList = (poemId, disabled, filter) => {
  const [page, setPage] = useState(1)

  const { all, published, trash, draft } = useSelector(selectPoemChapterList)
  const { list, v, previous_page, next_page } =
    filter === 'all'
      ? all
      : filter === 'published'
      ? published
      : filter === 'draft'
      ? draft
      : filter === 'trash'
      ? trash
      : {}
  const dispatch = useDispatch()

  const { isLoading, isError, error, isFetching, refetch } = useQuery(
    ['PoemChapterList-list', String(page), String(poemId), filter],
    () => fetchChapterListAPI(poemId, page, filter),
    {
      // enabled: Boolean(!!poemId && page && !disabled),
      enabled: false,
      onSuccess: ({ data }) => {
        if (data?.resources?.previous_page === null) {
          dispatch(
            setPoemChapterList({
              tab: filter,
              list: data?.resources?.data,
              next_page: data?.resources?.next_page,
              previous_page: data?.resources?.previous_page,
            }),
          )
        } else {
          dispatch(
            addContentToPoemChapterList({
              tab: filter,
              list: data?.resources?.data,
              next_page: data?.resources?.next_page,
              previous_page: data?.resources?.previous_page,
            }),
          )
        }
      },
    },
  )

  useEffect(() => {
    if (poemId) refetch()
  }, [poemId, filter, page, refetch])

  const handleResetPage = useCallback(() => {
    setPage(1)
  }, [setPage])

  const handleNextPage = useCallback(() => {
    setPage(next_page)
  }, [setPage, next_page])

  const handlePrevPage = useCallback(() => {
    setPage(previous_page)
  }, [setPage, previous_page])

  return {
    ContentList: list || [],
    handleNextPage,
    handlePrevPage,
    handleResetPage,
    next_page,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  }
}

export const useDeleteChapterAPI = (poemId, chapterId, seOpen, refetch) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()

  const { mutate, isLoading, isSuccess } = useMutation(() => deleteChapterAPI(poemId, chapterId), {
    onSuccess({ data }) {
      if (seOpen) seOpen(false)
      if (refetch) refetch()

      enqueueSnackbar('Poem Deleted Successfully!', {
        variant: 'success',
      })
    },
    onError: error => {
      enqueueSnackbar('Some thing want wrong', {
        variant: 'error',
      })
    },
  })

  const handleDeleteChapter = mutate

  return { handleDeleteChapter, isLoading, isSuccess }
}

export const useReadChapterAPI = (poemId, chapterId, disabled) => {
  const { data, isLoading, isError, error, isFetching, isSuccess, refetch } = useQuery(
    ['PoemChapter', String(poemId), String(chapterId)],
    () => fetchChapterAPI(poemId, chapterId),
    {
      enabled: Boolean(!!poemId && !!chapterId && !disabled),
      onSuccess: ({ data }) => {},
    },
  )

  return { Content: data?.data?.data[0], isLoading, isError, isSuccess, error, isFetching, refetch }
}

export const useCreateOrUpdatePoemChapterAPI = (poemId, setOpen, chapterId, refetch) => {
  // const { refetch:refetchChapterList } = useChapterList(poemId, true)
  const { enqueueSnackbar } = useSnackbar()

  const { mutate, isLoading, isSuccess } = useMutation(createOrUpdatePoemChapterAPI, {
    onSuccess({ data }) {
      if (poemId && chapterId) {
        // readRefetch()
      } else {
        refetch()
        enqueueSnackbar('Chapter Created Successfully!', {
          variant: 'success',
        })
      }
      // refetchChapterList()
      if (setOpen) setOpen(false)
      if (refetch) refetch(false)
    },
    onError: error => {
      enqueueSnackbar('Some thing want wrong', {
        variant: 'error',
      })
    },
  })

  const handleSubmitChapter = mutate

  return { handleSubmitChapter, isLoading, isSuccess }
}
