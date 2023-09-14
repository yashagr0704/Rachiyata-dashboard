import React from 'react'
import styled from '@emotion/styled'
import { Button, Menu, MenuItem } from '@mui/material'

import FlagRoundedIcon from '@mui/icons-material/FlagRounded'
import Grid4x4RoundedIcon from '@mui/icons-material/Grid4x4Rounded'

const MoreOptions = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        variant="contained"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}>
        <Grid4x4RoundedIcon />
      </Button>

      <StyledMenu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        <StyledButton color="secondary" startIcon={<FlagRoundedIcon />}>
          Report
        </StyledButton>
      </StyledMenu>
    </>
  )
}

const StyledMenu = styled(Menu)`
  // custom styles for mui menu
  .MuiMenu-paper {
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  .MuiList-padding {
    padding: 0;
  }

  .MuiMenuItem-root {
    padding: 0;
  }

  .MuiButtonBase-root {
    width: 100%;
    border-radius: 0;
    padding: 8px 16px;
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.secondary.main};
    text-transform: capitalize;
    &:hover {
      background: ${({ theme }) => theme.palette.primary.main}11;
    }
  }

  .MuiButton-startIcon {
    margin-right: 8px;
  }

  .MuiSvgIcon-root {
    font-size: 1.2rem;
  }
`

const StyledButton = styled(Button)``

export default MoreOptions
