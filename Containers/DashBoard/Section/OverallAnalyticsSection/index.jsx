import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'
import InfoCard from './components/InfoCard'

const List = [
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
]

const OverallAnalyticsSection = ({ Poem }) => {
  return (
    <Root>
      <Heading fontWeight={500} variant="h4" color="secondary">
        Statistics for all {Poem ? 'Poem' : 'Novels'}
      </Heading>
      <Main>
        {List?.map((item, index) => {
          return <InfoCard item={item} key={index} />
        })}
      </Main>
    </Root>
  )
}

const Heading = styled(Typography)`
  @media (max-width: 550px) {
    font-size: 2rem;
  }
  @media (max-width: 385px) {
    font-size: 1.9rem;
  }
  @media (max-width: 375px) {
    font-size: 1.7rem;
  }
`

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1090px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

export default OverallAnalyticsSection
