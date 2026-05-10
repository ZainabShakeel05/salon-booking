import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAppContext();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname, bookingState: location.state }} />;
  }

  if (role && currentUser.role !== role) {
    return <Navigate to="/my-salon" replace state={{ denied: true }} />;
  }

  return children;
};

export default ProtectedRoute;
