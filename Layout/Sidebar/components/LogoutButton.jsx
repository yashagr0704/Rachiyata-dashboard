import styled from '@emotion/styled'
import React from 'react'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Button } from '@mui/material'

const LogoutButton = () => {
  return <Root startIcon={<LogoutOutlinedIcon style={IconStyle} />}>Logout</Root>
}

const IconStyle = {}

const Root = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: 12px;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 6px 20px;

  /* box-shadow: 3px 3px 10px -0.5px ${({ theme }) => theme.palette.primary.main}30; */
  color: #000000cb;
  border-radius: 8px;
  transition: box-shadow 0.35s ease-in-out;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.main}01;
    color: ${({ theme }) => theme.palette.error.main};
    box-shadow: 4px 2px 12px 0px ${({ theme }) => theme.palette.common.black}36;
    /* background: ${({ theme }) => theme.palette.primary.main}1f; */
    backdrop-filter: blur(5px);
  }
  .MuiButton-startIcon {
    margin-right: 4x;
    margin-left: -4px;
  }
  .MuiButton-endIcon {
    margin-right: -4px;
    margin-left: 4px;
  }
  &.selected {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`

export default LogoutButton
