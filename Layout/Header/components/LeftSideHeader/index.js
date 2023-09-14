import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { NavPageLinks } from '../../../config.layout'
import { IconButton, List, Drawer, Box, Typography } from '@mui/material'
import { Toolbar, useTheme, useMediaQuery } from '@mui/material'
import { useCallback } from 'react'
import Background from '../../../Sidebar/components/Background'
import { laptopS } from 'styles/mediaQuery/breakPoints'
import UserProfileInfo from './components/UserProfileInfo'
import Link from 'next/link'

const LeftSideHeader = ({ isOpen, setIsOpen }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { pathname, asPath } = useRouter()
  const router = useRouter()
  const { edit } = router.query
  const section = pathname.split('/')[2]
  const main = pathname.split('/')[1]

  const handleSideBarClose = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const DrawerProps = {
    onClose: handleSideBarClose,
    open: isOpen,
    variant: 'permanent',
    anchor: 'Right',
    BackdropProps,
    sx: DrawerSx(isMobile, pathname),
  }

  return (
    <Drawer {...DrawerProps}>
      <Background />

      <Main>
        <UserProfileInfo />
        <LinkContainer>
          <Link href={`/dashboard/novel`}>
            <IndividualLink
              className={
                pathname == `/dashboard/${section}` ||
                pathname == `/dashboard/${section}/create_new` ||
                pathname == `/dashboard/${section}/new_chapter`
                  ? 'active'
                  : ''
              }>
              <IndividualLinkText>Dashboard</IndividualLinkText>
            </IndividualLink>
          </Link>
          <Link href={`/workspace/novel`}>
            <IndividualLink
              className={pathname == `/workspace/${section}` || asPath == `/workspace/edit/${edit}` ? 'active' : ''}>
              <IndividualLinkText>Workspace</IndividualLinkText>
            </IndividualLink>
          </Link>
          <Link href={`/income`}>
            <IndividualLink className={pathname == `/income/${section}` ? 'active' : ''}>
              <IndividualLinkText>Income</IndividualLinkText>
            </IndividualLink>
          </Link>
        </LinkContainer>
      </Main>
    </Drawer>
  )
}

export default LeftSideHeader

const Main = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  gap: 35px;
  flex-direction: column;
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.1);
  padding-top: 50px;
`

const DrawerSx = (isMobile, pathname) => {
  return {
    flexShrink: 0,
    position: 'relative',
    [`& .MuiDrawer-paper`]: {
      width: '18%',
      boxSizing: 'border-box',
      boxShadow: '4px 4px 17px #864dff1f',
      backdropFilter: 'blur(40px)',
      background: '#ffffffd6',
      borderWidth: '0px',
      overflow: 'hidden',
      display: 'none',
      '@media (min-width : 1268px)': {
        width: '18%',
        display: 'block',
      },
    },
  }
}

const BackdropProps = {
  sx: {
    background: 'rgba(0,0,0,0.3)',
    backdropFilter: 'blur(4px)',
  },
}

export const LinkContainer = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: flex-start;
  flex-direction: column;
  gap: 13px;
  width: 100%;
  height: 50%;
  cursor: pointer;
`
export const IndividualLink = styled(Box)`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 17px;
  width: 100%;
  padding: 10px 0px 10px 50px;
  border-left: 5px solid white;
  &.active {
    border-color: #673ccb;
    background-color: #f6f3ff;
  }
`
export const IndividualLinkText = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  color: #424247;
`
