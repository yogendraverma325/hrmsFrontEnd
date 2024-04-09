import './App.css';

import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';

import CircularLoading from './components/CircularProgress';
import CustomSnackbar from './components/Snackbar';
import AuthProvider from './contexts/AuthProvider';
import { RootState } from './redux/reducers';
import BaseRoutes from './routes';
function App() {
  const customization = useSelector((state: RootState) => state.customization);
  return (
    <ThemeProvider theme={customization}>
      <AuthProvider>
        <BaseRoutes />
        <CircularLoading />
        <CustomSnackbar />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
