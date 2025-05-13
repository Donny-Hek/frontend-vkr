import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { AuthConsumer } from '../context/AuthContext';

const PrivateRoute = () => {
  const location = useLocation();

  return (
    <AuthConsumer>
      {({ isAuthenticated, loading, user }) => {
        if (loading) {
          return (
            <div className="loading-screen">
              <div className="spinner"></div>
              <p>Проверка авторизации...</p>
            </div>
          );
        }

        if (!isAuthenticated) {
          // Сохраняем URL, с которого пришли, для редиректа после входа
          return <Navigate to="/login" state={{ from: location }} replace />;
        }

        // Проверка ролей (если нужно)
        if (user?.requiredRole && user.role !== user.requiredRole) {
          return <Navigate to="/unauthorized" replace />;
        }

        // Если авторизован, отображаем дочерние маршруты
        return <Outlet />;
      }}
    </AuthConsumer>
  );
};

export default PrivateRoute;