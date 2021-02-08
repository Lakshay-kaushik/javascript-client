/* eslint-disable */
import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import {
  TextField, CssBaseline, Card, Typography, Avatar,
  CardContent, withStyles, InputAdornment, Button,
  CircularProgress,
} from '@material-ui/core';
import { Email, VisibilityOff, LockOutlined } from '@material-ui/icons';
import localStorage from 'local-storage';
import { Redirect } from 'react-router-dom';
import { MyContext } from '../../contexts';

const Design = (theme) => ({
  icon: {
    background: 'red',
    marginLeft: theme.spacing(22),
    marginTop: theme.spacing(2),
  },
  main: {
    width: 400,
    marginTop: theme.spacing(20),
    marginLeft: theme.spacing(58),
    [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
});
class Login extends React.Component {
schema = yup.object().shape({
  email: yup.string()
    .trim().email().required('Email Address is a required field'),
  password: yup.string()
    .required('Password is required')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
});

constructor(props) {
  super(props);
  this.state = {
    email: '',
    password: '',
    loading: false,
    redirect: false,
    hasError: true,
    touched: {
      email: false,
      password: false,
    },
  };
}

handleChange = (key) => ({ target: { value } }) => {
  this.setState({ [key]: value });
};

hasErrors = () => {
  try {
    this.schema.validateSync(this.state);
  } catch (err) {
    return true;
  }
  return false;
}

// eslint-disable-next-line consistent-return
getError = (field) => {
  const { email, password } = this.state;
  const data ={ email: `${email}`, password: `${password}` }
  const { touched } = this.state;
  if (touched[field] && this.hasErrors()) {
    try {
      this.schema.validateSyncAt(field, this.state);
      return '';
    } catch (err) {
      return err.message;
    }
  }
};

isTouched = (field) => {
  const { touched } = this.state;
  this.setState({
    touched: {
      ...touched,
      [field]: true,
    },
  });
};
                                
handleRedirect = () => {
  const { redirect } = this.state;
  if (redirect) {
    return <Redirect to="/trainee" />;
  }
}

  onClickHandler = async (data, openSnackBar) => {
    const { loginUser } = this.props;
    const { email, password } = data;
    console.log('Data is :', data);
    console.log('loginUser:', loginUser);
    console.log('email===>', email);
    console.log('password==>', password);
    this.setState({
      loading: true,
      hasError: true,
    });
    try{
     const req={ email: data.email.trim(), password: data.password.trim() };
     console.log("req",req);
     const res = await loginUser({ variables: req  })
     console.log('res ===',res.data.loginUser);
     window.localStorage.setItem('token', res.data.loginUser);
     console.log('ResponseErr', res)
     this.setState({ loading: false });
     console.log('respone', res.data);
     if (res.data ) {
      this.setState({
        redirect: true,
        message: 'Successfully Login!',
      },
       () => {
        const { message } = this.state;
        openSnackBar(message, 'success');
      });
    } else {
      this.setState({
        message: 'Login Failed, Record Not Found',
      }, () => {
        const { message } = this.state;
        openSnackBar(message, 'error');
      });
    }
   } catch(error){
       console.log(error)
       openSnackBar(error.message, "error")
   }
}

  render() {
    const { classes } = this.props;
    const {
      email, password, loading,
    } = this.state;
    this.hasErrors();
    return (
      <>
        <div className={classes.main}>
          <CssBaseline />
          <Card open aria-labelledby="form-dialog-title">
            <Avatar className={classes.icon}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h3" align="center">Login</Typography>
            <CardContent>
              <form>
                <div>
                  <TextField
                    required  
                    fullWidth
                    id="outlined-required"
                    label="Email Address"
                    defaultValue=""
                    variant="outlined"
                    helperText={this.getError('email')}
                    error={!!this.getError('email')}
                    onChange={this.handleChange('email')}
                    onBlur={() => this.isTouched('email')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
                <br />
                <div>
                  <TextField
                    required
                    type="password"
                    fullWidth
                    id="outlined-required"
                    label="Password"
                    variant="outlined"
                    helperText={this.getError('password')}
                    error={!!this.getError('password')}
                    onChange={this.handleChange('password')}
                    onBlur={() => this.isTouched('password')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOff />
                        </InputAdornment>
                      ),
                    }}
                  />
                </div>
&nbsp;
                <div>
                  <MyContext.Consumer>
                    {({ openSnackBar }) => (
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={this.hasErrors()}
                        onClick={() => {
                          this.onClickHandler({ email, password }, openSnackBar);
                        }}
                      >
                        {loading && (
                          <CircularProgress />
                        )}
                        {loading && <span>Signing in</span>}
                        {!loading && <span>Sign in</span>}
                        {this.handleRedirect()}
                      </Button>
                    )}
                  </MyContext.Consumer>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(Design)(Login);
