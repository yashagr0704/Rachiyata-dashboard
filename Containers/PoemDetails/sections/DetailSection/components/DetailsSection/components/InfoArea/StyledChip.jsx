import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'

const StyledChip = ({ label, Icon }) => {
  return (
    <Root>
      {Icon && <Icon />}
      <Label variant="subtitle2">{label}</Label>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px 4px 7px;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.primary.main}11;
  .MuiSvgIcon-root {
    font-size: 20px;
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

const Label = styled(Typography)``

export default StyledChip
