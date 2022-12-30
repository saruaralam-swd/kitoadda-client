import React, { useContext } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { AuthContext } from '../../Context/AuthProvider';

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <Loading></Loading>
  }

  if (!user?.uid) {
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
  }

  return children;
};

export default PrivateRoute;