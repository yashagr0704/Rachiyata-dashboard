import React from 'react'
import styled from '@emotion/styled'
import { ButtonBase, Typography } from '@mui/material'

import PaidRoundedIcon from '@mui/icons-material/PaidRounded'
import { useRouter } from 'next/router'

const ChapterBar = ({ ChapterNumber, text, paid, chapterId }) => {
  const { query } = useRouter()

  return (
    <StyledA target="_blank" href={`/poem/${query.poemId}/read/${chapterId}`} rel="noreferrer">
      <Root>
        <ChapterText variant="subtitle1">
          Chapter {ChapterNumber}: {text}
        </ChapterText>
        {paid && <InfoChip />}
      </Root>
    </StyledA>
  )
}

const StyledA = styled.a`
  cursor: pointer;
  :nth-of-type(odd) > * {
    color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.primary.main}10;
  }
`

const Root = styled(ButtonBase)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3px 9px;
  font-weight: 500;
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.secondary.main};
  /* :nth-of-type(odd) {
    color: ${({ theme }) => theme.palette.primary.main};
    background: ${({ theme }) => theme.palette.primary.main}10;
  } */
`
const ChapterText = styled(Typography)``

const InfoChip = styled(PaidRoundedIcon)`
  color: ${({ theme }) => theme.palette.primary.main};
  margin-left: auto;
`

export default ChapterBar
