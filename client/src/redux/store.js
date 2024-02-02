import { combineReducers, configureStore } from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice' //uvezli smo userSlice.reducer
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


//kad instaliramo redux persist idemo u store.
const rootReducer = combineReducers({
  user: userReducer
})

const persistConfig = {
  key:'root',
  storage,
  version:1
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,//{user:userReducer}, umjesto ovoga satvio sam persistedReducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ //ovaj dio je znacajan da izbjegnemo greske kasnije
    serializableCheck: false, //ovaj dio
  })

  }
)

export const persistor = persistStore(store)