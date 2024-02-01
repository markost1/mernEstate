import { configureStore } from '@reduxjs/toolkit'
import  userReducer  from './user/userSlice' //uvezli smo userSlice.reducer


export const store = configureStore({
  reducer: {user:userReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ //ovaj dio je znacajan da izbjegnemo greske kasnije
    serializableCheck: false, //ovaj dio
  })

  }
)

// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
//export type AppDispatch = typeof store.dispatch