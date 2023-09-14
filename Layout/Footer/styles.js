import { Box, Button, Typography } from '@mui/material'
import buttonClasses from '@mui/material'
import styled from '@emotion/styled'
import { mobileS, mobileL, tablet, laptop, laptopS, laptopM, tabletS } from 'styles/mediaQuery/breakPoints'

export const Wrapper = styled(Box)`
  width: 100%;
  min-height: 520px;
  display: flex;

  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 20px;
  @media ${mobileS} {
    padding: 40px 25px;
    flex-direction: column;
    align-items: center;
  }
  @media ${mobileL} {
    padding: 70px 50px;
  }
  @media ${tabletS} {
    padding: 50px 30px;
    flex-direction: row;
    align-items: flex-start;
  }
  @media ${tablet} {
    padding: 70px 40px;
  }
  @media ${laptop} {
    padding: 80px 100px;
  }
  @media ${laptopS} {
    padding: 100px 127px;
  }
  @media ${laptopM} {
    padding: 100px 120px;
  }

  background-color: #f6f3ff;
`

export const ImpSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  @media ${tabletS} {
    width: 20%;
  }

  justify-content: start;
  gap: 13px;
`
export const Heading = styled(Typography)`
  font-family: 'Roboto';
  text-align: start;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 28px;
  padding: 15px 0px;
  color: black;
`

export const ImpSectionButton = styled(Button)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: none;
  text-align: start;
  padding-left: 0px;
  &${buttonClasses?.text} {
    text-transform: capitalize;
  }
  @media ${tabletS} {
    display: block;
  }

  color: #000000;
`

export const SocialMediaIconContainer = styled(Box)`
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
`

export const LogoSection = styled(Box)`
  display: none;

  @media ${tabletS} {
    display: flex;
    display: block;
    justify-content: start;
    align-items: center;
    gap: 30px;
    margin-top: 100px;
  }
`
export const LogoSvg = styled.img`
  width: 40px;
  object-fit: cover;
`
