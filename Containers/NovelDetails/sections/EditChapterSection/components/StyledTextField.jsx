import styled from '@emotion/styled'

import { useController, useFormContext } from 'react-hook-form'
import { TextField, Typography } from '@mui/material'
import { StyledTextFieldRoot } from 'components/form-components/StyledTextField'

const StyledTextField = ({ name, label, rules, required, Icon, ...props }) => {
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
    value: formContext.watch(name),
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
`

const StyledLabel = styled(Typography)`
  font-weight: 600;
`



export default StyledTextField
