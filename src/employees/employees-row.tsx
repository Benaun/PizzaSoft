import { EmployeeId } from "../store/employees.slice"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store/store"

interface IProps {
  employeeId: EmployeeId
}

export default function EmployeesRow({ employeeId }: IProps) {

  const navigate = useNavigate();

  const employee = useAppSelector((state) => state.employees.entities[employeeId])

  const handleClick = () => {
    navigate(String(employeeId), { relative: 'path' })
  }

  if (!employee) return null

  return (
    <tr onClick={handleClick}>
      <td>{employee.name}</td>
      <td>{employee.birthday}</td>
      <td>{employee.role}</td>
      <td>{employee.phone}</td>
      <td>{employee.isArchive ? 'НЕТ' : 'ДА'}</td>
    </tr>
  )
}