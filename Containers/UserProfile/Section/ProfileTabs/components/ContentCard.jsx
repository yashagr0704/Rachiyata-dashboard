import React from 'react'
import Link from 'next/link'
import styled from '@emotion/styled'
import { useSelector } from 'react-redux'
import { Button, ButtonBase, Typography } from '@mui/material'

import { selectUser } from 'store/slices/global/user.slice'

import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import { useAddToLibraryAPI } from 'Containers/UserProfile/api/userProfile.hook'

export const cloudinary = '/book_image.jpg'

const ContentCard = ({ item }) => {
  const { handleAddToLibrary } = useAddToLibraryAPI()
  const { isLoggedIn } = useSelector(selectUser)

  return (
    <Root>
      <Main>
        {isLoggedIn ? (
          <AddIcon color="primary" variant="contained" onClick={() => handleAddToLibrary(item.id)}>
            <DeleteOutlineRoundedIcon sx={{ fontSize: 17 }} />
          </AddIcon>
        ) : (
          <></>
        )}

        <Image
          alt="Cover Image"
          src={item?.cover_img && item?.cover_img.includes('http') ? item?.cover_img : '/alt-img.svg'}
        />
        <InfoSection>
          <InfoLeft>
            <TitleName variant="h6">{item?.book_name}</TitleName>
            <CategoryName variant="subtitle2">
              {item?.category?.category?.map(({ name }) => name).join(', ') || 'N/A'}
            </CategoryName>
          </InfoLeft>
          <InfoRight>
            <Rating variant="subtitle2">{Number(item?.rating?.rate__avg).toFixed(1) || 'N/A'}</Rating>
          </InfoRight>
        </InfoSection>
      </Main>

      <Link href={isLoggedIn ? `/book/${item.id}` : `/login`}>
        <a>
          <StyledButton color="primary" />
        </a>
      </Link>
    </Root>
  )
}

export default ContentCard

const Root = styled.div`
  position: relative;
  padding: 8px;
  box-shadow: none;
  border-radius: 14px;
  transition: 0.3s ease-in-out;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.palette.primary.main}18;
  :hover {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.05);
    transform: scale(1.02);
  }
  max-width: 195px;

  @media (max-width: 730px) {
    max-width: auto;
    width: 100%;
  }
`

const StyledButton = styled(ButtonBase)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  border-radius: 13px;
  background-color: transparent;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`

const Image = styled.img`
  width: 100%;
  height: 190px;
  object-fit: cover;
  border-radius: 10px;
`

const InfoSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 4px;
`

const InfoLeft = styled.div`
  display: flex;
  flex-direction: column;
`

const InfoRight = styled.div`
  display: flex;
  flex-direction: column;
`

const TitleName = styled(Typography)`
  font-weight: 700;
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.secondary.main};
`

const CategoryName = styled(Typography)`
  font-weight: 500;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.secondary.main}aa;
`

const Rating = styled(Typography)`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 600;
  font-size: 0.9rem;
`

const AddIcon = styled(Button)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0px;
  right: 0px;
  border-top-right-radius: 13px;
  border-bottom-left-radius: 13px;
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  z-index: 10;
  padding: 0px;
  min-width: 35px;
  min-height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`
