import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { useController, useFormContext } from 'react-hook-form'
import { StyledTextFieldRoot } from './StyledTextField'

const StyledDateSelector = ({ name, label, rules, required, sx }) => {
  const formContext = useFormContext()
  const { control, errors } = formContext

  const { field } = useController({
    name,
    control,
    rules: {
      valueAsDate: true,
      required: required,
      ...rules,
    },
  })

  const errorMessage = errors?.[name]?.message
  const isError = Boolean(errorMessage)

  const rootProps = {
    error: isError ? isError : undefined,
    label: label,
    required: required || Boolean(rules?.required),
    disableFuture: true,
    value: field.value,
    openTo: 'year',
    // ampm: false,
    views: ['year', 'month', 'day'],
    onBlur: field.onBlur,
    name: field.fieldName,
    inputRef: field.ref,
    onChange: field.onChange,
    inputFormat: 'DD/MM/YYYY',
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <DatePicker
        {...rootProps}
        // disableOpenPicker
        renderInput={params => <StyledTextFieldRoot {...params} sx={sx} />}
      />
    </LocalizationProvider>
  )
}

export default StyledDateSelector
