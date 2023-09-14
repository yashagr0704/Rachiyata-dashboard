import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addContentToNovelChapterList,
  selectNovelChapterList,
  setNovelChapterList,
} from '../slices/NovelChapterList.slice'
import {
  addContentToWorkspaceNovelList,
  selectWorkspaceNovelList,
  setWorkspaceNovelList,
} from '../slices/NovelList.slice'
import {
  checkBookNameAPI,
  createOrUpdateNovelAPI,
  createOrUpdateNovelChapterAPI,
  deleteBookDetail,
  deleteChapterAPI,
  fetchBookDetail,
  fetchCategoryAPI,
  fetchChapterAPI,
  fetchChapterListAPI,
  fetchMyBookListAPI,
} from './novel.api'

export const useMyNovelList = (filter, disabled) => {
  const [page, setPage] = useState(1)

  const { all, published, trash, draft } = useSelector(selectWorkspaceNovelList)
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
    ['WorkspaceNovel-list', page, filter],
    () => fetchMyBookListAPI(page, filter),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        if (data?.resources?.previous_page === null || page === 1) {
          dispatch(
            setWorkspaceNovelList({
              tab: filter,
              list: data?.resources?.data,
              next_page: data?.resources?.next_page,
              previous_page: data?.resources?.previous_page,
            }),
          )
        } else if (data?.resources?.previous_page !== previous_page) {
          dispatch(
            addContentToWorkspaceNovelList({
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

export const useCheckBookName = (bookName, previousName) => {
  const { enqueueSnackbar } = useSnackbar()

  const { isLoading, isError, isSuccess, data, refetch } = useQuery(
    ['check-book-name', bookName],
    () => checkBookNameAPI(bookName),
    {
      enabled: Boolean(bookName) && previousName !== bookName,
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
    isTaken: data?.data?.msg.includes('already') && previousName !== bookName,
    isLoading,
    isSuccess,
    isError,
    data,
    refetch,
  }
}

export const useCreateOrUpdateNovelAPI = (editMode, bookId) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()
  const { refetch } = useBookDetail(bookId, true)

  const { mutate, isLoading, isSuccess } = useMutation(createOrUpdateNovelAPI, {
    onSuccess({ data }, variables) {
      enqueueSnackbar('Novel Update Successfully!', {
        variant: 'success',
      })

      if (editMode) {
        refetch()
        push(`/workspace/novel/${variables?.bookId}`)
      } else push(`/workspace/novel`)
    },
    onError: error => {
      enqueueSnackbar('Some thing want wrong', {
        variant: 'error',
      })
    },
  })

  const handleSubmitNovel = mutate

  return { handleSubmitNovel, isLoading, isSuccess }
}

export const useDeleteNovelAPI = bookId => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()
  const { refetch } = useMyNovelList('', true)

  const { mutate, isLoading, isSuccess } = useMutation(() => deleteBookDetail(bookId), {
    onSuccess({ data }) {
      refetch()
      enqueueSnackbar('Novel Deleted Successfully!', {
        variant: 'success',
      })

      push(`/workspace/novel`)
    },
    onError: error => {
      enqueueSnackbar('Some thing want wrong', {
        variant: 'error',
      })
    },
  })

  const handleDeleteNovel = mutate

  return { handleDeleteNovel, isLoading, isSuccess }
}

export const useBookDetail = bookId => {
  const { data, isLoading, isError, error, isFetching, refetch, isSuccess } = useQuery(
    ['book-details', String(bookId)],
    () => fetchBookDetail(bookId),
    {
      enabled: false,
      onSuccess({ data }) {},
    },
  )

  useEffect(() => {
    if (bookId) refetch()
  }, [bookId, refetch])

  return { BookDetail: data?.data?.data[0], isLoading, isError, error, isFetching, refetch, isSuccess }
}

export const useChapterList = (bookId, disabled, filter) => {
  const [page, setPage] = useState(1)

  const { all, published, trash, draft } = useSelector(selectNovelChapterList)
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
    ['NovelChapterList-list', String(page), String(bookId), filter],
    () => fetchChapterListAPI(bookId, page, filter),
    {
      // enabled: Boolean(!!bookId && page && !disabled),
      enabled: false,
      onSuccess: ({ data }) => {
        if (data?.resources?.previous_page === null) {
          dispatch(
            setNovelChapterList({
              tab: filter,
              list: data?.resources?.data,
              next_page: data?.resources?.next_page,
              previous_page: data?.resources?.previous_page,
            }),
          )
        } else {
          dispatch(
            addContentToNovelChapterList({
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
    if (bookId) refetch()
  }, [bookId, filter, page, refetch])

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

export const useDeleteChapterAPI = (bookId, chapterId, seOpen, refetch) => {
  const { enqueueSnackbar } = useSnackbar()
  const { push } = useRouter()

  const { mutate, isLoading, isSuccess } = useMutation(() => deleteChapterAPI(bookId, chapterId), {
    onSuccess({ data }) {
      if (seOpen) seOpen(false)
      if (refetch) refetch()

      enqueueSnackbar('Novel Deleted Successfully!', {
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

export const useReadChapterAPI = (bookId, chapterId, disabled) => {
  const { data, isLoading, isError, error, isFetching, isSuccess, refetch } = useQuery(
    ['NovelChapter', String(bookId), String(chapterId)],
    () => fetchChapterAPI(bookId, chapterId),
    {
      enabled: Boolean(!!bookId && !!chapterId && !disabled),
      onSuccess: ({ data }) => {},
    },
  )

  return { Content: data?.data?.data[0], isLoading, isError, isSuccess, error, isFetching, refetch }
}

export const useCreateOrUpdateNovelChapterAPI = (bookId, setOpen, chapterId, refetch) => {
  // const { refetch:refetchChapterList } = useChapterList(bookId, true)
  const { enqueueSnackbar } = useSnackbar()

  const { mutate, isLoading, isSuccess } = useMutation(createOrUpdateNovelChapterAPI, {
    onSuccess({ data }) {
      if (bookId && chapterId) {
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
