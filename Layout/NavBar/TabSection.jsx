import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import { Tab, tabClasses, Tabs, tabsClasses } from '@mui/material'
import { useRouter } from 'next/router'

const TabSection = ({ item }) => {
  const { pathname, push, basePath, ...pr } = useRouter()
  const [value, setValue] = useState(0)
  const [isDisplayed, setDisplayed] = useState(true)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(() => {
    if (pathname === '/dashboard/novel' || pathname === '/workspace/novel') {
      setValue(0)
      setDisplayed(true)
    } else if (pathname === '/dashboard/poem' || pathname === '/workspace/poem') {
      setValue(1)
      setDisplayed(true)
    }
    // else if (pathname === '/dashboard/shorts' || pathname === '/workspace/shorts') {
    //   setValue(2)
    //   setDisplayed(true)
    // }
    else {
      setDisplayed(false)
    }
  }, [pathname])

  const handleNavigate = path => () => {
    const indexOfSlash = pathname.indexOf('/')
    const lastIndexOfSlash = pathname.lastIndexOf('/')

    const newPath = pathname.slice(indexOfSlash, lastIndexOfSlash) + path

    push(newPath)
  }

  if (!isDisplayed) return <></>

  return (
    <StyledTabs value={value} onChange={handleChange} aria-label="Comment List">
      <StyledTab label="Novel" {...a11yProps(0)} onClick={handleNavigate('/novel')} />
      <StyledTab label="Poem" {...a11yProps(1)} onClick={handleNavigate('/poem')} />
      {/* <StyledTab label="Shorts" {...a11yProps(2)} onClick={handleNavigate('/shorts')} /> */}
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
  margin-top: 7px;
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
