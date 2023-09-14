import { useRouter } from 'next/router'
import React from 'react'
import { useReadChapterAPI } from '../api/novel.hook'
import EditChapterSection from '../sections/EditChapterSection'

const EditChapterPage = () => {
  const router = useRouter()
  const { Content, isLoading, isError, error, isSuccess } = useReadChapterAPI(
    router?.query?.bookId,
    router?.query?.chapterId,
  )

  return (
    <EditChapterSection bookId={router?.query?.bookId} data={Content} isSuccess={isSuccess} isLoading={isLoading} />
  )
}

export default EditChapterPage
