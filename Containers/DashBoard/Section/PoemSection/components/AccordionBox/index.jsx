import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import InfoCard from './InfoCard'
import styled from '@emotion/styled'
import { Button, Rating } from '@mui/material'
import EastRoundedIcon from '@mui/icons-material/EastRounded'
import StyledChip from './StyledChip'
import StarIcon from '@mui/icons-material/Star'
import CollectionsBookmarkRoundedIcon from '@mui/icons-material/CollectionsBookmarkRounded'
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded'
import Link from 'next/link'

const List = [
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
  {
    label: 'Total Revenue',
    date: 'Last 30 days',
    value: '$ 1,000',
    growth: 10,
  },
]

const AccordionBox = ({ onChange, isExpanded }) => {
  const item = {
    category: [
      {
        id: 1,
        name: 'Action',
      },
      {
        id: 2,
        name: 'Adventure',
      },
    ],
    chapter_count: 10,
    rating: {
      rate__avg: 4.5,
      rate__count: 10,
    },
  }
  return (
    <StyledAccordion elevation={0} expanded={isExpanded} onChange={onChange}>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
        <Typography fontSize={18} fontWeight={600} color="secondary">
          Death Note
        </Typography>
        <Typography fontSize={14} fontWeight={600} color="primary">
          (Death Note of the week)
        </Typography>
      </StyledAccordionSummary>

      <StyledAccordionDetails>
        <Top>
          <InfoChipList>
            {item?.category?.map(({ name, id }) => (
              <StyledChip label={name} key={id} />
            ))}
            <StyledChip label={`${item?.chapter_count} Chapters`} Icon={CollectionsBookmarkRoundedIcon} />
            <StyledChip label={`${item?.chapter_count} Views`} Icon={RemoveRedEyeRoundedIcon} />
          </InfoChipList>

          <RatingRoot>
            <Rating
              color="primary"
              sx={{ color: theme => theme.palette.primary.main }}
              value={Number(Number(item?.rating?.rate__avg).toFixed(1))}
              readOnly
              size="large"
              precision={0.1}
              emptyIcon={<StarIcon fontSize="inherit" sx={{ color: theme => theme.palette.primary.main + '39' }} />}
            />
            {<TotalRating color="secondary" variant="subtitle2">{`(${item?.rating?.rate__count})`}</TotalRating>}
          </RatingRoot>
        </Top>
        <Main>
          {List?.map((item, index) => {
            return <InfoCard item={item} key={index} />
          })}
        </Main>
        <Bottom>
          <Link href="/workspace/poem/1">
            <Button endIcon={<EastRoundedIcon />} variant="contained">
              Details
            </Button>
          </Link>
        </Bottom>
      </StyledAccordionDetails>
    </StyledAccordion>
  )
}

const InfoChipList = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`

const RatingRoot = styled.div`
  display: flex;
  gap: 5px;
`

const TotalRating = styled(Typography)``

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
`

const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3px;
  margin-top: 20px;
`

const StyledAccordion = styled(Accordion)`
  background: ${({ theme }) => theme.palette.primary.main}17;
  border-radius: 12px;
  padding-bottom: 2px;
  ::before {
    display: none;
  }
`
const StyledAccordionSummary = styled(AccordionSummary)`
  .MuiAccordionSummary-content {
    display: flex;
    align-items: center;
    gap: 7px;
  }
`

const StyledAccordionDetails = styled(AccordionDetails)``

const Main = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1090px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`
export default AccordionBox
