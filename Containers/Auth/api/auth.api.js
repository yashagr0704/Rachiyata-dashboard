import { ApiInstance } from 'api/global.api'

export const createAccountAPI = ({ username, email, password, bio, full_name, birth_date, gender }) => {
  return ApiInstance({
    url: '/register/',
    method: 'POST',
    data: { user: { username, email, password, bio, full_name, birth_date, gender } },
  })
}

export const loginAPI = ({ email, password }) => {
  return ApiInstance({
    url: '/login/',
    method: 'POST',
    data: { user: { email, password } },
  })
}

export const generateOTPByEmailAPI = ({ email }) => {
  return ApiInstance({
    url: '/user/generateOTP',
    method: 'POST',
    data: { email },
  })
}

export const generateOTPByTokenAPI = () => {
  return ApiInstance({
    url: '/user/generateOTP',
    method: 'GET',
  })
}

export const changeEmailAPI = ({ email, otp }) => {
  return ApiInstance({
    url: '/user/changeEmail',
    method: 'PATCH',
    data: { email, otp },
  })
}

export const changePasswordAPI = ({ email, otp, password }) => {
  return ApiInstance({
    url: '/user/changePassword',
    method: 'POST',
    data: { email, otp, password },
  })
}

export const verifyEmailAPI = ({ email, otp }) => {
  return ApiInstance({
    url: '/user/verifyEmail',
    method: 'POST',
    data: { email, otp },
  })
}

export const fetchUserDataAPI = () => {
  return ApiInstance({
    url: '/user/',
    method: 'GET',
  })
}

export const logoutUserAPI = () => {
  return ApiInstance({
    url: '/logout/',
    method: 'POST',
  })
}
