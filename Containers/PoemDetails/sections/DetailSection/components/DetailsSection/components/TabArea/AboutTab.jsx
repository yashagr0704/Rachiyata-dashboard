import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import React from 'react'

const AboutTab = ({ item }) => {
  return (
    <Root>
      <Label variant="h6" color="secondary">
        Synopsis
      </Label>
      <Synopsis dangerouslySetInnerHTML={{ __html: item?.synopsis }} />
      <HashtagList>
        {item?.tags?.map(name => (
          <Hashtag variant="subtitle2" key={name}>
            {name && `#${name}`}
          </Hashtag>
        ))}
      </HashtagList>
    </Root>
  )
}

const Root = styled.div`
  padding: 6px;
`

const Label = styled(Typography)``

const Synopsis = styled(Typography)`
  margin-top: 5px;
  color: ${({ theme }) => theme.palette.secondary.main}ee;
`

const HashtagList = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`

const Hashtag = styled(Typography)`
  font-weight: 400;
  margin-top: 10px;
  color: ${({ theme }) => theme.palette.primary.main};
`

export default AboutTab
