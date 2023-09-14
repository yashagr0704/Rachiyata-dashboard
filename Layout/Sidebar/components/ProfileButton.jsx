import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectUser } from 'store/slices/global/user.slice'
import { useLogoutUserAPI } from 'Containers/Auth/api/auth.hook'
import { Button } from '@mui/material'

const ProfileButton = () => {
  const { data } = useSelector(selectUser)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const { handleLogoutUser } = useLogoutUserAPI()
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  // <Link href={`/profile/1`}>
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Root sx={{ flexGrow: 0 }} onClick={handleOpenUserMenu}>
        <Avatar variant="rounded" src={data?.profile_pic} />
        <Username>{data.username}</Username>
      </Root>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
        <Link href={`/profile/1`}>
          <MenuItem onClick={handleCloseUserMenu}>
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
        </Link>

        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={handleLogoutUser} textAlign="center">
            Logout
          </Typography>
        </MenuItem>
        {/* {settings.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))} */}
      </Menu>
    </Box>
  )
  // </Link>
}

const Root = styled(Button)`
  margin-right: 10px;
  margin-left: 15px;
  margin-left: 0px;
  margin-bottom: 15px;
  margin-top: 5px;
  width: 100%;
  justify-content: flex-start;
  border-radius: 13px;
  background: ${({ theme }) => theme.palette.primary.main}18;
`

const Username = styled(Typography)`
  color: ${({ theme }) => theme.palette.secondary.main};
  font-weight: 600;
  font-style: 28px;
  margin-left: 10px;
`

export default ProfileButton
