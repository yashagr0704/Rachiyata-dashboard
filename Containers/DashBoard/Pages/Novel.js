import React from 'react'
import { Box } from '@mui/material'
import styled from '@emotion/styled'
import OverallAnalyticsSection from '../Section/OverallAnalyticsSection'
import NovelSection from '../Section/NovelSection'

const DashBoardNovelMainContent = () => {
  return (
    <Root>
      <OverallAnalyticsSection />
      <NovelSection />
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
  @media (min-width: 1268px) {
    padding-top: 35px;
  }
`

export default DashBoardNovelMainContent
