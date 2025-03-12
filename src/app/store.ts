import { configureStore } from "@reduxjs/toolkit";
import { rtkQueryErrorLogger } from "./rtkQueryErrorLogger";
import { api } from "@/shared/api";

export const store = configureStore({
  reducer: { api: api.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
