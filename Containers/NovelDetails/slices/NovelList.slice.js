import { createSlice } from '@reduxjs/toolkit'

const filterDuplicate = array => Array.from(new Set(array))

export const workspaceNovelSlice = createSlice({
  name: 'workspaceNovel',
  initialState: {
    all: { list: [], v: 0, next_page: null, previous_page: null },
    draft: { list: [], v: 0, next_page: null, previous_page: null },
    published: { list: [], v: 0, next_page: null, previous_page: null },
    trash: { list: [], v: 0, next_page: null, previous_page: null },
  },
  reducers: {
    setWorkspaceNovelList(state, action) {
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
    addContentToWorkspaceNovelList(state, action) {
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

export const { setWorkspaceNovelList, addContentToWorkspaceNovelList } = workspaceNovelSlice.actions

export const selectWorkspaceNovelList = state => state.workspaceNovel

export default workspaceNovelSlice.reducer
