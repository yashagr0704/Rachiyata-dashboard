import styled from '@emotion/styled'

import { useController, useFormContext } from 'react-hook-form'
import { InputAdornment, OutlinedInput, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const StyledPasswordField = ({ name, label, rules, required, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
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

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const rootProps = {
    size: 'medium',
    error: isError ? isError : undefined,

    required: required || Boolean(rules?.required),
    ...field,
    type: showPassword ? 'text' : 'password',
    value: formContext.watch(name),
    ...props,
  }
  return (
    <Root>
      <Label variant="subtitle2" color="secondary">
        {label}
      </Label>
      <StyledPasswordFieldRoot
        {...rootProps}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
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

const StyledPasswordFieldRoot = styled(OutlinedInput)`
  .MuiInputBase-input {
    box-shadow: black !important;
    -webkit-box-shadow: black !important;
  }

  .MuiInputLabel-asterisk {
    font-size: 0.9rem;
    line-height: 1.445;
  }

  .MuiOutlinedInput-root {
    font-size: 0.9rem;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette?.secondary?.main}35;
    border-width: 2px;
  }

  .MuiInputLabel-root {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.palette?.secondary?.main}d1;
    font-weight: 600;
  }

  .MuiInputLabel-root.Mui-focused {
    color: ${({ theme }) => theme.palette?.primary?.main};
  }

  .MuiOutlinedInput-input {
    padding-inline: 14px;
    padding-block: 12px;

    -webkit-autofill {
      box-shadow: none;
      -webkit-box-shadow: none;
      -webkit-text-fill-color: none;
    }
  }
  input::placeholder {
    font-size: 0.85rem;
  }
`

export default StyledPasswordField
