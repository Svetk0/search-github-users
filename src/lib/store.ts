import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { githubApi } from '@/api/github';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [githubApi.reducerPath]: githubApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
  });
};

setupListeners(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
