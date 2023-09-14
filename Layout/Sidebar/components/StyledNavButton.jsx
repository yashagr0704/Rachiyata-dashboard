import Link from 'next/link'
import React from 'react'
import styled from '@emotion/styled'

import { Button } from '@mui/material'
import { useRouter } from 'next/router'

const StyledNavButton = ({ Icon, label, link, path }) => {
  const router = useRouter()

  return (
    <Link href={link}>
      <a>
        <Root className={router.pathname.includes(path) && 'selected'} startIcon={<Icon style={IconStyle} />}>
          {label}
        </Root>
      </a>
    </Link>
  )
}

const IconStyle = {}

const Root = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: 12px;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 6px 16px;
  min-width: 100%;
  font-weight: 500;
  /* box-shadow: 3px 3px 10px -0.5px ${({ theme }) => theme.palette.primary.main}30; */
  color: #000000cb;
  border-radius: 8px;
  transition: box-shadow 0.35s ease-in-out;
  text-transform: capitalize;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.palette.secondary.main};
  &:hover {
    background: ${({ theme }) => theme.palette.primary.main}01;
    color: ${({ theme }) => theme.palette.secondary.main};
    box-shadow: 4px 2px 12px 0px ${({ theme }) => theme.palette.primary.main}36;
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

export default StyledNavButton
