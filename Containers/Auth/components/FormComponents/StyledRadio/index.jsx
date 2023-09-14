import styled from '@emotion/styled'
import { FormLabel } from '@mui/material'
import StyledRadioBox from './StyledRadioBox'
import StyledRadioGroup from './StyledRadioGroup'

export const StyledFieldGroup = styled.form`
  gap: 0.2em;
  display: flex;
  flex-direction: column;
`

export const StyledFormLabel = styled(FormLabel)`
  color: ${({ theme }) => theme.palette?.secondary?.main};
  font-weight: 600;
  font-size: 0.9rem;
`
export { StyledRadioGroup, StyledRadioBox }
