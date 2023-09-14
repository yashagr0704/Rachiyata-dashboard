import styled from '@emotion/styled'

import { useController, useFormContext } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'

const StyledTextField = ({ name, label, rules, required, ...props }) => {
  const formContext = useFormContext()
  const { control, errors } = formContext

  const { field } = useController({
    name,
    control,
    defaultValue: '',
    rules: {
      required: required,
      ...rules,
    },
  })

  const errorMessage = errors?.[name]?.message
  const isError = Boolean(errorMessage)

  const rootProps = {
    size: 'medium',
    error: isError ? isError : undefined,

    required: required || Boolean(rules?.required),
    ...field,
    value: formContext.watch(name),
    ...props,
  }
  return (
    <Root>
      <Label variant="subtitle2" color="secondary">
        {label}
      </Label>
      <StyledTextFieldRoot {...rootProps} />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`
const Label = styled(Typography)`
  font-weight: 600;
`

const StyledTextFieldRoot = styled(TextField)`
  .MuiInputBase-input {
    box-shadow: none !important;
    -webkit-box-shadow: none;
  }

  .MuiInputLabel-root {
    font-size: 0.94rem;
    line-height: 0.9;
    margin-top: -3px;
  }

  .MuiInputLabel-asterisk {
    font-size: 0.84rem;
    line-height: 1.445;
  }
  .MuiOutlinedInput-root {
    font-size: 0.81rem;
  }
  // change color mui outlined input

  .MuiOutlinedInput-notchedOutline {
    border-width: 2px;
    border-color: ${({ theme }) => theme.palette.secondary.main}63;
  }
  .MuiOutlinedInput-input:placeholder-shown {
    font-weight: 600;
    color: ${({ theme }) => theme.palette.secondary.main}f0;
    letter-spacing: 0.4px;
  }

  .MuiOutlinedInput-input {
    padding-inline: 14px;
    padding-block: 12px;
    /* padding: 8.5px 14px; */
    -webkit-autofill {
      box-shadow: none;
      -webkit-box-shadow: none;
      -webkit-text-fill-color: none;
    }
  }

  .MuiFilledInput-underline {
    background-color: rgb(255 255 255 / 4%);
  }

  .MuiFilledInput-underline::before {
    border-bottom: 2px solid rgb(255 255 255 / 0%);
  }
  .MuiFilledInput-underline::after {
    border-bottom: 3px solid ${({ theme }) => theme.palette.primary.main};
  }
`

export default StyledTextField
