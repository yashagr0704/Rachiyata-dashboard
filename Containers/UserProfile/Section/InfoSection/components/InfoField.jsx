import React from 'react'
import styled from '@emotion/styled'

import { Typography } from '@mui/material'

const InfoField = ({ Icon, text }) => {
  return (
    <Root variant="subtitle2">
      <Icon />
      <span>{text}</span>
    </Root>
  )
}

const Root = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 7px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.main};
  line-height: 1;
  svg {
    font-size: 1.5rem;
  }
  span {
    text-transform: capitalize;
    margin-top: 2px;
    margin-bottom: 2px;
    @media (max-width: 400px) {
      margin-top: 2px;
      margin-bottom: 1px;
    }
  }
`

export default InfoField
