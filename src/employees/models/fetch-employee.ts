import { EmployeeId, employeesSlice } from "../../store/employees.slice";
import { AppThunk } from "../../store/store";

export const fetchEmployee = (id: EmployeeId): AppThunk =>
  (dispatch, getState, { api }) => {
    const isPending = employeesSlice.selectors.selectIsCurrentEmployeePending(getState())
    if (!isPending) return

    dispatch(employeesSlice.actions.fetchCurrentEmployeePanding())

    try {
      api.fetchEmployee(id).then((employee) => {
        if (employee) {
          dispatch(employeesSlice.actions.fetchCurrentEmployeeSuccess({ employee }))
        }
      })
    } catch (error) {
      console.log(error)
      dispatch(employeesSlice.actions.fetchCurrentEmployeeFailed())
    }
  }