import React from 'react'
import TollOutlinedIcon from '@mui/icons-material/TollOutlined'
import styled from '@emotion/styled'
import { Typography } from '@mui/material'
import { blue, green, grey, red } from '@mui/material/colors'

const StoneSection = ({ redStone, blueStone, greenStone, greyStone }) => {
  return (
    <Root>
      <Top>
        {/* <Field variant="subtitle2">
          <TollOutlinedIcon sx={{ color: red[500] }} /> {redStone}
        </Field> */}
        <Field variant="subtitle2">
          <TollOutlinedIcon sx={{ color: blue[500] }} /> {blueStone}
        </Field>
        {/* <Field variant="subtitle2">
          <TollOutlinedIcon sx={{ color: green[500] }} /> {greenStone}
        </Field> */}
      </Top>

      <Bottom>
        <Field variant="subtitle2">
          <TollOutlinedIcon sx={{ color: grey[500] }} /> {greyStone}
        </Field>
      </Bottom>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  gap: 15px;
  margin-block: 7px;
`

const Top = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`
const Bottom = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`

const Field = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.main};
  line-height: 1;
  svg {
    font-size: 1.5rem;
  }
  span {
    margin-top: 2px;
    margin-bottom: 2px;
    @media (max-width: 400px) {
      margin-top: 2px;
      margin-bottom: 1px;
    }
  }
`

export default StoneSection
