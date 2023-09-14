import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'
import AccordionBox from './components/AccordionBox'

const List = [1, 2, 3, 4]

const NovelSection = () => {
  const [expanded, setExpanded] = React.useState(0)

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }
  return (
    <Root>
      {List?.map((item, index) => {
        return <AccordionBox key={index} isExpanded={expanded === item} onChange={handleChange(item)} />
      })}
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

export default NovelSection
