import React from 'react'
import styled from '@emotion/styled'

import { useEffect, useRef, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { useUpdateProfileAPI } from 'Containers/UserProfile/api/userProfile.hook'
import { useSelector } from 'react-redux'
import { selectUser } from 'store/slices/global/user.slice'
import { Button } from '@mui/material'

import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'

const BannerSection = ({ text }) => {
  const { data } = useSelector(selectUser)

  const { handleUpdateProfile, isLoading, isSuccess } = useUpdateProfileAPI()
  const [filePreview, setFilePreview] = useState('')

  const name = 'profile_banner'

  const { control, handleSubmit } = useForm({
    defaultValues: {
      profile_banner: data?.profile_banner ? [data?.profile_banner] : [],
    },
  })

  const { field } = useController({
    name,
    control,
    profile_banner: data?.profile_banner ? [data?.profile_banner] : [],
  })

  const { onChange, value } = field

  const fileInput = useRef(null)

  const handleBrowseButton = () => {
    fileInput.current?.click()
  }

  // const handleDeleteFile = () => {
  // 	setFilePreview('')
  // 	onChange([])
  // }

  const handleFileInput = e => {
    const file = e.target.files[0]
    if (file) setFilePreview(URL.createObjectURL(file))

    // if (file.size === 0) 'File size cannot exceed more than 1MB'
    // else

    const files = e.target.files
    if (files.length) {
      const newFilePreviewList = []
      for (let index = 0; index < files.length; index += 1) {
        const file = files[index]
        newFilePreviewList.push(file)
      }

      onChange(newFilePreviewList)
    }
  }

  useEffect(() => {
    if (value.length && value?.[0]?.length > 6) {
      setFilePreview(value?.[0])
    }

    return () => {}
  }, [value])

  return (
    <Root>
      {filePreview && (
        <StyledSaveButton onClick={handleSubmit(handleUpdateProfile)} color="secondary" variant="contained">
          Save
        </StyledSaveButton>
      )}

      <StyledEditButton onClick={handleBrowseButton} color="primary" variant="contained">
        <ModeEditOutlinedIcon style={{ fontSize: 20 }} />
      </StyledEditButton>

      {filePreview && <StyledImage src={filePreview} alt="Profile Art" />}
      {!filePreview && <PhotoCameraIcon fontSize="large" color="secondary" />}
      <input
        name={name}
        type="file"
        value={value?.[0]?.filename || ''}
        ref={fileInput}
        onChange={handleFileInput}
        style={{ display: 'none' }}
        accept="image/*"
      />
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  height: 271px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  overflow: hidden;
  background: ${props => props.theme.palette.primary.main}19;
  margin-top: calc(var(--main-side-spacing));
  margin-inline: var(--main-side-spacing);
  max-width: var(--main-max-width);
  width: calc(100% - var(--main-side-spacing) * 2);
  align-self: center;
  object-fit: cover;

  @media (max-width: 500px) {
    height: 220px;
  }

  @media (max-width: 400px) {
    height: 170px;
    /* width: calc(100%); */
    border-radius: 15px;
    /* margin-top: 0px; */
  }
`

const StyledEditButton = styled(Button)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: 0px;
  right: 0px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  z-index: 10;
  padding: 0px;
  min-width: 40px;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`

const StyledSaveButton = styled(Button)`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
  position: absolute;
  bottom: 0px;
  right: 30px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 0px;
  z-index: 10;
  padding: 0px;
  min-width: 80px;
  min-height: 40px;
  padding-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`

const StyledImage = styled.img`
  /* height: 100%; */
  /* height: 271px; */
  width: 100%;
  object-fit: cover;

  @media (max-width: 500px) {
    height: 220px;
  }

  @media (max-width: 400px) {
    height: 170px;
    /* width: calc(100%); */
    border-radius: 15px;
    /* margin-top: 0px; */
  }
`

export default BannerSection
