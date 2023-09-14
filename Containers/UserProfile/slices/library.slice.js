import { createSlice } from '@reduxjs/toolkit'

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    list: [],
    v: 0,
    next_page: null,
    previous_page: null,
  },
  reducers: {
    setLibraryList(state, action) {
      return {
        list: action.payload.list,
        v: 1,
        next_page: action.payload.next_page,
        previous_page: action.payload.previous_page,
      }
    },
    addContentToLibraryList(state, action) {
      return {
        list: [...state.list, ...action.payload.list],
        v: state.v + 1,
        next_page: action.payload.next_page,
        previous_page: action.payload.previous_page,
      }
    },
  },
})

export const { setLibraryList, addContentToLibraryList } = librarySlice.actions

export const selectLibraryList = state => state.library

export default librarySlice.reducer
