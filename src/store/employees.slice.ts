import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type EmployeeId = string
export type EmployeesRole = 'driver' | 'cook' | 'waiter'

export interface IEmployee {
  id: EmployeeId,
  name: string,
  isArchive: boolean,
  role: EmployeesRole,
  phone: string,
  birthday: string
}

type EmployeesState = {
  entities: Record<EmployeeId, IEmployee | undefined>,
  ids: EmployeeId[],
  employeesStatus: 'idle' | 'pending' | 'success' | 'failed',
  currentEmployeeStatus: 'idle' | 'pending' | 'success' | 'failed'
}

const initialEpmloyeesState: EmployeesState = {
  entities: {},
  ids: [],
  employeesStatus: 'idle',
  currentEmployeeStatus: 'idle'
}



export const employeesSlice = createSlice({
  name: 'employees',
  initialState: initialEpmloyeesState,
  selectors: {
    selectEmployeeById: (state, epmloyeeId: EmployeeId) => state.entities[epmloyeeId],
    selectAllEmployees: createSelector(
      (state: EmployeesState) => state.ids,
      (state: EmployeesState) => state.entities,
      (ids, entities) =>
        ids
          .map((id) => entities[id])
          .filter((employee): employee is IEmployee => !!employee)
    ),
    selectIsEmployeesPending: (state) => state.employeesStatus === 'pending',
    selectIsEmployeesIdle: (state) => state.employeesStatus === 'idle',
    selectIsCurrentEmployeePending: (state) => state.currentEmployeeStatus === 'pending'
  },
  reducers: {
    fetchEmployeesPending: (state) => {
      state.employeesStatus = 'pending'
    },

    fetchEmployeesSuccess: (state, action: PayloadAction<{ employees: IEmployee[] }>) => {
      const { employees } = action.payload

      state.employeesStatus = 'success'
      state.entities = employees.reduce((acc, employee) => {
        acc[employee.id] = employee
        return acc
      }, {} as Record<EmployeeId, IEmployee>)
      state.ids = employees.map((employee) => employee.id)
    },

    fetchEmployeesFailed: (state) => {
      state.employeesStatus = 'failed'
    },

    fetchCurrentEmployeePanding: (state) => {
      state.currentEmployeeStatus = 'pending'
    },

    fetchCurrentEmployeeSuccess: (state, action: PayloadAction<{ employee: IEmployee }>) => {
      const { employee } = action.payload

      state.currentEmployeeStatus = 'success'
      state.entities[employee.id] = employee
    },

    fetchCurrentEmployeeFailed: (state) => {
      state.currentEmployeeStatus = 'failed'
    }
  }
})