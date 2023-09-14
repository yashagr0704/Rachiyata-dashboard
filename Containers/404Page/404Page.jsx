import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { Button, Typography } from '@mui/material'

const ErrorPageComp = () => {
  return (
    <Root>
      <Main>
        <Heading variant="h1">404</Heading>
        <ParagraphText variant="h6">{`OOPS, THE PAGE YOU ARE LOOKING FOR CAN'T BE FOUND!`}</ParagraphText>

        <Link href={`/`}>
          <ReturnHomeButton variant="outlined">Back to home</ReturnHomeButton>
        </Link>
      </Main>
    </Root>
  )
}

const Root = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background-color: #f5f5f5;
`

const Main = styled.div`
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  padding: 15px;
`

const ReturnHomeButton = styled(Button)`
  font-size: 1rem;
  margin-top: 20px;
  font-weight: 600;
  border: 2px solid ${({ theme }) => theme.palette.primary.main};
  :hover {
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: #fff;
  }
`

const ParagraphText = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 500;
  text-align: center;
  @media (max-width: 450px) {
    font-size: 17px;
    line-height: 1.9;
  }
`

const Heading = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main}7a;
  font-weight: 500;
  text-align: center;
`

export default ErrorPageComp
