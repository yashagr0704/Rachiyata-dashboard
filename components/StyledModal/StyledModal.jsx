import styled from '@emotion/styled'
import { IconButton, Modal } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useState } from 'react'
import useImperativeTimeout from 'hooks/useImperativeTimeout'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

const StyledModal = ({
  children,
  open,
  handleClose,
  customBarackPoint,
  title,
  BodyStyle,
  refetch,
  scrollX,
  MainStyle,
  refetchLoading,
  background,
  maxWidth,
  maxHeight,
  ...props
}) => {
  const [isModalOpen, setIsModalOpen] = useState(open)

  const { set, clear } = useImperativeTimeout(() => {
    setIsModalOpen(false)
  }, 300)

  useEffect(() => {
    if (open === false) set()
    else {
      setIsModalOpen(true)
      clear()
    }
  }, [clear, open, set])

  const MainVariants = {
    visible: {
      y: open ? 0 : -1000,
      opacity: open ? 1 : 0,
    },
    hidden: {
      y: -1000,
      opacity: 0.5,
    },
  }

  const rootProps = {
    open: isModalOpen,
    onClose: handleClose,
    closeAfterTransition: true,
    BackdropProps: {
      timeout: 300,
      style: {
        background: 'transparent',
        outline: 0,
      },
    },
  }

  const mainProps = {
    custom_barack_point: customBarackPoint,
    style: MainStyle,
    initial: 'hidden',
    animate: 'visible',
    variants: MainVariants,
    transition: {
      default: { duration: 0.3 },
    },
  }

  return (
    <Root aria-labelledby={title} aria-describedby={title} custom_barack_point={customBarackPoint} {...rootProps}>
      <Main
        custom_barack_point={customBarackPoint}
        background={background}
        max_width={maxWidth}
        max_height={maxHeight}
        {...mainProps}>
        <Body scrollX={scrollX} style={BodyStyle} {...props}>
          <StyledIconButton color="primary" onClick={handleClose}>
            <CloseRoundedIcon />
          </StyledIconButton>
          {children}
        </Body>
      </Main>
    </Root>
  )
}

export default StyledModal

const Root = styled(Modal)`
  display: grid;
  place-items: center;
  background: #ffffff10;
  backdrop-filter: blur(7px);
  @media (max-width: ${({ custom_barack_point }) => custom_barack_point}px) {
    backdrop-filter: blur(4px);
  }
  outline: 0;
`

const Main = styled(motion.div)`
  outline: 0;

  width: 90vw;
  max-width: ${({ theme, max_width }) => (max_width ? max_width : `60rem`)};

  height: ${({ theme, max_height }) => (max_height === 'fit-content' ? max_height : `86vh`)};
  max-height: ${({ theme, max_height }) =>
    max_height ? (max_height === 'fit-content' ? `86vh` : max_height) : `81rem`};

  transition: height 0.7s ease-out;
  transition: max-height 0.7s ease-out;

  background: ${({ background }) => (background ? background : `#fffffff2`)};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  border-radius: 6px;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  overflow: hidden;
  position: relative;

  box-shadow: 0 6.2px 10px rgba(0, 0, 0, 0.07), 0 11.9px 14.6px rgba(0, 0, 0, 0.049),
    0 17.8px 17.1px rgba(0, 0, 0, 0.036), 0 24.6px 18.8px rgba(0, 0, 0, 0.028), 0 33.1px 20.2px rgba(0, 0, 0, 0.023),
    0 43.5px 22.1px rgba(0, 0, 0, 0.019), 0 56px 26px rgba(0, 0, 0, 0.012), 0 -24.6px 18.8px rgba(0, 0, 0, 0.028),
    0 -33.1px 20.2px rgba(0, 0, 0, 0.023), 0 -43.5px 22.1px rgba(0, 0, 0, 0.019), 0 -56px 26px rgba(0, 0, 0, 0.012);

  @media (max-width: ${({ custom_barack_point }) => custom_barack_point}px) {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0px;
  }
`

const Body = styled.div`
  max-width: 65rem;
  padding: 0px 27px 15px;
  overflow-y: auto;
  padding-top: 0px;
  border-top: 6px solid ${props => props.theme.palette.primary.main};
`

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 5px;
  top: 10px;
  display: none;
  @media (max-width: 400px) {
    display: flex;
  }
`
