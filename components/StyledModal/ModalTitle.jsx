import styled from '@emotion/styled'

const ModalTitle = ({ children }) => {
  return <Root>{children}</Root>
}

export default ModalTitle

const Root = styled.strong`
  font-size: 2.0243rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main}dd;
`
