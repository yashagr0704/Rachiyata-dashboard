import styled from '@emotion/styled'

import { useController, useFormContext } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import { green, red } from '@mui/material/colors'

const StyledTextField = ({ enableColors, isCorrect, name, label, rules, required, Icon, helperText, ...props }) => {
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
    color: isCorrect ? 'success' : 'error',
    pr_color: !formContext.watch(name) ? 'normal' : isCorrect ? 'success' : 'error',
    required: required || Boolean(rules?.required),
    value: formContext.watch(name),
    helperText: helperText,
    ...field,
    ...props,
  }

  return (
    <Root>
      <StyledLabel variant="subtitle1" color="secondary">
        {label}
      </StyledLabel>
      <StyledTextFieldRoot {...rootProps} />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  height: 90px;
`

const StyledLabel = styled(Typography)`
  font-weight: 600;
`

const StyledTextFieldRoot = styled(TextField)`
  .MuiInputBase-input {
    box-shadow: black !important;
    -webkit-box-shadow: black !important;
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

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ pr_color, theme }) =>
      pr_color === 'success'
        ? green[600] + '95'
        : pr_color === 'error'
        ? red[600] + '95'
        : theme.palette?.secondary?.main + '35'};
    border-width: 2px;
  }

  .MuiFilledInput-underline::before {
    border-bottom: 2px solid rgb(255 255 255 / 0%);
  }
  .MuiFilledInput-underline::after {
    border-bottom: 3px solid ${({ theme }) => theme.palette.primary.main};
  }

  input::placeholder {
    color: ${({ theme }) => theme.palette.secondary.main}91;
    font-weight: 600;
    opacity: 1;
    font-size: 0.86rem;
    line-height: 1;
  }
  textarea::placeholder {
    color: ${({ theme }) => theme.palette.secondary.main}91;
    font-weight: 600;
    opacity: 1;
    font-size: 0.86rem;
    line-height: 1;
  }

  .MuiFormHelperText-root {
    margin-top: 4px;
    margin-left: 10px;
  }
`

export default StyledTextField
