import styled from '@emotion/styled'
import { FormControl, FormHelperText, Typography } from '@mui/material'
import { InputLabel, Select, MenuItem } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'

const StyledSelect = ({ name, label, menuList, disabled, ...props }) => {
  const { rules, helperText, required, sx } = props

  const formContext = useFormContext()
  const { control, errors } = formContext

  const { field } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  })

  const labelId = `${name}-label`
  const errorMessage = errors?.[name]?.message

  const isError = Boolean(errorMessage)
  const isRequired = required || Boolean(rules?.required)

  const selectProps = {
    id: name,
    required: isRequired,
    IconComponent: KeyboardArrowDownRoundedIcon,
    name: name,
    inputRef: field.ref,
    onBlur: field.onBlur,
    onChange: field.onChange,
    value: field.value,
  }

  const _menuItemsMapping = (item, index) => (
    <StyledMenuItems id={index} value={item.value} key={index}>
      {item.label}
    </StyledMenuItems>
  )

  return (
    <Root>
      <StyledLabel variant="subtitle1" color="secondary">
        {label}
      </StyledLabel>
      <Main variant="outlined" error={isError ? isError : undefined} sx={sx} defaultValue="" disabled={disabled}>
        <StyledSelectPaper {...selectProps}>{menuList.map(_menuItemsMapping)}</StyledSelectPaper>

        <FormHelperText>{helperText}</FormHelperText>
      </Main>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 90px;
  width: 100%;
`

const StyledLabel = styled(Typography)`
  font-weight: 600;
`

const Main = styled(FormControl)`
  .MuiInputLabel-root {
    font-size: 0.94rem;
  }
  .MuiInputLabel-asterisk {
    font-size: 0.84rem;
    line-height: 1.445;
  }
  .MuiOutlinedInput-root {
    font-size: 0.81rem;
  }
  .MuiSelect-select {
    padding: 12px 14px;
  }
  .MuiSvgIcon-root {
    color: rgb(255, 255, 255, 0.5);
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: ${({ theme }) => theme.palette?.secondary?.main}35;
    border-width: 2px;
  }
`

const StyledSelectPaper = styled(Select)`
  font-size: 1rem;
`

const StyledMenuItems = styled(MenuItem)`
  font-size: 1rem;
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 14px;
  padding-right: 14px;
`

export default StyledSelect
