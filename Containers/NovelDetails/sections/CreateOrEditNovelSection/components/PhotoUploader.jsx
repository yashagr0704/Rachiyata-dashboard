import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera'
import styled from '@emotion/styled'
import { ListItemButton } from '@mui/material'
import { useController, useFormContext } from 'react-hook-form'

const PhotoUploader = ({ name, small }) => {
  const [filePreview, setFilePreview] = useState('')
  const { control } = useFormContext()

  const { field } = useController({
    name,
    control,
    defaultValue: [],
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
    <Root onClick={handleBrowseButton} small={small ? 'true' : 'false'}>
      {filePreview && <ImagePreview small={small ? 'true' : 'false'} src={filePreview} alt="" />}
      {!filePreview && <PhotoCameraIcon small={small ? 'true' : 'false'} color="secondary" />}
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

PhotoUploader.propTypes = {
  name: PropTypes.string.isRequired,
}

export default PhotoUploader

const Root = styled(ListItemButton)`
  width: 110px;
  height: 110px;
  background: ${({ theme }) => theme.palette.primary.main}12;
  border-radius: ${({ small }) => (small === 'true' ? '9px' : '12px')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  aspect-ratio: ${({ small }) => (small === 'true' ? '355/476' : '350/466.66')};
  width: ${({ small }) => (small === 'true' ? 'calc(66px / 100 * 108)' : 'calc(350px / 100 * 65)')};
  height: ${({ small }) => (small === 'true' ? 'calc(88.5px / 100 * 108)' : 'calc(466px / 100 *65)')};
`

const ImagePreview = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
  aspect-ratio: ${({ small }) => (small === 'true' ? '355/476' : '350/466.66')};
`
