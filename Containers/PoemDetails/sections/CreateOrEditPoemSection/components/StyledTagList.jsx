import styled from '@emotion/styled'

import { useController, useFormContext } from 'react-hook-form'
import { Button, TextField, Typography } from '@mui/material'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

const StyledTagList = ({ name, label, rules, required, Icon, ...props }) => {
  const formContext = useFormContext()
  const { control, errors } = formContext

  const { field } = useController({
    name,
    control,
    defaultValue: [''],
    rules: {
      required: required,
      ...rules,
    },
  })

  const errorMessage = errors?.[name]?.message
  const isError = Boolean(errorMessage)

  const rootProps = {
    size: 'medium',
    ...field,
    ...props,
  }
  return (
    <Root>
      <StyledLabel variant="subtitle1" color="secondary">
        {label}
      </StyledLabel>
      <Main>
        {field.value.map((value, index) => {
          return (
            <Field key={index}>
              <StyledTextFieldRoot
                size="medium"
                value={value}
                onChange={event => {
                  let valueList = field.value
                  valueList[index] = event.target.value
                  field.onChange(valueList)
                }}
              />
              {index === 0 ? (
                <StyledButton
                  variant="outlined"
                  onClick={() => {
                    let valueList = field.value
                    valueList.push('')
                    field.onChange(valueList)
                  }}>
                  <AddOutlinedIcon />
                </StyledButton>
              ) : (
                <StyledButton
                  onClick={() => {
                    let valueList = field.value.filter((_, thisIndex) => {
                      return index !== thisIndex
                    })
                    field.onChange(valueList)
                  }}>
                  <DeleteOutlineOutlinedIcon />
                </StyledButton>
              )}
            </Field>
          )
        })}
      </Main>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`
const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
`
const Field = styled.div`
  display: flex;
  gap: 5px;
  & div:first-of-type {
    flex: 1;
  }
`

const StyledLabel = styled(Typography)`
  font-weight: 600;
`

const StyledButton = styled(Button)`
  font-weight: 600;
  padding: 0px;
  min-width: 45px;
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
    border-color: ${({ theme }) => theme.palette?.secondary?.main}35;
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
`

export default StyledTagList
