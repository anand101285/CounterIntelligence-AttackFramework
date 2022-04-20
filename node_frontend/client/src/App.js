import { Routes, Route } from 'react-router-dom';

import ProtectedRoute from './protectedroutes';

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// authhooks
import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';

// pages
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

export default function App() {
  const { token, login, logout, user } = useAuth();

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          user,
          login,
          logout
        }}
      >
        <Routes>
          <Route element={<LogoOnlyLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard/app"
              element={
                <ProtectedRoute>
                  <DashboardApp />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/blog"
              element={
                <ProtectedRoute>
                  <Blog />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/products"
              element={
                <ProtectedRoute>
                  <Products />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </ThemeConfig>
  );
}
