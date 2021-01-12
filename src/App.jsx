/* eslint-disable no-debugger, no-console */
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import theme from './theme';
import { Login } from './pages/Login';
import { InputDemo } from './pages/InputDemo';
import { ChildrenDemo } from './pages/ChildrenDemo';
import { Trainee } from './pages/Trainee';
import { TextFieldDemo } from './pages/TextFieldDemo';
import { NoMatch } from './pages/NoMatch';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts/SnackBarProvider';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SnackBarProvider>
          <Router>
            <Switch>
              <Route path="/" exact>
                <Redirect to="/Trainee" />
              </Route>
              <PrivateRoute path="/Login" component={Login} />
              <AuthRoute path="/TextFieldDemo" component={TextFieldDemo} />
              <AuthRoute path="/ChildrenDemo" component={ChildrenDemo} />
              <AuthRoute path="/InputDemo" component={InputDemo} />
              <AuthRoute path="/Trainee" component={Trainee} />
              <AuthRoute component={NoMatch} />

            </Switch>
          </Router>
        </SnackBarProvider>
      </ThemeProvider>
    </>
  );
}
export default App;
