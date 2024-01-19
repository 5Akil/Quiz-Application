import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '../services/userApi'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { quizApi } from '../services/quizApi'
import { adminApi } from '../services/adminApi'
import { resultApi } from '../services/resultApi'
import { newAccessTokenApi } from '../services/newAccessToken'

export const store = configureStore({
  reducer: {

    [userApi.reducerPath]: userApi.reducer,
    [quizApi.reducerPath]: quizApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [resultApi.reducerPath]: resultApi.reducer,
    [newAccessTokenApi.reducerPath]: newAccessTokenApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(
        userApi.middleware,
        quizApi.middleware,
        adminApi.middleware,
        resultApi.middleware,
        newAccessTokenApi.middleware,
      ),
})


setupListeners(store.dispatch)
