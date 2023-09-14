import { IconButton } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import styled from '@emotion/styled'
import RefetchButton from 'components/StyledButton/RefetchButton'

const ModalHeader = ({ onClose, refetch, refetchLoading }) => {
  return (
    <Root>
      {refetch && <RefetchButton {...{ refetch, refetchLoading }} />}
      <IconButton color="primary" onClick={onClose}>
        <CloseRoundedIcon />
      </IconButton>
    </Root>
  )
}

export default ModalHeader

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: -7px;
`
