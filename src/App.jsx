import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from './context/AuthContext';
// import PrivateRoute from './routes/PrivateRoute';
// import NavBar from './components/NavBar';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from './pages/auth/RegisterPage';

// import DashboardPage from './pages/DashboardPage';
// import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    // <AuthProvider>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<UserProfilePage />} /> */}
          </Route>
          {/* <PrivateRoute path="/dashboard" component={DashboardPage} /> */}
          {/* <PrivateRoute path="/profile" component={UserProfilePage} /> */}
        </Routes>
      </div>
    </Router>
    // </AuthProvider>
  );
}

export default App;
