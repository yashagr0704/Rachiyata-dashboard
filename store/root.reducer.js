import { combineReducers } from '@reduxjs/toolkit'
import userReducer from './slices/global/user.slice'
import workspaceNovelReducer from 'Containers/NovelDetails/slices/NovelList.slice'
import novelChapterListReducer from 'Containers/NovelDetails/slices/NovelChapterList.slice'
import workspacePoemReducer from 'Containers/PoemDetails/slices/PoemList.slice'
import poemChapterListReducer from 'Containers/PoemDetails/slices/PoemChapterList.slice'
import libraryReducer from 'Containers/UserProfile/slices/library.slice'

const rootReducer = combineReducers({
  user: userReducer,
  workspaceNovel: workspaceNovelReducer,
  novelChapterList: novelChapterListReducer,
  workspacePoem: workspacePoemReducer,
  poemChapterList: poemChapterListReducer,
  library: libraryReducer,
})

export default rootReducer
