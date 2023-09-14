import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addContentToWorkspaceNovelList,
  selectWorkspaceNovelList,
  setWorkspaceNovelList,
} from '../../NovelDetails/slices/NovelList.slice'
import { fetchMyBookListAPI } from './workspace.api'
