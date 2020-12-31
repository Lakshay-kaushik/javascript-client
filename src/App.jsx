import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { Login } from './pages/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
