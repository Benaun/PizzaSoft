import { EmployeeId, IEmployee } from "../store/employees.slice";

const URL = 'http://localhost:5000/employees'

export const api = {
  fetchEmployees: async (): Promise<IEmployee[] | undefined> => {
    try {
      const response = await fetch(URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const result: IEmployee[] = await response.json()
      return result
    } catch (error) {
      console.log('Ошибка при получении сотрудников', error)
    }
  },

  fetchEmployee: async (id: EmployeeId): Promise<IEmployee | undefined> => {
    try {
      const response = await fetch(`URL/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const result: IEmployee = await response.json()
      return result
    } catch (error) {
      console.log(`Неудалось получить пользователя с ID ${id}`, error)
    }
  },

  deleteEmployee: async (id: EmployeeId): Promise<IEmployee | undefined> => {
    try {
      const response = await fetch(`URL/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const result: IEmployee = await response.json()
      return result
    } catch (error) {
      console.log(`Неудалось удалить пользователя с ID ${id}`, error)
    }
  }
}