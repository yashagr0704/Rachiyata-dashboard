import React from 'react'
import styled from '@emotion/styled'

import { Button, Tooltip, Typography, useMediaQuery } from '@mui/material'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import Link from 'next/link'
import InfoField from './InfoField'

const ContentCard = ({ item, index, deleted }) => {
  const isMobile = useMediaQuery('(max-width: 400px)')

  return (
    <Root>
      <DeignsIcon />
      <Main>
        <Image
          alt="Cover Image"
          src={item?.cover_img && item?.cover_img.includes('http') ? item?.cover_img : '/alt-img.svg'}
        />

        <InfoSection>
          {!isMobile && <InfoField name="Name" text={item?.book_name} />}

          <InfoField name="Chapters" text={item?.chapters} />
          <InfoField name="Words" text={item?.words} />
          <InfoField name="Views" text={item?.view_count} />
          {deleted ? (
            <InfoField name="Deleted at" text={item?.publish_date} />
          ) : (
            <InfoField name="Publish at" text={item?.publish_date} />
          )}
        </InfoSection>

        {!deleted && (
          <Link href={`/workspace/novel/${item?.id}`}>
            <Tooltip title="Edit Book">
              <EditBook variant="contained">
                <CreateOutlinedIcon fontSize="small" />
              </EditBook>
            </Tooltip>
          </Link>
        )}
      </Main>
      {isMobile && (
        <>
          <Space />
          <InfoField name="Name" text={item?.name} />
        </>
      )}
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  padding: 12px;
  border-radius: 16px;
  transition: 0.3s ease-in-out;
  /* cursor: pointer; */
  border: 1px solid transparent;
  border: 1px solid ${({ theme }) => theme.palette.primary.main}18;
  :hover {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.05);
    transform: scale(1.02);
  }
  max-width: 550px;
  overflow: hidden;
  @media (max-width: 800px) {
    max-width: 100%;
  }
  @media (max-width: 400px) {
    padding: 10px;
  }
`

const Main = styled.div`
  display: flex;
  gap: 15px;
  height: 135px;
  @media (max-width: 465px) {
    height: 120px;
  }
`

const Space = styled.div`
  height: 7px;
`

const Image = styled.img`
  object-fit: cover;
  border-radius: 7px;
  aspect-ratio: 350/466.66;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  @media (max-width: 400px) {
    gap: 2px;
  }
  justify-content: space-between;
`

const DeignsIcon = styled(MenuBookOutlinedIcon)`
  color: ${({ theme }) => theme.palette.primary.main}11;
  font-size: 200px;
  position: absolute;
  top: -50px;
  right: -20px;
  transform: rotate(-45deg);
  @media (max-width: 465px) {
    font-size: 150px;
    color: ${({ theme }) => theme.palette.primary.main}09;
  }
`

const EditBook = styled(Button)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0px;
  right: 0px;
  border-radius: 13px;
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  z-index: 10;
  padding: 0px;
  min-width: 34px;
  min-height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.15);
  /* @media (max-width: 400px) {
    min-width: 30px;
    min-height: 30px;
    .MuiSvgIcon-root {
      font-size: 1.2rem;
    }
  } */
`

const EditChapter = styled(Button)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 23px;
  right: 0px;
  border-radius: 13px;
  border-top-left-radius: 0px;
  border-bottom-right-radius: 0px;
  z-index: 10;
  padding: 0px;
  padding-top: 8px;

  min-width: 34px;
  min-height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 7px 10px 1px rgba(0, 0, 0, 0.15);
  /* @media (max-width: 400px) {
    min-width: 30px;
    min-height: 30px;
    .MuiSvgIcon-root {
      font-size: 1.2rem;
    }
  } */
`

const RankingRoot = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.palette.primary.main};
  background: linear-gradient(141deg, rgba(81, 34, 192, 1) 0%, #966afc 100%);
  width: 180px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  padding: 5px 10px;
  width: fit-content;
  height: fit-content;
  bottom: 5px;
  left: 5px;
  @media (max-width: 465px) {
    bottom: 40px;
    border-radius: 9px;

    padding: 5px 6px;
  }
`

const RankingNumber = styled(Typography)`
  color: #fff;
  font-weight: 700;
  font-size: 2.5rem;
  text-align: center;
  letter-spacing: 2px;
  margin-right: -2px;
  line-height: 1;
  @media (max-width: 465px) {
    font-size: 1.9rem;
    margin-bottom: -1px;
    letter-spacing: 2px;
  }
`

const RankingPlaceholder = styled(Typography)`
  display: inline;
  color: #fff;
  -webkit-text-stroke: 1px #fff;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 2.5rem;
  line-height: 1;
  @media (max-width: 465px) {
    font-size: 1.9rem;
  }
`

export default ContentCard
