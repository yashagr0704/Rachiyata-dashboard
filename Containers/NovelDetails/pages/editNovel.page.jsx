import { useRouter } from 'next/router'
import React from 'react'
import { useBookDetail } from '../api/novel.hook'
import CreateOrEditNovelSection from '../sections/CreateOrEditNovelSection'

const EditNovelPage = () => {
  const router = useRouter()
  const { BookDetail, isLoading, isSuccess } = useBookDetail(router.query.id)

  return <CreateOrEditNovelSection editMode data={BookDetail} isLoading={isLoading} isFetchSuccess={isSuccess} />
}

export default EditNovelPage
