import styled from '@emotion/styled'
import { Button, CircularProgress, Typography } from '@mui/material'
import StyledTextField from 'components/form-components/StyledTextField'
import { StyledModal } from 'components/StyledModal'
import { useCreateOrUpdatePoemChapterAPI } from 'Containers/PoemDetails/api/poem.hook'
import useFormError from 'hooks/useFormError'
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

const CreateNewChapter = ({ open, setOpen, item }) => {
  const { handleSubmitChapter, isLoading } = useCreateOrUpdatePoemChapterAPI(item?.id, setOpen)
  const { handleFormError } = useFormError()
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const methods = useForm({
    defaultValues: {
      poem_id: item?.id,
      chapter_title: '',
      chapter_sequence: '',
      author_note: '',
      chapter_content: '',
      is_published: false,
    },
  })

  useEffect(() => {
    methods.reset({
      poem_id: item?.id,
      chapter_title: '',
      chapter_sequence: '',
      author_note: '',
      chapter_content: '',
    })
  }, [item?.id, methods])

  return (
    <Root
      maxWidth="30rem"
      maxHeight="fit-content"
      open={open}
      handleClose={isLoading ? () => {} : handleClose}
      customBarackPoint={400}>
      <Title variant="h4" color="secondary">
        Create New Chapter
      </Title>
      <FormProvider {...methods}>
        <StyledTextField name="chapter_title" label="Chapter Name" placeholder="Chapter name here..." />
        <StyledTextField
          name="chapter_sequence"
          label="Chapter Sequence"
          placeholder="Chapter sequence here..."
          rules={{
            pattern: {
              value: /^[0-9]*$/,
              message: 'Only numbers are allowed in sequence',
            },
          }}
        />
        <StyledTextField name="author_note" label="Author Note" placeholder="Author note here..." multiline />
      </FormProvider>
      <Bottom>
        <StyledButton disabled={isLoading} variant="outlined" onClick={() => setOpen(false)}>
          Cancel
        </StyledButton>

        <StyledButton
          disabled={isLoading}
          startIcon={
            isLoading && <CircularProgress size={13} thickness={5} sx={{ color: theme => theme.palette.grey[500] }} />
          }
          variant="contained"
          color="primary"
          onClick={methods.handleSubmit(handleSubmitChapter, handleFormError)}>
          Create
        </StyledButton>
      </Bottom>
    </Root>
  )
}

const Root = styled(StyledModal)`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`
const Title = styled(Typography)`
  font-weight: 600;
`
const Bottom = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`
const StyledButton = styled(Button)`
  font-weight: 600;
`

export default CreateNewChapter
