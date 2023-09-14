import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined'
import styled from '@emotion/styled'
import React from 'react'
import Link from 'next/link'

const LogoBox = () => {
  return (
    <Link href={'/'}>
      <a>
        <Root>
          <AutoStoriesOutlinedIcon
            style={{
              fontSize: 29,
            }}
          />
          <Text>E Book</Text>
        </Root>
      </a>
    </Link>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000000cb;
`

const Text = styled.div`
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: 700;
  font-size: 1.3rem;
  white-space: nowrap;
`

export default LogoBox
