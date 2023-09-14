import styled from '@emotion/styled'
import ContentCard from './components/ContentCard'

import { Button, Skeleton, Typography } from '@mui/material'

const ContentSection = ({ SelectedFilter, ContentList, isLoading, handleNextPage, next_page }) => {
  return (
    <Root>
      {ContentList?.length === 0 && !isLoading ? (
        <NotAvailableBar />
      ) : (
        ContentList?.map((item, index) => (
          <ContentCard deleted={SelectedFilter === 'trash'} key={index} item={item} index={index} />
        ))
      )}
      {next_page && !isLoading && <LoadMoreButton onClick={handleNextPage}>Show More</LoadMoreButton>}
      {isLoading && (
        <LoadingRoot>
          <StyledSkeleton variant="rounded" />
          <StyledSkeleton variant="rounded" />
          <StyledSkeleton variant="rounded" />
          <StyledSkeleton variant="rounded" />
          <StyledSkeleton variant="rounded" />
        </LoadingRoot>
      )}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 10px;
  width: 100%;
  /* padding-bottom: 20px; */
`
const LoadMoreButton = styled(Button)`
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 10px;
  background: ${({ theme }) => theme.palette.primary.main}27;
`
const LoadingRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px 10px;
  width: 100%;
  max-height: calc(100vh - 207px);
  overflow: hidden;
`

const StyledSkeleton = styled(Skeleton)`
  min-height: 161px;
  height: 161px;
  max-width: 550px;
  @media (max-width: 800px) {
    max-width: 100%;
  }
`

const NotAvailableBar = () => {
  return (
    <NOTRoot
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon variant="h2" color="primary">
        N/A
      </Icon>
      <Text variant="h5" color="secondary">
        Novel Not Available here ...
      </Text>
    </NOTRoot>
  )
}

const Icon = styled(Typography)`
  font-weight: 600;
`
const Text = styled(Typography)`
  margin-top: 10px;
`

const NOTRoot = styled.div`
  padding-top: 10px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    gap: 5px;
  }
  min-height: 200px;
`

export default ContentSection
