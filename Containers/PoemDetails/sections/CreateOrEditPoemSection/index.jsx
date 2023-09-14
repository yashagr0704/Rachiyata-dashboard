import styled from '@emotion/styled'
import { Button, CircularProgress, Typography } from '@mui/material'
import { useCategoryDropdown, useCheckPoemName, useCreateOrUpdatePoemAPI } from 'Containers/PoemDetails/api/poem.hook'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PhotoUploader from './components/PhotoUploader'
import StyledSelect from './components/StyledSelect'
import StyledTagList from './components/StyledTagList'
import StyledTextField from './components/StyledTextField'
import SynopsisField from './components/SynopsisField'
import SaveIcon from '@mui/icons-material/Save'
import useFormError from 'hooks/useFormError'

const statusList = [
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
]

const languageList = [
  { label: 'English', value: 'english' },
  { label: 'Hindi', value: 'Hindi' },
]

const CreateOrEditPoemSection = ({ editMode, data, isFetchSuccess, isLoading: isFetchLoading }) => {
  const { dropdown: categoryDropdown } = useCategoryDropdown()
  const { handleSubmitPoem, isLoading } = useCreateOrUpdatePoemAPI(editMode, data?.id)
  const { handleFormError } = useFormError()

  const methods = useForm({
    defaultValues: {
      poemId: editMode ? data?.id : '',
      poem_name: editMode ? data?.poem_name : '',
      alternate_name: editMode ? data?.alternate_name : '',
      category_id: editMode && data?.category?.length ? data?.category?.[0]?.id : '',
      tags: editMode && data?.tags?.length ? data?.tags : [''],
      lang: editMode ? data?.lang : '',
      status: editMode ? data?.status : '',
      synopsis: editMode ? data?.synopsis : '',
      cover_img1: editMode && data?.cover_img ? [data?.cover_img] : [],
      cover_img2: editMode && data?.cover_img2 ? [data?.cover_img2] : [],
      cover_img3: editMode && data?.cover_img3 ? [data?.cover_img3] : [],
      cover_img4: editMode && data?.cover_img4 ? [data?.cover_img4] : [],
      is_published: false,
    },
  })

  useEffect(() => {
    methods.reset({
      poemId: editMode ? data?.id : '',
      poem_name: editMode ? data?.poem_name : '',
      alternate_name: editMode ? data?.alternate_name : '',
      category: editMode ? data?.category : '',
      tags: editMode && data?.tags?.length ? data?.tags : [''],
      lang: editMode ? data?.lang : '',
      status: editMode ? data?.status : '',
      synopsis: editMode ? data?.synopsis : '',
      cover_img1: editMode && data?.cover_img ? [data?.cover_img] : [],
      cover_img2: editMode && data?.cover_img2 ? [data?.cover_img2] : [],
      cover_img3: editMode && data?.cover_img3 ? [data?.cover_img3] : [],
      cover_img4: editMode && data?.cover_img4 ? [data?.cover_img4] : [],
      category_id: editMode && data?.category?.length ? Number(data?.category?.[0]?.id) : '',
      is_published: editMode ? data?.is_published : false,
    })
    return () => {}
  }, [
    data?.alternate_name,
    data?.poem_name,
    data?.category,
    data?.cover_img,
    data?.cover_img2,
    data?.cover_img3,
    data?.cover_img4,
    data?.id,
    data?.is_published,
    data?.lang,
    data?.status,
    data?.synopsis,
    data?.tags,
    editMode,
    methods,
  ])

  const { isTaken: isPoemNameTaken, message: messagePoemName } = useCheckPoemName(
    methods.watch('poem_name'),
    data?.poem_name,
  )
  const { isTaken: isAlternateNameTaken, message: messageAlternateName } = useCheckPoemName(
    methods.watch('alternate_name'),
    data?.alternate_name,
  )

  return (
    <Root>
      <Main>
        <Column>
          <Heading variant="h4" color="secondary">
            Poem Information
          </Heading>
          <Typography
            sx={{ mt: -1.1, mb: 0.7 }}
            fontWeight={600}
            fontSize={15}
            variant="subtitle2"
            color="secondary.light">
            You can edit the chapter name, sequence, author note and the content of the chapter here.
          </Typography>
        </Column>

        <FormProvider {...methods}>
          <ImageSection>
            <PhotoUploader name="cover_img1" />
            <ImageList>
              <PhotoUploader small name="cover_img2" />
              <PhotoUploader small name="cover_img3" />
              <PhotoUploader small name="cover_img4" />
            </ImageList>
          </ImageSection>
          <Body>
            <Left>
              <StyledTextField
                enableColors
                isCorrect={!isPoemNameTaken}
                helperText={messagePoemName}
                placeholder="Poem name here..."
                name="poem_name"
                label="Name"
              />
              <StyledTextField
                enableColors
                isCorrect={!isAlternateNameTaken}
                helperText={messageAlternateName}
                placeholder="Alternate name here..."
                name="alternate_name"
                label="Alternate Name"
              />
              <StyledTagList name="tags" label="Tags" />
            </Left>
            <Right>
              <StyledSelect name="lang" label="Language" menuList={languageList} />
              <StyledSelect name="status" label="Status" menuList={statusList} />
              <StyledSelect name="category_id" label="Category" menuList={categoryDropdown} />
              {/* <StyledTextField placeholder="Synopsis here..." name="synopsis" label="Synopsis" multiline /> */}
            </Right>
          </Body>
          <SynopsisField
            name="synopsis"
            isFetchSuccess={isFetchSuccess}
            isLoading={isFetchLoading}
            defaultValues={data?.synopsis}
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
          onClick={methods.handleSubmit(handleSubmitPoem, handleFormError)}
          color="primary">
          Save
        </SaveButton>
      </Main>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`

const Main = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;

  background-color: #f6f3ff;
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  max-width: 50rem;
`

const Body = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  @media (max-width: 660px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const ImageSection = styled.div`
  display: grid;
  grid-template-columns: auto 88px;
  grid-template-rows: 1fr;
  gap: 8px;
  grid-template-areas: '. .';
  justify-content: start;
  justify-items: start;
`

const ImageList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 8px;
  grid-template-areas: '.' '.' '.';
`

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`

const Right = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  width: 100%;
`

const Heading = styled(Typography)`
  font-weight: 600;
`

const SaveButton = styled(Button)`
  align-self: flex-start;
`

export default CreateOrEditPoemSection
