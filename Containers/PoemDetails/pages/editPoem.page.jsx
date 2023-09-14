import { useRouter } from 'next/router'
import React from 'react'
import { usePoemDetail } from '../api/poem.hook'
import CreateOrEditPoemSection from '../sections/CreateOrEditPoemSection'

const EditPoemPage = () => {
  const router = useRouter()
  const { PoemDetail, isLoading, isSuccess } = usePoemDetail(router.query.id)

  return <CreateOrEditPoemSection editMode data={PoemDetail} isLoading={isLoading} isFetchSuccess={isSuccess} />
}

export default EditPoemPage
