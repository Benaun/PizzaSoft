import { employeesSlice } from "../../store/employees.slice";
import { AppThunk } from "../../store/store";

export const fetchEmployees = (): AppThunk =>
  (dispatch, getState, { api }) => {
    const isIdle = employeesSlice.selectors.selectIsEmployeesIdle(getState())

    if (!isIdle) return

    dispatch(employeesSlice.actions.fetchEmployeesPending())

    try {
      api.fetchEmployees().then((employees) => {
        if (employees) {
          dispatch(employeesSlice.actions.fetchEmployeesSuccess({ employees }))
        }
      })
    } catch (error) {
      console.log(error)
      dispatch(employeesSlice.actions.fetchEmployeesFailed())
    }
  }