import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import rootReducer from './root.reducer'
import storage from '../utility/webStore'
import { FLUSH, REHYDRATE, PAUSE } from 'redux-persist'
import { PERSIST, PURGE, REGISTER } from 'redux-persist'
import { setAuthToken } from '../api/global.api'
import { selectUser } from './slices/global/user.slice'
import { authTokenHandles } from '../api/global.hook'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'],  
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'

const saveAuthToken = store => next => action => {
  const { getAccess } = authTokenHandles()

  if (action.type === LOGIN_SUCCESS) {
    setAuthToken(getAccess)
  }

  return next(action)
}

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([saveAuthToken]),
})

export default store
