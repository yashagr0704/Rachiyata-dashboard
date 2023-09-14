import { ApiInstance } from 'api/global.api'
import moment from 'moment'

// const API_URL = '/potentialstartletbook/'

export const fetchLibraryAPI = () => {
  return ApiInstance({
    url: '/userbooklibrary/',
    method: 'GET',
    // headers: {
    //   authorization:
    //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc3MjU1NDk4LCJpYXQiOjE2NzU5NTk0OTgsImp0aSI6ImE5ZjQzMWZmMmNmOTRmOWFiMDljYzk4Yjc2YzlhOTY2IiwidXNlcl9pZCI6ImU1ZWQ1NWI4LTNiMDMtNGViOS1hNzE2LTlmNGU1OWZlOGNjYiJ9.V7JorHaUEbAa78yzdIuu7ii7enDnDPWhLg0lmQlvIbw',
    // },
  })
}
export const addToLibraryAPI = book_id => {
  return ApiInstance({
    url: '/userbooklibrary/',
    method: 'POST',
    data: { book_id },
  })
}

export const UpdateUserProfileAPI = data => {
  const form = new FormData()

  if (data?.profile_pic?.length && typeof data?.profile_pic[0] !== 'string')
    form.append('profile_pic', data.profile_pic[0])
  if (data?.profile_banner?.length) form.append('profile_banner', data.profile_banner[0])

  if (data?.full_name) form.append('full_name', data?.full_name)
  if (data?.username) form.append('username', data?.username)
  if (data?.email) form.append('email', data?.email)
  if (data?.birth_date) form.append('birth_date', moment(data?.birth_date).format('YYYY-MM-DD'))
  if (data?.bio) form.append('bio', data?.bio)
  if (data?.gender) form.append('gender', data?.gender)

  return ApiInstance({
    url: '/user/',
    method: 'PUT',
    data: form,
  })
}
