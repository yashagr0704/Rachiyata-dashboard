import { useRouter } from 'next/router'
import React from 'react'
import { useReadChapterAPI } from '../api/poem.hook'
import EditChapterSection from '../sections/EditChapterSection'

const EditChapterPage = () => {
  const router = useRouter()
  const { Content, isLoading, isError, error, isSuccess } = useReadChapterAPI(
    router?.query?.poemId,
    router?.query?.chapterId,
  )

  return (
    <EditChapterSection poemId={router?.query?.poemId} data={Content} isSuccess={isSuccess} isLoading={isLoading} />
  )
}

export default EditChapterPage
