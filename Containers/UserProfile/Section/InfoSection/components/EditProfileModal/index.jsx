import styled from '@emotion/styled'
import { Button, FormLabel, Typography } from '@mui/material'
import StyledDateSelector from 'components/form-components/StyledDateSelector'
import { StyledRadioBox, StyledRadioGroup } from 'components/form-components/StyledRadio'
import StyledTextField from 'components/form-components/StyledTextField'
import { StyledModal } from 'components/StyledModal'
import { useUpdateProfileAPI } from 'Containers/UserProfile/api/userProfile.hook'
import React, { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import PhotoUploader from './components/PhotoUploader'

const GenderList = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Others',
    value: 'others',
  },
]

const EditProfileModal = ({ open, setOpen }) => {
  const { handleUpdateProfile, isLoading, isSuccess } = useUpdateProfileAPI()
  const { data } = useSelector(store => store.user)

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const methods = useForm({
    defaultValues: {
      profile_pic: [data.profile_pic],
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      birth_date: data.birth_date,
      gender: data.gender,
      bio: data.bio,
    },
  })

  useEffect(() => {
    methods.reset({
      profile_pic: [data.profile_pic],
      full_name: data.full_name,
      username: data.username,
      email: data.email,
      birth_date: data.birth_date,
      gender: data.gender,
      bio: data.bio,
    })
  }, [open, data, methods])

  return (
    <Root maxWidth="30rem" maxHeight="fit-content" open={open} handleClose={handleClose} customBarackPoint={400}>
      <Main>
        <Title variant="h4" color="secondary">
          Update Profile
        </Title>
        <FormProvider {...methods}>
          <PhotoUploader name="profile_pic" />
          <StyledTextField name="full_name" label="Full Name" placeholder="Full here..." />
          <StyledTextField name="username" label="Username" placeholder="Username here..." />
          <StyledTextField name="email" type="email" label="Email" placeholder="Email here..." />
          <StyledDateSelector name="birth_date" label="Birth Date" placeholder="Chapter name here..." />
          <StyledTextField name="bio" label="Bio" placeholder="Bio here..." multiline />
          <FieldGroup>
            <StyledFormLabel>Select Gender</StyledFormLabel>
            <StyledRadioGroup name="gender" row>
              {GenderList.map(({ label, value }) => (
                <StyledRadioBox key={value} label={label} value={value} />
              ))}
            </StyledRadioGroup>
          </FieldGroup>
        </FormProvider>

        <Bottom>
          <StyledButton variant="outlined">Cancel</StyledButton>
          <StyledButton variant="contained" onClick={methods.handleSubmit(handleUpdateProfile)}>
            Save
          </StyledButton>
        </Bottom>
      </Main>
    </Root>
  )
}

const Root = styled(StyledModal)`
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 25px;
`

const Main = styled.div`
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

const FieldGroup = styled.form`
  gap: 0.2em;
  display: flex;
  flex-direction: column;
`

const StyledFormLabel = styled(FormLabel)`
  color: ${({ theme }) => theme.palette?.secondary?.main};
  font-weight: 500;
  font-size: 0.9rem;
`

export default EditProfileModal
