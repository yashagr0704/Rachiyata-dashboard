import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { Button, CircularProgress, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import StyledModal from './StyledModal'

const DeleteModal = ({ setOpen, open, messageNotice, onDelete, isLoading }) => {
  const handleClose = () => setOpen(false)

  // const style = {
  // 	bgcolor: 'background.paper',
  // 	boxShadow: 24,
  // 	p: 0.6,
  // 	borderRadius: '15px',
  // 	width: '20rem',
  // 	height: 'fit-content',
  // }

  const handleDelete = () => {
    onDelete()
    // handleClose()
  }
  return (
    <Root maxWidth="350px" maxHeight="fit-content" open={open} onClose={handleClose}>
      <Main>
        <Notice color="secondary" variant="subtitle2">
          {messageNotice}
        </Notice>
        <Nav>
          <StyledButton disabled={isLoading} variant="outlined" onClick={handleClose}>
            Cancel
          </StyledButton>

          <StyledButton
            disabled={isLoading}
            startIcon={
              isLoading && <CircularProgress size={14} thickness={5} sx={{ color: theme => theme.palette.grey[500] }} />
            }
            sx={{ background: !isLoading && `${red[400]} !important` }}
            variant="contained"
            onClick={handleDelete}>
            Delete
          </StyledButton>
        </Nav>
      </Main>
    </Root>
  )
}

DeleteModal.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  messageNotice: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default DeleteModal

const Root = styled(StyledModal)`
  padding: 0px;
  /* display: grid;
	place-items: center;
	background: #f0f0f022;
	backdrop-filter: blur(7px);
	outline: 0; */
`

const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  outline: none;
  outline: 0;
`

const Notice = styled(Typography)`
  padding: 1em;
  padding-top: 1.3em;
  padding-bottom: 0.2em;
  font-size: 0.95rem;
  text-align: center;
  font-weight: 700;
`

const Nav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 0.7em;
  grid-template-areas: '. .';
  padding: 1em;
`

const StyledButton = styled(Button)`
  border-radius: 11px;
  box-shadow: none;
  gap: 0.3rem;
`
