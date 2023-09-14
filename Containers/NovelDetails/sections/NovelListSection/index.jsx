import React, { useState } from 'react'
import styled from '@emotion/styled'

import { Button, Typography } from '@mui/material'

import ContentSection from './Components/ContentSection'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import Link from 'next/link'
import TabSection from './Components/TabSection'
import { useMyNovelList } from 'Containers/NovelDetails/api/novel.hook'

const NovelListSection = () => {
  const [SelectedFilter, setSelectedFilter] = useState('all')
  const { ContentList, isLoading, handleNextPage, next_page, handleResetPage } = useMyNovelList(SelectedFilter)

  const ContentSectionProps = { SelectedFilter, ContentList, isLoading, handleNextPage, next_page }

  return (
    <Root>
      <Top>
        <Heading variant="h5">Your Novels</Heading>
        <Link href={`/workspace/novel/create`}>
          <StyledButton variant="contained" endIcon={<DriveFileRenameOutlineOutlinedIcon />}>
            Create
          </StyledButton>
        </Link>
      </Top>
      <Main>
        <TabSection setSelectedFilter={setSelectedFilter} handleResetPage={handleResetPage} />
        <ContentSection {...ContentSectionProps} />
      </Main>
    </Root>
  )
}

export default NovelListSection

export const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Heading = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.main};
`

const StyledButton = styled(Button)``

const Main = styled.div`
  width: 100%;
  height: 89%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  @media (min-width: 1140px) {
    padding: 0px 15px;
    width: 91%;
  }
`
