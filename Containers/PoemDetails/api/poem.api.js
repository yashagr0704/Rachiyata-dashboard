import { ApiInstance } from 'api/global.api'

export const fetchMyPoemListAPI = (page, filter) => {
  return ApiInstance({
    url: '/mypoem/',
    method: 'GET',
    params: {
      page,
      tab: filter,
    },
  })
}
export const fetchPoemDetail = poemId => {
  return ApiInstance({
    url: `poem/${poemId}`,
    method: 'GET',
  })
}

export const deletePoemDetail = poemId => {
  return ApiInstance({
    url: `poem/${poemId}`,
    method: 'DELETE',
  })
}

export const fetchCategoryAPI = () => {
  return ApiInstance({
    url: '/category/',
    method: 'GET',
  })
}

export const fetchChapterListAPI = (poemId, page, filter) => {
  return ApiInstance({
    url: `/poem/${poemId}/chapter`,
    method: 'GET',
    params: {
      page,
      tab: filter,
    },
  })
}

export const fetchChapterAPI = (poemId, chapterId) => {
  return ApiInstance({
    url: `/poem/${poemId}/chapter/${chapterId}`,
    method: 'GET',
  })
}

export const deleteChapterAPI = (poemId, chapterId) => {
  return ApiInstance({
    url: `/poem/${poemId}/chapter/${chapterId}`,
    method: 'DELETE',
  })
}

export const checkPoemNameAPI = poemName => {
  return ApiInstance({
    url: '/checkpoemname/',
    method: 'GET',
    params: {
      poem_name: poemName,
    },
  })
}

export const createOrUpdatePoemAPI = data => {
  const checkIsImage = file => {
    return typeof file === 'object' && file?.length && typeof file[0] !== 'string'
  }
  const form = new FormData()

  if (checkIsImage(data?.cover_img1)) form.append('cover_img1', data.cover_img1[0])
  if (checkIsImage(data?.cover_img2)) form.append('cover_img2', data.cover_img2[0])
  if (checkIsImage(data?.cover_img3)) form.append('cover_img3', data.cover_img3[0])
  if (checkIsImage(data?.cover_img4)) form.append('cover_img4', data.cover_img4[0])

  if (data?.poem_name) form.append('poem_name', data?.poem_name)
  if (data?.alternate_name) form.append('alternate_name', data?.alternate_name)
  if (data?.lang) form.append('lang', data?.lang)
  if (data?.status) form.append('status', data?.status)
  if (data?.synopsis !== undefined) form.append('synopsis', data?.synopsis)
  if (data?.category_id) form.append('category_id', Number(data?.category_id))
  if (data?.tags?.length)
    form.append(
      'tags',
      data?.tags?.filter(value => value.replace(' ', '') !== ''),
    )

  form.append('is_published', data?.is_published ? 'True' : 'False')

  return ApiInstance({
    url: `/poem/${data?.poemId || ''}`,
    method: 'POST',
    data: form,
  })
}

export const createOrUpdatePoemChapterAPI = data => {
  const form = new FormData()

  if (data?.poem_id) form.append('poem_id', data?.poem_id)
  if (data?.chapter_title) form.append('chapter_title', data?.chapter_title)
  if (data?.chapter_sequence) form.append('chapter_sequence', data?.chapter_sequence)
  if (data?.author_note) form.append('author_note', data?.author_note)
  if (data?.chapter_content !== undefined) form.append('chapter_content', data?.chapter_content)

  form.append('is_published', data?.is_published ? 'True' : 'False')

  return ApiInstance({
    url: `/poem/${data?.poem_id || ''}/chapter${data?.id ? '/' + data?.id : ''}`,
    method: 'POST',
    data: form,
  })
}
