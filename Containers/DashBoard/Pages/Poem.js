import React from 'react'
import styled from '@emotion/styled'
import OverallAnalyticsSection from '../Section/OverallAnalyticsSection'
import PoemSection from '../Section/PoemSection'

const DashBoardPoemMainContent = () => {
  return (
    <Root>
      <OverallAnalyticsSection Poem />
      <PoemSection />
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

export default DashBoardPoemMainContent
