import { configureStore, createSelector, ThunkAction, UnknownAction } from "@reduxjs/toolkit";
import { employeesSlice } from "./employees.slice";
import { useDispatch, useSelector, useStore } from "react-redux";
import { api } from "../api/api";

const extraArgument = {
  api
}

export const store = configureStore({
  reducer: {
    [employeesSlice.name]: employeesSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument } })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<R = void> = ThunkAction<R, RootState, typeof extraArgument, UnknownAction>

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<typeof store>()
export const createAppSelector = createSelector.withTypes<RootState>()