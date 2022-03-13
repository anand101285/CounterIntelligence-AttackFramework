// routes
import ProtectedRoute from './protectedroutes';
import Route from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import { AuthContext } from './context/auth-context';
import { useAuth } from './hooks/auth-hook';

// ----------------------------------------------------------------------

export default function App() {
  const { token, login, logout, userId } = useAuth();
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          userId,
          login,
          logout
        }}
      >
        {token ? <ProtectedRoute /> : <Route />}
      </AuthContext.Provider>
    </ThemeConfig>
  );
}
