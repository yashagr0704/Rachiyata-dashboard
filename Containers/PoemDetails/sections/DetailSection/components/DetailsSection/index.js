import styled from '@emotion/styled'
import { Skeleton } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import InfoArea from './components/InfoArea'
import TabArea from './components/TabArea'

const DetailsSection = ({ item, isLoading }) => {
  if (isLoading)
    return (
      <LoadingRoot>
        <StyledSkeletonCover variant="rounded" />
        <LoadingInfo>
          <StyledSkeletonInfo variant="rounded" />
          <StyledSkeletonInfo variant="rounded" />
          <StyledSkeletonInfo variant="rounded" />
          <StyledSkeletonInfo variant="rounded" />
          <StyledSkeletonInfo variant="rounded" />
        </LoadingInfo>
      </LoadingRoot>
    )

  return (
    <Root>
      <ImageContainer>
        <StyledImage
          alt="Cover Image"
          src={item?.cover_img && item?.cover_img.includes('http') ? item?.cover_img : '/alt-img.svg'}
        />
        <StyledImage
          className="blur"
          alt="Cover Image"
          src={item?.cover_img && item?.cover_img.includes('http') ? item?.cover_img : '/alt-img.svg'}
        />
      </ImageContainer>

      <InfoSection>
        <InfoArea item={item} />
        <TabArea item={item} />
      </InfoSection>
    </Root>
  )
}

const LoadingRoot = styled.div`
  display: flex;
  gap: 30px 20px;
  width: 100%;

  @media (max-width: 960px) {
    flex-direction: column;
  }
`

const LoadingInfo = styled.div`
  display: flex;
  gap: 20px 20px;
  width: 100%;
  flex-direction: column;
`

const StyledSkeletonCover = styled(Skeleton)`
  min-height: 466px;
  height: 466px;
  max-width: 350px;
  aspect-ratio: 350/466;
  align-self: center;
`

const StyledSkeletonInfo = styled(Skeleton)`
  min-height: 50px;
  max-width: 100%;
`

const Root = styled.div`
  display: flex;
  width: 100%;
  gap: 30px;
  margin-inline: var(--main-side-spacing);
  max-width: var(--main-max-width);
  width: calc(100% - var(--main-side-spacing) * 2);
  align-self: flex-start;
  margin-top: 15px;
  @media (max-width: 960px) {
    flex-direction: column;
    width: 100%;
    gap: 50px;
    padding: 0px 22px;
  }
  @media (max-width: 400px) {
    flex-direction: column;
    width: 100%;
    gap: 50px;
    padding: 0px 10px;
  }
`

const ImageContainer = styled.div`
  display: flex;
  height: 100%;
  position: relative;
  align-self: center;
  @media (max-width: 400px) {
    /* margin-top: 15px; */
  }
`

const StyledImage = styled.img`
  z-index: 2;
  &.blur {
    z-index: 1;
    position: absolute;
    filter: blur(20px) opacity(0.5);
    top: -5px;
    left: 0px;
  }
  max-width: 350px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  aspect-ratio: 350/466;
  @media (max-width: 700px) {
    margin-bottom: 20px;
  }
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`

export default DetailsSection
