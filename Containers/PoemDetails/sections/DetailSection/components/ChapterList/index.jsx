import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Button, Tab, tabClasses, Tabs, tabsClasses, Typography } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CreateNewChapter from '../CreateNewChapterModal'
import { useChapterList } from 'Containers/PoemDetails/api/poem.hook'
import ContentSection from './components/ContentSection'

const ChapterList = ({ item }) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState(0)
  const [SelectedFilter, setSelectedFilter] = useState('all')
  const { ContentList, isLoading, handleNextPage, next_page, handleResetPage, refetch } = useChapterList(
    item?.id,
    false,
    SelectedFilter,
  )

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (value === 0) setSelectedFilter('all')
    else if (value === 1) setSelectedFilter('published')
    else if (value === 2) setSelectedFilter('draft')
    else if (value === 3) setSelectedFilter('trash')
    handleResetPage()
  }, [handleResetPage, setSelectedFilter, value])

  const ContentSectionProps = { item, refetch, SelectedFilter, ContentList, isLoading, handleNextPage, next_page }

  return (
    <Root>
      <CreateNewChapter item={item} open={open} setOpen={setOpen} />
      <Top>
        <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <StyledTab label="All" {...a11yProps(0)} />
          <StyledTab label="Published" {...a11yProps(1)} />
          <StyledTab label="Draft" {...a11yProps(2)} />
          <StyledTab label="Trash" {...a11yProps(3)} />
        </StyledTabs>
        <StyledButton onClick={() => setOpen(true)} variant="contained" color="primary" startIcon={<AddRoundedIcon />}>
          New Chapter
        </StyledButton>
      </Top>

      <ContentSection {...ContentSectionProps} />
      {/* <TabPanel value={value} index={0}>
        <AllTab item={item} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <DraftTab item={item} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <PublishedTab item={item} />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <TrashTab item={item} />
      </TabPanel> */}
    </Root>
  )
}

const Root = styled.div`
  --main-height: 40px;
  --bottom-spacing: 4px;
  margin-top: 20px;
  @media (max-width: 800px) {
    margin-top: 10px;
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 10px;
  @media (max-width: 500px) {
    margin-top: 10px;
  }
`

const Top = styled.div`
  display: flex;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 13px;
  cursor: pointer;
  box-shadow: none;
  margin-left: auto;
  align-self: center;
`

const TabPanel = ({ children, value, index }) => {
  return <>{value === index ? children : <></>}</>
}

const a11yProps = index => {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  }
}

const StyledTab = styled(Tab)`
  display: flex;
  justify-content: start;
  color: ${({ theme }) => theme.palette.text.icon};
  text-transform: capitalize;
  font-weight: 00;

  &.${tabClasses.root} {
    color: ${({ theme }) => theme.palette.secondary.main};
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-weight: 600;
  }

  &.${tabClasses.selected} {
    color: ${({ theme }) => theme.palette.primary.main};
  }

  transition: 0.1s ease-in 150ms;
`

const StyledTabs = styled(Tabs)`
  overflow: visible;
  display: flex;

  & .${tabsClasses.flexContainer} {
    display: flex;
    gap: 20px;
  }

  & .${tabsClasses.scroller} {
    overflow: visible;
  }

  & .${tabsClasses.indicator} {
    background: ${({ theme }) => theme.palette.primary.main};
    height: 3px;
    border-radius: 1px;
    z-index: 1;
    font-weight: 500;
  }
  @media (max-width: 530px) {
    width: 100%;
    & .${tabsClasses.flexContainer} {
      gap: 5px;
    }
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
        Poem Not Available here ...
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

export default ChapterList
