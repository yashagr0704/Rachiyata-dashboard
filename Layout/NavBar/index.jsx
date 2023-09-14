import * as React from 'react'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useMediaQuery } from '@mui/material'
import TabSection from './TabSection'
import LogoBox from './components/LogoBox'
import ProfileButton from 'Layout/Sidebar/components/ProfileButton'
const drawerWidth = 240

export default function NavBar({ handleSidebarOpen, isOpen, setIsOpen }) {
  const isMobile = useMediaQuery('(max-width: 868px)')
  const isTablet = useMediaQuery('(min-width: 650px)')

  const handleDrawerOpen = () => {
    setIsOpen(true)
  }

  return (
    <AppBar position="fixed" open={isOpen} is_mobile={String(isMobile)} color="inherit">
      <Toolbar>
        {!isOpen && (
          <HidableView open={isOpen}>
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 2,
              }}>
              <MenuIcon />
            </IconButton>
            {!isMobile && <LogoBox />}
          </HidableView>
        )}

        <TabSection />

        {isTablet && (
          <ProfileWrapper>
            <ProfileButton />
          </ProfileWrapper>
        )}
      </Toolbar>
    </AppBar>
  )
}

const ProfileWrapper = styled('div')({
  marginLeft: 'auto',
  marginBottom: -8,
})

const HidableView = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(3),
  '@media (max-width: 868px)': {
    marginRight: theme.spacing(0),
  },
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open, is_mobile }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: '#fff',

  //   width: `100%`,
  boxShadow: 'none',
  borderBottom: '1px solid ' + theme.palette.divider,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(!is_mobile === 'true' &&
    open && {
      marginLeft: drawerWidth - 10,
      width: `calc(100% - ${drawerWidth - 10}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
}))
