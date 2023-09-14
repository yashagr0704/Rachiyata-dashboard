import React from 'react'
import styled from '@emotion/styled'
import { Button, CircularProgress, Typography } from '@mui/material'
import { FormProvider, useForm } from 'react-hook-form'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import { useCreateAccountAPI } from 'Containers/Auth/api/auth.hook'
import Link from 'next/link'
import StyledTextField from 'Containers/Auth/components/FormComponents/StyledTextField'
import StyledDateSelector from 'Containers/Auth/components/FormComponents/StyledDateSelector'
import StyledPasswordField from 'Containers/Auth/components/FormComponents/StyledPasswordField'
import StyledCheckbox from 'Containers/Auth/components/FormComponents/StyledCheckbox'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  StyledFieldGroup,
  StyledFormLabel,
  StyledRadioBox,
  StyledRadioGroup,
} from 'Containers/Auth/components/FormComponents/StyledRadio'
import useFormError from 'hooks/useFormError'
import * as yup from 'yup'

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

const schema = yup.object().shape({
  full_name: yup.string().required('Name is required'),
  username: yup.string().required('Username is required'),
  birth_date: yup.string().required('birthday is required'),
  bio: yup.string().required('Bio is required'),
  gender: yup.string().required('Gender is required'),
  password: yup.string().required('Password is required'),
})

const CreateAccountPage = () => {
  const { handleFormError } = useFormError()
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      full_name: '',
      username: '',
      email: localStorage.getItem('new-email') || '',
      bio: '',
      password: '',
      agree: false,
    },
  })
  const { handleCreateAccount, isLoading, isSuccess } = useCreateAccountAPI(handleFormError)

  return (
    <Root>
      <DeignsIcon />

      <Main>
        <Body>
          <FormProvider {...methods}>
            <TextSection>
              <TitleText variant="h4">Welcome</TitleText>
              <DescriptionText variant="subtitle2">Welcome back ! Please Enter Your details</DescriptionText>
            </TextSection>
            <StyledTextField name="full_name" label="Name" placeholder="Enter your name..." />
            <StyledTextField name="username" label="Username" placeholder="Enter your username..." />
            <StyledTextField name="email" label="Email" placeholder="Enter your email ..." />
            <StyledDateSelector name="birth_date" label="Birth Date" />

            <StyledTextField name="bio" label="Bio" placeholder="Enter your bio ..." multiline />
            <StyledFieldGroup>
              <StyledFormLabel>Select Gender</StyledFormLabel>
              <StyledRadioGroup name="gender" row>
                {GenderList.map(({ label, value }) => (
                  <StyledRadioBox key={value} label={label} value={value} />
                ))}
              </StyledRadioGroup>
            </StyledFieldGroup>
            <StyledPasswordField
              name="password"
              label="Password"
              Icon={LockOutlinedIcon}
              placeholder="Enter your password ..."
            />
            <BottomSection>
              <StyledCheckbox label="I agree to the Terms of Service and Privacy Policy !" name="agree" />
            </BottomSection>
            <Nav>
              <Link href="/login">
                <a>
                  <StyledButton disabled={isLoading}>Login</StyledButton>
                </a>
              </Link>

              <StyledButton
                disabled={!methods.watch('agree') || isLoading}
                startIcon={
                  isLoading && (
                    <CircularProgress size={14} thickness={5} sx={{ color: theme => theme.palette.grey[500] }} />
                  )
                }
                variant="contained"
                onClick={methods.handleSubmit(handleCreateAccount, handleFormError)}>
                Create Account
              </StyledButton>
            </Nav>
          </FormProvider>
        </Body>
      </Main>
    </Root>
  )
}

const Root = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (min-width: 480px) {
    background: ${({ theme }) => theme.palette.primary.main};
    background: linear-gradient(141deg, rgba(81, 34, 192, 1) 0%, #966afc 100%);
  }
  @media (max-width: 480px) {
    min-height: 900px;
    overflow: hidden;
    width: 100%;
  }
`

const Main = styled.div`
  display: grid;
  max-width: 400px;
  @media (min-width: 480px) {
    box-shadow: 10px 10px 20px 1px ${({ theme }) => theme.palette.primary.main}20,
      10px 10px 20px 1px ${({ theme }) => theme.palette.primary.main}10;
    border-radius: 10px;
  }
  @media (min-width: 480px) {
    overflow: hidden;
  }
`

const Body = styled.div`
  background: rgb(255, 255, 255);
  padding: 30px 25px;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 17px;

  @media (min-width: 480px) {
    max-height: calc(100vh - 20px);
    overflow-y: auto;
  }
`

const DeignsIcon = styled(MenuBookOutlinedIcon)`
  color: ${({ theme }) => theme.palette.primary.main}11;
  color: #ffffff11;
  font-size: 400px;
  position: absolute;
  top: -50px;
  right: -40px;
  transform: rotate(-45deg);
  @media (max-width: 480px) {
    font-size: 280px;
    color: ${({ theme }) => theme.palette.primary.main}1f;
  }
`

const BackgroundIcon = styled.img`
  position: absolute;
  width: 300px;
  bottom: 0px;
  right: 25px;
  rotate: -25deg;

  @media (max-width: 480px) {
    width: 250px;
    bottom: 0px;
    right: 15px;
    rotate: -25deg;
  }

  /* width: 300px; */
`

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 0px;
`

const TitleText = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.secondary.main};
  @media (max-width: 450px) {
    font-size: 2.7rem;
  }
`

const DescriptionText = styled(Typography)`
  font-weight: 500;
  margin-left: 4px;
  color: ${({ theme }) => theme.palette.secondary.main}a2;
`

const BottomSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  align-items: center;
`

const Nav = styled.div`
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
`

const StyledButton = styled(Button)`
  min-width: 80px;
  box-shadow: none;
  font-size: 0.95rem;
  font-weight: 600;
`

const StyledForgotPassword = styled(Button)`
  padding: 2px 7px 2px;
  border-radius: 4px;
`

export default CreateAccountPage
