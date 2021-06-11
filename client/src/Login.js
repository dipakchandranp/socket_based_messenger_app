import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  FormControl,
  TextField,
  Box,
  InputAdornment
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { login } from "./store/utils/thunkCreators";
import GreetLayout from "./components/GreetLayout";


const useStyles = makeStyles((theme) => ({
  forgotPasswordCta: {
    color: theme.palette.primary.main,
    fontSize: theme.typography.fontSizeSmall,
    fontWeight: theme.typography.fontWeightBold,
    cursor: "pointer"
  }
}));

const Login = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  const handleForgotPassword = () => {
    console.log("TODO: Implement forgot password");
  }

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <GreetLayout 
      title="Welcome back!" 
      actionHelper="Don’t have an account?" 
      actionLabel="Create account" 
      onClick={() => history.push("/register")}
      handleFormSubmit={handleLogin}
      submitBtnLabel="Login">
      <Grid container
        align="center"
        justify="center"
        direction="column">
          <FormControl margin="normal" required>
            <TextField
              aria-label="Email address"
              label="E-mail address"
              name="username"
              type="text"
              />
          </FormControl>
          <Box my={2}/>
          <FormControl margin="normal" required>
            <TextField
              aria-label="password"
              label="Password"
              type="password"
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" onClick={handleForgotPassword}>
                      <span className={classes.forgotPasswordCta}>Forgot?</span>
                  </InputAdornment>
                )
              }}
            />
          </FormControl>
        </Grid>
    </GreetLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
