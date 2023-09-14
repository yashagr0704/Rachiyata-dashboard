import React from 'react'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { AppBar, Button, IconButton, Toolbar, Typography, useMediaQuery } from '@mui/material'
import { laptopS, mobileL, mobileM } from '../../../../styles/mediaQuery/breakPoints'
import Link from 'next/link'
import MenuOpenIcon from '@mui/icons-material/MenuOpen'
const RightSideHeader = ({ handleSidebarOpen }) => {
  const isTabletXSM = useMediaQuery('(min-width:1268px)')
  const router = useRouter()
  const section = router.pathname.split('/')[1]
  const sectionName = section?.charAt(0).toUpperCase() + section.slice(1)

  return (
    <>
      <Root>
        <SubWrapper>
          <IndividualLinkText>{sectionName}</IndividualLinkText>
          <Link href={`/${section}/novel`}>
            <SubSecLinkText className={router.pathname == `/${section}/novel` ? 'subsection' : ''}>
              Novel
            </SubSecLinkText>
          </Link>
          <Link href={`/${section}/poem`}>
            <SubSecLinkText
              className={
                router.pathname == `/${section}/poem` || router.pathname == `/${section}/poem/create_new`
                  ? 'subsection'
                  : ''
              }>
              Poems
            </SubSecLinkText>
          </Link>
          <Link href={`/${section}/shorts`}>
            <SubSecLinkText className={router.pathname == `/${section}/shorts` ? 'subsection' : ''}>
              Shorts
            </SubSecLinkText>
          </Link>
        </SubWrapper>
        {isTabletXSM ? (
          section === 'dashboard' ? (
            <StyledButton>USER GUIDE</StyledButton>
          ) : (
            <StyledButton>Create</StyledButton>
          )
        ) : (
          <StyledSidebarButton
            color="primary"
            onClick={handleSidebarOpen}
            edge="start"
            sx={{
              transition: '.2s ease-in-out',
              paddingBottom: '23px',
            }}>
            <MenuOpenIcon style={{ fontSize: 25 }} />
          </StyledSidebarButton>
        )}
      </Root>
    </>
  )
}

export default RightSideHeader

const Root = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: #ffffffd9;
  box-shadow: 4px 4px 17px #864dff1f;
  z-index: 999;
  padding: 20px 10px 0px 20px;
  backdrop-filter: blur(66px);
  border-bottom: ${({ theme }) => theme.palette.primary.main + 23};
  @media (min-width: 1268px) {
    justify-content: space-evenly;
    position: fixed;
    right: 0;
    width: 82%;
  }
  @media ${laptopS} {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  }
`
const SubWrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: flex-start;
  gap: 25px;
  @media ${mobileM} {
    gap: 40px;
  }
`
export const IndividualLinkText = styled(Typography)`
  font-weight: 600;
  font-size: 19px;
  line-height: 23px;
  color: #424247;
  display: none;
  @media ${mobileM} {
    display: block;
  }
`
export const SubSecLinkText = styled(Button)`
  font-size: 12px;
  line-height: 15px;
  color: #2f2d5c;
  padding-bottom: 18px;
  font-weight: 500;
  border-radius: 0px;
`
export const StyledButton = styled(Button)`
  border: 1.5px solid #673ccb;
  border-radius: 5px;
  line-height: 18px;
  font-size: 15px;
  padding: 7px 16px;
  color: #673ccb;
  margin-bottom: 16px;
`
const StyledSidebarButton = styled(IconButton)``
