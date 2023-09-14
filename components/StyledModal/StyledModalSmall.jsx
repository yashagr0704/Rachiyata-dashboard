import styled from '@emotion/styled'
import { Fade, Modal, Paper } from '@mui/material'

const StyledModalSmall = ({ children, open, handleClose, width, height }) => {
  return (
    <Root
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
        style: {
          background: 'transparent',
        },
      }}>
      <Fade in={open}>
        <Main elevation={8} {...{ width, height }}>
          {children}
        </Main>
      </Fade>
    </Root>
  )
}

export default StyledModalSmall
const Root = styled(Modal)`
  display: grid;
  place-items: center;
  background: #ffffff10;
  backdrop-filter: blur(12px);
`
const Main = styled(Paper)`
  width: 90vw;
  max-width: ${({ width }) => width};
  height: 70vh;
  height: ${({ height }) => height};
  /* background: #ffffff; */
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;
  gap: 0em 0em;
  grid-template-areas:
    '.'
    '.';
  border-radius: 10px;
  /* box-shadow: 0 6.2px 10px rgba(0, 0, 0, 0.07),
    0 11.9px 14.6px rgba(0, 0, 0, 0.049), 0 17.8px 17.1px rgba(0, 0, 0, 0.036),
    0 24.6px 18.8px rgba(0, 0, 0, 0.028), 0 33.1px 20.2px rgba(0, 0, 0, 0.023),
    0 43.5px 22.1px rgba(0, 0, 0, 0.019), 0 56px 26px rgba(0, 0, 0, 0.012),
    0 -24.6px 18.8px rgba(0, 0, 0, 0.028), 0 -33.1px 20.2px rgba(0, 0, 0, 0.023),
    0 -43.5px 22.1px rgba(0, 0, 0, 0.019), 0 -56px 26px rgba(0, 0, 0, 0.012); */
  overflow: hidden;
`
