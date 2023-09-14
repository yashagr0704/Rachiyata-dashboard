import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { NavPageLinks } from 'Layout/config.layout'
import { IconButton, List, Box } from '@mui/material'
import { Toolbar, useTheme, useMediaQuery } from '@mui/material'
import MuiDrawer from '@mui/material/Drawer'
import StyledNavButton from './components/StyledNavButton'

// Icons ---
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import { useCallback } from 'react'
import ProfileButton from './components/ProfileButton'
import LogoBox from './components/LogoBox'
import Background from './components/Background'
import LogoutButton from './components/LogoutButton'
import UserProfileInfo from 'Layout/Header/components/LeftSideHeader/components/UserProfileInfo'
import { IndividualLink, IndividualLinkText, LinkContainer } from 'Layout/Header/components/LeftSideHeader'
import Link from 'next/link'
// ---

const drawerWidth = 240

const SideBar = ({ isOpen, setIsOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery('(max-width: 868px)')
  const isTablet = useMediaQuery('(max-width: 650px)')

  const { pathname } = useRouter()
  const section = pathname.split('/')[2]

  const handleSideBarClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const DrawerProps = {
    onClose: handleSideBarClose,
    open: isOpen,
    isOpen: isOpen,
    variant: isMobile ? 'temporary' : 'permanent',
    anchor: 'left',
    BackdropProps,
  }

  return (
    <Drawer {...DrawerProps} mobile={isMobile}>
      {/* <Background /> */}
      <HeaderBar {...{ isMobile, handleSideBarClose }} />
      <Main open={isOpen}>
        {isOpen && isTablet && <ProfileButton />}
        {NavPageLinks.map((Item, index) => (
          <StyledNavButton key={index} {...Item} Icon={Item.Icon} />
        ))}
        {/* <LinkContainer>
          {NavPageLinks.map((Item, index) => (
            <Link href={Item.link}>
              <IndividualLink
                key={index}
                className={
                  pathname == `/${Item.styleLink}/${section}` ||
                  pathname == `/${Item.styleLink}/${section}/create_new` ||
                  pathname == `/${Item.styleLink}/${section}/new_chapter`
                    ? 'active'
                    : ''
                }>
                <IndividualLinkText>{Item?.label}</IndividualLinkText>
              </IndividualLink>
            </Link>
          ))}
        </LinkContainer> */}
      </Main>
    </Drawer>
  )
}

export default SideBar

const Main = styled(Box)`
  display: flex;
  justify-content: start;
  gap: 15px;
  flex-direction: column;
  width: 100%;
  padding: 10px 10px;
`

const NavButtonWarper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-right: 10px;
  margin-left: 15px;
  margin-top: 15px;
`

const Divider = styled.div`
  margin-top: 13px;
  margin-bottom: 13px;
  height: 2px;
  background: ${({ theme }) => theme.palette.primary.main}1f;
`

const openedMixin = theme => ({
  width: drawerWidth - 10,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme, mobile) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)})`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} )`,
  },
})

const Drawer = styled(MuiDrawer)(({ theme, isOpen, mobile }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  position: mobile ? 'fixed' : 'relative',
  zIndex: mobile ? 12000 : 1000,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
  },
  ...(!mobile &&
    isOpen && {
      ...openedMixin(theme, mobile),
      '& .MuiDrawer-paper': openedMixin(theme, mobile),
    }),
  ...(!mobile &&
    !isOpen && {
      ...closedMixin(theme, mobile),
      '& .MuiDrawer-paper': closedMixin(theme, mobile),
    }),
}))

const BackdropProps = {
  sx: {
    background: 'rgba(0,0,0,0.3)',
    backdropFilter: 'blur(4px)',
  },
}

const HeaderBar = ({ isMobile, handleSideBarClose }) => {
  return (
    <RootHeaderBar>
      <LogoBox />
      <IconButton color="primary" sx={{ marginLeft: 'auto' }} onClick={handleSideBarClose}>
        <ChevronLeftRoundedIcon style={{ fontSize: 40 }} />
      </IconButton>
    </RootHeaderBar>
  )
}
const RootHeaderBar = styled(Toolbar)`
  display: flex;
  align-items: center;
  margin-top: 1px;
  && {
    padding-left: 25px;
    padding-right: 8px;
  }
`
