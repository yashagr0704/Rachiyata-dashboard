import { Box, Button, Skeleton, Typography } from '@mui/material'
import React from 'react'
import styled from '@emotion/styled'
import { laptop } from 'styles/mediaQuery/breakPoints'
import DetailsSection from './components/DetailsSection'
import ChapterList from './components/ChapterList'
import { useRouter } from 'next/router'
import { useBookDetail } from 'Containers/NovelDetails/api/novel.hook'

const DetailSection = () => {
  const router = useRouter()
  const { BookDetail, isLoading, isError, error } = useBookDetail(router.query?.id)

  return (
    <Root>
      <Main>
        <DetailsSection isLoading={isLoading} item={BookDetail} />
        <ChapterList item={BookDetail} />
      </Main>
    </Root>
  )
}

export default DetailSection

const Root = styled.div`
  width: 100%;
  /* height: 93vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  @media ${laptop} {
    padding-top: 60px;
    width: 100%;
  }
`
const Main = styled.div`
  width: 100%;
  height: 89%;
  display: flex;
  flex-direction: column;
  padding: 20px 25px;
  max-width: 1250px;
  border-radius: 12px;
  justify-content: center;
  align-items: flex-start;
  background-color: #f6f3ff;
  @media (max-width: 720px) {
    padding: 10px 0px;
    margin-top: 10px;
    background-color: transparent;
  }
`
