import React from 'react'
import styled from '@emotion/styled'

import { Tab, tabClasses, Tabs, tabsClasses } from '@mui/material'

import WorkTab from './Tabs/WorkTab'
import ActivityTab from './Tabs/ActivityTab'
import LibraryTab from './Tabs/LibraryTab'

const ProfileTabs = ({ item }) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Root>
      <StyledTabs value={value} onChange={handleChange} aria-label="Comment List">
        <StyledTab label="Library" {...a11yProps(0)} />
        <StyledTab label="Activity" {...a11yProps(1)} />
        <StyledTab label="Original Work" {...a11yProps(2)} />
      </StyledTabs>
      <TabPanel value={value} index={0}>
        <LibraryTab item={item} />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ActivityTab item={item} />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <WorkTab item={item} />
      </TabPanel>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`

const StyledTab = styled(Tab)`
  display: flex;
  justify-content: start;
  color: ${({ theme }) => theme.palette.text.icon};
  text-transform: capitalize;
  font-weight: 500;

  &.${tabClasses.root} {
    color: ${({ theme }) => theme.palette.secondary.main};
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    font-weight: 600;
    border-radius: 12px;
    min-height: 40px;
  }

  &.${tabClasses.selected} {
    color: ${({ theme }) => theme.palette.primary.main};
    z-index: 1;
  }

  transition: 0.1s ease-in 150ms;
`

const StyledTabs = styled(Tabs)`
  overflow: visible;
  display: flex;
  width: fit-content;
  
  & .${tabsClasses.flexContainer} {
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    height: 40px;
    gap: 20px;
  }

  @media (max-width: 530px) {
    width: 100%;
    & .${tabsClasses.flexContainer} {
      gap: 0px;
    }
  }

  & .${tabsClasses.scroller} {
    overflow: visible;
    height: 40px;
  }

  & .${tabsClasses.indicator} {
    background: ${({ theme }) => theme.palette.primary.main}1a;
    height: 3px;
    height: 100%;
    border-radius: 12px;
    font-weight: 500;
  }
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

export default ProfileTabs
