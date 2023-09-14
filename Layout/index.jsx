import React, { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'store/slices/global/user.slice'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import SideBar from './Sidebar'
import NavBar from './NavBar'

const Layout = ({ children }) => {
  const router = useRouter()
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  const { isLoggedIn } = useSelector(selectUser)

  const isVisible = !(router.pathname === '/login' || router.pathname === '/create-account')

  const handleSidebarOpen = useCallback(() => {
    setIsSideBarOpen(true)
  }, [])

  return (
    <Root>
      {/* <CssBaseline /> */}
      {isVisible && (
        <NavBar handleSidebarOpen={handleSidebarOpen} isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />
      )}
      {isVisible && <SideBar isOpen={isSideBarOpen} setIsOpen={setIsSideBarOpen} />}

      {isVisible ? (
        <Main>
          <DrawerHeader />
          {children}
        </Main>
      ) : (
        <>{children}</>
      )}

      {/* <Footer /> */}
    </Root>
  )
}

const Root = styled.div`
  width: 100%;
  display: flex;
  background-color: #fff;
`

const Main = styled.main`
  width: 100%;
  padding: 0px 15px;
  @media (min-width: 508px) {
    padding: 0px 20px;
  }
  @media (min-width: 1268px) {
    margin-top: 60px;
    width: 97%;
    min-height: 800px;
    height: 100%;
  }
`

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 0.5),
  // necessary for content to be below app bar
  '@media (min-width: 1268px)': {
    display: 'none',
  },
  ...theme.mixins.toolbar,
}))

export default Layout
