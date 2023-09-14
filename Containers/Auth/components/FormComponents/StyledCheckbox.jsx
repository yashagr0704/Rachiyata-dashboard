import styled from '@emotion/styled'
import { FormControlLabel, Checkbox } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

const StyledCheckbox = ({ name, label, ...props }) => {
  const formContext = useFormContext()
  const { control, errors } = formContext

  const { field } = useController({
    name,
    control,
  })

  const errorMessage = errors?.[name]?.message
  const isError = Boolean(errorMessage)

  const checkboxProps = {
    size: 'small',
    error: isError ? isError : undefined,
    name: name,
    onBlur: field.onBlur,
    checked: field.value,
    ref: field.ref,
    onChange: event => field.onChange(event.target.checked),
    ...props,
  }

  return <StyledFormControlLabel control={<Checkbox {...checkboxProps} />} label={label} />
}

export default StyledCheckbox

const StyledFormControlLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-size: 0.95rem;
    line-height: 1.7;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.secondary.main};
  }
`
