/* eslint-disable no-debugger, no-console */
import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import theme from './theme';
import { Login } from './pages/Login';
import { InputDemo } from './pages/InputDemo';
import { ChildrenDemo } from './pages/ChildrenDemo';
import { Trainee } from './pages/Trainee';
import { TextFieldDemo } from './pages/TextFieldDemo';
import { NoMatch } from './pages/NoMatch';
import { AuthRoute, PrivateRoute } from './routes/index';
import { SnackBarProvider } from './contexts';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackBarProvider>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/Trainee" />
            </Route>
            <AuthRoute path="/Login" component={Login} />
            <PrivateRoute path="/TextFieldDemo" component={TextFieldDemo} />
            <PrivateRoute path="/ChildrenDemo" component={ChildrenDemo} />
            <PrivateRoute path="/InputDemo" component={InputDemo} />
            <PrivateRoute path="/Trainee" component={Trainee} />
            <PrivateRoute component={NoMatch} />

          </Switch>
        </Router>
      </SnackBarProvider>
    </ThemeProvider>
  );
}
export default App;
