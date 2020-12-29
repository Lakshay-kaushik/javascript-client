import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { ChildrenDemo } from './pages/ChildrenDemo';

import theme from './theme';

function App() {
  return (
    <>
      <ChildrenDemo />
      <ThemeProvider theme={theme} />
    </>
  );
}

export default App;
