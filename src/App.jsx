/* eslint-disable no-debugger, no-console */
import React from 'react';
// import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
// import theme from './theme';
// import { Navbar } from './pages/components/Navbar';
// import {
//   Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo,
// } from './pages';
import { Login } from './pages/Login';
import { InputDemo } from './pages/InputDemo';
import { ChildrenDemo } from './pages/ChildrenDemo';
import { Trainee } from './pages/Trainee';
import { TextFieldDemo } from './pages/TextFieldDemo';
import { NoMatch } from './pages/NoMatch';
import { AuthRoute, PrivateRoute } from './routes/index';

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <Navbar />
//       <Router>
//         <Switch>
//           <Route exact path="/">
//             <Redirect to="/Trainee" />
//           </Route>
//           <PrivateRoute path="/login" component={Login} />
//           <AuthRoute path="/text-field" component={TextFieldDemo} />
//           <AuthRoute path="/childrenDemo" component={ChildrenDemo} />
//           <AuthRoute path="/inputDemo" component={InputDemo} />
//           <AuthRoute path="/Trainee" component={Trainee} />
//           <AuthRoute component={NoMatch} />
//         </Switch>
//       </Router>
//     </ThemeProvider>
//   );
// }
function App() {
  return (
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
  );
}
export default App;
