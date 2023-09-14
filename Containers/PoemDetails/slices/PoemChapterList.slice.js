import { createSlice } from '@reduxjs/toolkit'

const filterDuplicate = array => Array.from(new Set(array))

export const poemChapterListSlice = createSlice({
  name: 'poemChapterList',
  initialState: {
    all: { list: [], v: 0, next_page: null, previous_page: null },
    draft: { list: [], v: 0, next_page: null, previous_page: null },
    published: { list: [], v: 0, next_page: null, previous_page: null },
    trash: { list: [], v: 0, next_page: null, previous_page: null },
  },
  reducers: {
    setPoemChapterList(state, action) {
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
    addContentToPoemChapterList(state, action) {
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

export const { setPoemChapterList, addContentToPoemChapterList } = poemChapterListSlice.actions

export const selectPoemChapterList = state => state.poemChapterList

export default poemChapterListSlice.reducer
