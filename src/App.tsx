import { Navigate, Route, Routes } from 'react-router-dom'
import EmployeesForm from './components/employees-form'
import Employees from './components/Employees'


export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Employees />} />
      <Route path='/employes/:id' element={<EmployeesForm />} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  )
}

