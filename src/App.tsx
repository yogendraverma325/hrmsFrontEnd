import './App.css';

import CircularLoading from './components/CircularProgress';
import CustomSnackbar from './components/Snackbar';
import AuthProvider from './contexts/AuthProvider';
import BaseRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <BaseRoutes />
      <CircularLoading />
      <CustomSnackbar />
    </AuthProvider>
  );
}

export default App;
