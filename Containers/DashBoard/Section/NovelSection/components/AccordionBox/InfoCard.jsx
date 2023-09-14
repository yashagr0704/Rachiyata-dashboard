import { Typography } from '@mui/material'
import React from 'react'

import NorthRoundedIcon from '@mui/icons-material/NorthRounded'
import SouthRoundedIcon from '@mui/icons-material/SouthRounded'
import styled from '@emotion/styled'

const InfoCard = ({ item }) => {
  return (
    <Root>
      <Top>
        <StyledLabelText variant="subtitle2" color="secondary">
          {item?.label}
        </StyledLabelText>
        <StyledDateText variant="subtitle2" fontWeight={600} color="primary">
          {item?.date}
        </StyledDateText>
      </Top>
      <StyledValueText variant="h3" color="secondary">
        {item?.value}
      </StyledValueText>
      <Bottom>
        {item?.growth > 0 ? (
          <NorthRoundedIcon sx={{ color: 'success.main', fontSize: 19 }} />
        ) : (
          <SouthRoundedIcon sx={{ color: 'error.main', fontSize: 19 }} />
        )}
        <StyledGrowthText variant="subtitle2" fontSize={16}>
          {item?.growth}
        </StyledGrowthText>
      </Bottom>
      <Bottom>
        <StyledInfoText variant="subtitle2" fontWeight={500} color="secondary.light">
          Than last period
        </StyledInfoText>
      </Bottom>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: ${({ theme }) => theme.palette.primary.main}17;
  background: #ffffffda;
  border-radius: 16px;
  padding: 10px 20px;
  @media (max-width: 550px) {
    padding: 10px 15px;
    border-radius: 12px;
  }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Bottom = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 3px;
`

const StyledValueText = styled(Typography)`
  font-weight: 600;
  @media (max-width: 550px) {
    font-size: 2.1rem;
  }
  @media (max-width: 520px) {
    font-size: 1.95rem;
  }
  @media (max-width: 360px) {
    font-size: 1.9rem;
  }
  @media (max-width: 340px) {
    font-size: 1.8rem;
  }
`

// create styled component for all the typography
const StyledLabelText = styled(Typography)`
  @media (max-width: 550px) {
    font-size: 0.78rem;
  }
  @media (max-width: 520px) {
    font-size: 0.72rem;
  }
  @media (max-width: 440px) {
    font-size: 0.7rem;
  }
`
const StyledDateText = styled(Typography)`
  text-align: right;
  @media (max-width: 550px) {
    font-size: 0.78rem;
  }
  @media (max-width: 520px) {
    font-size: 0.72rem;
  }
  @media (max-width: 440px) {
    font-size: 0.7rem;
  }
`
const StyledGrowthText = styled(Typography)`
  @media (max-width: 550px) {
    font-size: 1rem;
  }
`
const StyledInfoText = styled(Typography)`
  @media (max-width: 360px) {
    font-size: 0.8rem;
  }
`

export default InfoCard
