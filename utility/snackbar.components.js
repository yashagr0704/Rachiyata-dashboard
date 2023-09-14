/* eslint-disable react/no-multi-comp */
import { forwardRef, useCallback } from 'react'
import { SnackbarContent, useSnackbar } from 'notistack'
import { Alert } from '@mui/material'
/* eslint-disable react/prop-types */

const SuccessSnackbar = forwardRef(({ id, message }, ref) => {
	const { closeSnackbar } = useSnackbar()

	const handleDismiss = useCallback(() => {
		closeSnackbar(id)
	}, [id, closeSnackbar])

	return (
		<SnackbarContent ref={ref} role="alert">
			<Alert onClose={handleDismiss} severity="success" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</SnackbarContent>
	)
})

SuccessSnackbar.displayName = 'SuccessSnackbar'

export const ErrorSnackbar = forwardRef(({ id, message }, ref) => {
	const { closeSnackbar } = useSnackbar()

	const handleDismiss = useCallback(() => {
		closeSnackbar(id)
	}, [id, closeSnackbar])

	return (
		<SnackbarContent ref={ref} role="alert">
			<Alert onClose={handleDismiss} severity="error" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</SnackbarContent>
	)
})

ErrorSnackbar.displayName = 'ErrorSnackbar'

export const WarnSnackbar = forwardRef(({ id, message }, ref) => {
	const { closeSnackbar } = useSnackbar()

	const handleDismiss = useCallback(() => {
		closeSnackbar(id)
	}, [id, closeSnackbar])

	return (
		<SnackbarContent ref={ref} role="alert">
			<Alert onClose={handleDismiss} severity="warning" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</SnackbarContent>
	)
})

WarnSnackbar.displayName = 'WarnSnackbar'

export const InfoSnackbar = forwardRef(({ id, message }, ref) => {
	const { closeSnackbar } = useSnackbar()

	const handleDismiss = useCallback(() => {
		closeSnackbar(id)
	}, [id, closeSnackbar])

	return (
		<SnackbarContent ref={ref} role="alert">
			<Alert onClose={handleDismiss} severity="info" sx={{ width: '100%' }}>
				{message}
			</Alert>
		</SnackbarContent>
	)
})

InfoSnackbar.displayName = 'InfoSnackbar'

const snackbarComponents = {
	success: SuccessSnackbar,
	error: ErrorSnackbar,
	warn: WarnSnackbar,
	info: InfoSnackbar,
}

export default snackbarComponents
