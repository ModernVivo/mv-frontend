import { configureStore } from "@reduxjs/toolkit";
import { coreApi } from "./services/core";
import rootReducer from './slices';

const store = configureStore({
  reducer: {
    ...rootReducer,
    // Add the generated reducer as a specific top-level slice
    [coreApi.reducerPath]: coreApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(coreApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
