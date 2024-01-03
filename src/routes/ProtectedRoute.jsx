import { useContext } from 'react'
import { authContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children, allowedRoles }) => {

  const { role, token } = useContext(authContext)
  const isAllowed = allowedRoles.includes(role)
  const accessibleRoute = token && isAllowed ? children : <Navigate to='/login' replace={true} />
  return accessibleRoute;
}

export default ProtectedRoute