import styled from '@emotion/styled'
import { FormControlLabel, Radio } from '@mui/material'

export default function StyledRadioBox({ label, value }) {
  return <Root value={value} control={<StyledRadio />} label={label} />
}

const Root = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${({ theme }) => theme.palette?.secondary?.main}dd;
    /* border-color: ${({ theme }) => theme.palette?.secondary?.main}35; */
    
  }
  .Mui-checked .MuiSvgIcon-root {
    color: ${({ theme }) => theme.palette?.primary?.main};
  }
  .MuiSvgIcon-root {
    font-size: 1.3rem;
    color: ${({ theme }) => theme.palette?.secondary?.main}e5;
  }
`

const StyledRadio = styled(Radio)``
