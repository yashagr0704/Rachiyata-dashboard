import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Tab, tabClasses, Tabs, tabsClasses } from '@mui/material'
import { useRouter } from 'next/router'

const TabSection = ({ setSelectedFilter, handleResetPage }) => {
  const [value, setValue] = useState(0)

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

  return (
    <StyledTabs value={value} onChange={handleChange} aria-label="Filter List">
      <StyledTab label="All" {...a11yProps(0)} />
      <StyledTab label="Published" {...a11yProps(1)} />
      <StyledTab label="Draft" {...a11yProps(2)} />
      <StyledTab label="Trash" {...a11yProps(3)} />
    </StyledTabs>
  )
}

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
  /* margin-top: 7px; */
  margin-bottom: 10px;
  /* margin-left: 30px; */
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

export default TabSection
