import './App.css';

import CircularLoading from './components/CircularProgress';
import CustomSnackbar from './components/Snackbar';
import AuthProvider from './contexts/AuthProvider';
import BaseRoutes from './routes';
import { ThemeProvider } from '@mui/material/styles';

import { useSelector } from 'react-redux';

import { RootState } from './redux/reducers';
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
