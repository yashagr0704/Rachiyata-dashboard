import { createSlice } from '@reduxjs/toolkit'

const filterDuplicate = array => Array.from(new Set(array))

export const novelChapterListSlice = createSlice({
  name: 'novelChapterList',
  initialState: {
    all: { list: [], v: 0, next_page: null, previous_page: null },
    draft: { list: [], v: 0, next_page: null, previous_page: null },
    published: { list: [], v: 0, next_page: null, previous_page: null },
    trash: { list: [], v: 0, next_page: null, previous_page: null },
  },
  reducers: {
    setNovelChapterList(state, action) {
      return {
        ...state,
        [action.payload.tab]: {
          list: action.payload.list,
          v: 1,
          next_page: action.payload.next_page,
          previous_page: action.payload.previous_page,
        },
      }
    },
    addContentToNovelChapterList(state, action) {
      return {
        ...state,
        [action.payload.tab]: {
          list: filterDuplicate([...state[action.payload.tab].list, ...action.payload.list]),
          v: state.v + 1,
          next_page: action.payload.next_page,
          previous_page: action.payload.previous_page,
        },
      }
    },
  },
})

export const { setNovelChapterList, addContentToNovelChapterList } = novelChapterListSlice.actions

export const selectNovelChapterList = state => state.novelChapterList

export default novelChapterListSlice.reducer
