import styled from '@emotion/styled'
import { Button, CircularProgress, Typography } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import StyledTextField from './components/StyledTextField'
import SaveIcon from '@mui/icons-material/Save'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useCreateOrUpdateNovelChapterAPI } from 'Containers/NovelDetails/api/novel.hook'
import StyledEditorField from './components/StyledEditorField'
import { useSnackbar } from 'notistack'
import useFormError from 'hooks/useFormError'
import Link from 'next/link'

const EditChapterSection = ({ bookId, data, isSuccess: isFetchSuccess, isLoading: isFetchLoading }) => {
  const [showMessageOnSave, setShowMessageOnSave] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { handleFormError } = useFormError()
  const { handleSubmitChapter, isLoading, isSuccess } = useCreateOrUpdateNovelChapterAPI(
    bookId,
    undefined,
    data?.id,
    showMessageOnSave,
    setShowMessageOnSave,
  )

  const methods = useForm({
    defaultValues: {
      book_id: bookId,
      id: data?.id,
      chapter_title: data?.chapter_title,
      chapter_sequence: data?.chapter_sequence,
      author_note: data?.author_note,
      chapter_content: data?.chapter_content,
      is_published: false,
    },
  })

  useEffect(() => {
    methods.reset({
      book_id: bookId,
      id: data?.id,
      chapter_title: data?.chapter_title,
      chapter_sequence: data?.chapter_sequence,
      author_note: data?.author_note,
      chapter_content: data?.chapter_content,
      is_published: false,
    })
  }, [bookId, data?.author_note, data?.chapter_content, data?.chapter_sequence, data?.chapter_title, data?.id, methods])

  useEffect(() => {
    if (isSuccess && showMessageOnSave) {
      setShowMessageOnSave(false)
      enqueueSnackbar('Chapter Saved Successfully!', {
        variant: 'success',
      })
    }
  }, [enqueueSnackbar, isSuccess, showMessageOnSave])

  const handleSave = useCallback(
    chapter_content => {
      methods.handleSubmit(data => {
        handleSubmitChapter({
          ...data,
          chapter_content,
        })
      })()
    },
    [handleSubmitChapter, methods],
  )

  return (
    <Root>
      <FormProvider {...methods}>
        <Row>
          <Column>
            <Typography fontWeight={600} variant="h4" color="secondary">
              Chapter Editor
            </Typography>
            <Typography sx={{ mt: -1.1 }} fontWeight={600} fontSize={15} variant="subtitle2" color="secondary.light">
              You can edit the chapter name, sequence, author note and the content of the chapter here.
            </Typography>
          </Column>
          <Link href={`/workspace/novel/${bookId}`}>
            <StyledLink>
              <BackButton startIcon={<ArrowBackRoundedIcon />} variant="contained" color="primary">
                Back
              </BackButton>
            </StyledLink>
          </Link>
        </Row>

        <Row>
          <Column>
            <Row>
              <StyledTextField
                name="chapter_title"
                label="Chapter Name"
                placeholder="Chapter name here..."
                rules={{
                  required: 'Chapter name is required',
                }}
              />
              <StyledTextField
                name="chapter_sequence"
                label="Chapter Sequence"
                placeholder="Chapter Sequence here..."
                rules={{
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Only numbers are allowed in sequence',
                  },
                }}
              />
            </Row>
            <StyledTextField name="author_note" label="Author Note" placeholder="Author note here..." multiline />
          </Column>
        </Row>

        <StyledEditorField
          isFetchSuccess={isFetchSuccess}
          isLoading={isFetchLoading}
          name="chapter_content"
          onChange={handleSave}
          defaultValues={data?.chapter_content}
        />
      </FormProvider>
      <SaveButton
        disabled={isLoading}
        startIcon={
          isLoading ? (
            <CircularProgress size={18} thickness={7} sx={{ color: theme => theme.palette.grey[500] }} />
          ) : (
            <SaveIcon />
          )
        }
        variant="contained"
        onClick={methods.handleSubmit(data => {
          setShowMessageOnSave(true)
          handleSubmitChapter({
            ...data,
          })
        }, handleFormError)}
        color="primary">
        Save
      </SaveButton>
    </Root>
  )
}

const Root = styled.div`
  padding-top: 10px;
  padding-left: 0px;
  padding-right: 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`

const SaveButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  z-index: 1000;
  right: 20px;
  font-weight: 700;
`

const StyledLink = styled.a`
  font-weight: 700;
  display: flex;
  align-self: flex-start;
  justify-self: flex-start;
  margin-top: 10px;
  margin-left: auto;
`

const BackButton = styled(Button)`
  font-weight: 700;
  align-self: flex-start;
  justify-self: flex-start;
  margin-top: 10px;
  margin-left: auto;
`

export default EditChapterSection
