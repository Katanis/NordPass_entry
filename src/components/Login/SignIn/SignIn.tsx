import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  LinearProgress,
  Link,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Routes } from "~/constants";
import login from "~/services/login";

import ErrorBlock from "../../ErrorBlock";

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit">Emilis task</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: "#FFFF",
    margin: "2rem",
    padding: "2rem",
    borderRadius: "1rem",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type LoginFormData = {
  username: string;
  password: string;
};

const SignIn = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const [loggingIn, setLoggingIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoggingIn(true);
    setErrorMessage(null);

    try {
      await login(data.username, data.password);
      push(Routes.PasswordHealth);
    } catch (error) {
      setLoggingIn(false);
      console.error(error.message);
      setErrorMessage("Login failed wrong user credentials");
    }
  };

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="username"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                value={value}
                required
                fullWidth
                error={!!error}
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={onChange}
                autoFocus
              />
            )}
            rules={{ required: "Password required" }}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                variant="outlined"
                margin="normal"
                required
                onChange={onChange}
                value={value}
                fullWidth
                error={!!error}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
            rules={{ required: "Password required" }}
          />

          {loggingIn ? <LinearProgress /> : null}
          <ErrorBlock error={errorMessage} />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
