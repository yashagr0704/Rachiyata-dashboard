import styled from '@emotion/styled'
import { useLibraryAPI } from 'Containers/UserProfile/api/userProfile.hook'
import React from 'react'
import ContentCard from '../components/ContentCard'

const LibraryTab = () => {
  const { ContentList } = useLibraryAPI()

  return (
    <Root>
      {ContentList?.map(item => (
        <ContentCard key={item.id} item={item} />
      ))}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 730px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 13px;
  }

  @media (max-width: 400px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    grid-gap: 13px;
  }
`

export default LibraryTab
