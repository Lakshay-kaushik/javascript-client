import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import { Login } from './pages/Login';
import { Navbar } from './pages/components/Navbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Login />
    </ThemeProvider>
  );
}

export default App;
