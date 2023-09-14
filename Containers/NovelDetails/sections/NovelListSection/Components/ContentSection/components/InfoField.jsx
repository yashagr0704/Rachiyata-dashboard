import React from 'react'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'

const InfoField = ({ name, text }) => {
  return (
    <Root>
      <FieldName variant="subtitle2" color="secondary">
        {name}:
      </FieldName>
      <FieldText variant="subtitle2">{text}</FieldText>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const FieldName = styled(Typography)`
  font-weight: 600;
`

const FieldText = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main}e8;
`

export default InfoField
