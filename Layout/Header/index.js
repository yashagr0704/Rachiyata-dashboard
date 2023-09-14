import styled from '@emotion/styled'
import { Box } from '@mui/material'
import LeftSideHeader from './components/LeftSideHeader'

import React from 'react'
import RightSideHeader from './components/RightSideHeader'

const Header = ({ isOpen, setIsOpen, handleSidebarOpen }) => {
  return (
    <>
      <Root>
        {/* <LeftSideHeader isOpen={isOpen} setIsOpen={setIsOpen} /> */}
        <RightSideHeader handleSidebarOpen={handleSidebarOpen} />
      </Root>
    </>
  )
}

export default Header

export const Root = styled(Box)`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: start;
  align-items: flex-start;
`
