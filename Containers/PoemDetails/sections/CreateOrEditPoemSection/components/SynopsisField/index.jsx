import React, { useCallback, useState } from 'react'
import styled from '@emotion/styled'
import { Skeleton, Typography } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

import StyledEditor from './StyledEditor'

const StyledEditorField = ({ name, isFetchSuccess, isLoading, defaultValues, onChange }) => {
  const [isInitialized, setIsInitialized] = useState(false)
  const formContext = useFormContext()
  const { control } = formContext

  const { field } = useController({
    name,
    control,
    defaultValue: '',
  })

  const handleEditorContent = useCallback(
    content => {
      field.onChange(content)
      if (onChange) onChange(content)
    },
    [field, onChange],
  )

  return (
    <Root>
      <StyledLabel variant="subtitle1" color="secondary">
        Synopsis
      </StyledLabel>
      {isLoading ? (
        <StyledSkeleton variant="rounded" />
      ) : (
        <StyledEditor
          value={field.value}
          isFetchSuccess={isFetchSuccess}
          onChange={handleEditorContent}
          isInitialized={isInitialized}
          setIsInitialized={setIsInitialized}
          defaultValues={defaultValues}
        />
      )}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  min-height: 350px;
`

const StyledSkeleton = styled(Skeleton)`
  height: 200px;
`
const StyledLabel = styled(Typography)`
  font-weight: 600;
`
export default StyledEditorField
