import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React from 'react'
export const ProfileImg = 'https://res.cloudinary.com/dk6twrko6/image/upload/v1667568485/Ellipse_252_vypxjo.png'
const UserProfileInfo = () => {
  return (
    <>
      <UserProfileWrapper>
        <ImgComp src={ProfileImg} />
        <Username>Utkarsh Kumar Singh</Username>
      </UserProfileWrapper>
    </>
  )
}

export default UserProfileInfo

export const Username = styled(Typography)`
  color: black;
  font-weight: 600;
  font-size: 18px;
  line-height: 21px;
  @media (min-width: 700px) {
    margin-top: 20px;
  }
`

export const UserProfileWrapper = styled(Box)`
  width: 100%;
  height: 230px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 15px;
`
export const ImgComp = styled.img`
  border: 3px solid #7f5cc7;
  border-radius: 1240px;
`
