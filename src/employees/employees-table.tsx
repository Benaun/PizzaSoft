import { useEffect, useState } from "react";
import { compareAsc, compareDesc } from 'date-fns'
import { employeesSlice } from "../store/employees.slice";
import { useAppStore, useAppDispatch, useAppSelector } from "../store/store";
import { fetchEmployees } from "./models/fetch-employees";
import EmployeesRow from "./employees-row";
import { parseDate } from "../assets";

export default function EmployesTable() {
  const dispatch = useAppDispatch()
  const appStore = useAppStore()
  const [sortNameOrder, setSortNameOrder] = useState<'asc' | 'desc'>('asc');
  const [sortDateOrder, setSortDateOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<'name' | 'date'>('name')

  const isPending = useAppSelector(employeesSlice.selectors.selectIsEmployeesPending)
  const employees = useAppSelector((state) => employeesSlice.selectors.selectAllEmployees(state))

  if (sortField === 'name') {
    employees.sort((a, b) => {
      if (sortNameOrder === 'asc') {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
  }
  if (sortField === 'date') {
    employees.sort((a, b) => {
      const dateA = parseDate(a.birthday);
      const dateB = parseDate(b.birthday);
      if (sortNameOrder === 'asc') {
        return compareAsc(dateA, dateB)
      } else {
        return compareDesc(dateA, dateB)
      }
    })
  }

  const toggleSortNameOrder = () => {
    setSortNameOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }

  const toggleSortDateOrder = () => {
    setSortDateOrder(prev => prev === 'asc' ? 'desc' : 'asc')
  }


  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch, appStore])

  if (isPending) <div>...loading</div>

  return (
    <table>
      <thead>
        <tr>
          <th
            onClick={
              () => {
                setSortField('name'),
                  toggleSortNameOrder()
              }
            }>Имя {sortNameOrder === 'asc' ? '↑' : '↓'}
          </th>
          <th
            onClick={
              () => {
                setSortField('date'),
                  toggleSortDateOrder()
              }}>Дата {sortDateOrder === 'asc' ? '↑' : '↓'}
          </th>
          <th>Должность</th>
          <th>Телефон</th>
          <th>В архиве</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <EmployeesRow
            key={employee.id}
            employeeId={employee.id}
          />
        ))}
      </tbody>
    </table>
  )
}