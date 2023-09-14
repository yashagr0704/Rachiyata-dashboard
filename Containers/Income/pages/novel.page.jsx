import styled from '@emotion/styled'
import { Alert, AlertTitle, Typography } from '@mui/material'
import React from 'react'

const NovelIncomePage = () => {
  return (
    <Root>
      <Alert severity="info" color="primary">
        <StyledAlertTitle fontWeight={600}>
          Your monetization will be enabled when you satisfy the following requirement
        </StyledAlertTitle>
        <Typography fontWeight={500} variant="subtitle1" color="secondary">
          An alert can have an action, such as a close or undo button. It is rendered after the message, at the end of
          the alert. If an onClose callback is provided and no action prop is set, a close icon is displayed. The action
          prop can be used to provide an alternative action, for example using a Button or IconButton. An alert can have
          an action, such as a close or undo button. It is rendered after the message, at the end of the alert. If an
          onClose callback is provided and no action prop is set, a close icon is displayed. The action prop can be used
          to provide an alternative action, for example using a Button or IconButton. An alert can have an action, such
          as a close or undo button. It is rendered after the message, at the end of the alert. If an onClose callback
          is provided and no action prop is set, a close icon is displayed. The action prop can be used to provide an
          alternative action, for example using a Button or IconButton.
        </Typography>
      </Alert>
    </Root>
  )
}

const StyledAlertTitle = styled(AlertTitle)`
  font-weight: 600;
  font-size: 1.3rem;
`
const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  gap: 20px;
`

export default NovelIncomePage
