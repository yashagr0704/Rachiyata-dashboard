import { createSlice } from '@reduxjs/toolkit'

const filterDuplicate = array => Array.from(new Set(array))

export const workspacePoemSlice = createSlice({
  name: 'workspacePoem',
  initialState: {
    all: { list: [], v: 0, next_page: null, previous_page: null },
    draft: { list: [], v: 0, next_page: null, previous_page: null },
    published: { list: [], v: 0, next_page: null, previous_page: null },
    trash: { list: [], v: 0, next_page: null, previous_page: null },
  },
  reducers: {
    setWorkspacePoemList(state, action) {
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
    addContentToWorkspacePoemList(state, action) {
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

export const { setWorkspacePoemList, addContentToWorkspacePoemList } = workspacePoemSlice.actions

export const selectWorkspacePoemList = state => state.workspacePoem

export default workspacePoemSlice.reducer
