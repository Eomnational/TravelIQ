
import { useAuth } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import Login from './Login';

const ProtectedRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 如果用户未登录，显示登录组件
    return <Login />;
  }

  return element; // 如果已登录，返回目标组件
};

export default ProtectedRoute;
