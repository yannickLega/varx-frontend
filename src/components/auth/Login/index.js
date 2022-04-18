import React, { useState, useEffect } from "react"
import axios from "axios"
import { setUser, setSnackbar } from "../../../contexts/actions"
import clsx from "clsx"

import Fields from "../Fields"

import {
  Grid,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core"

import LoginStyles from "./LoginStyles"

import accountIcon from "../../../images/account.svg"
import EmailAdornment from "../../../images/EmailAdornment"
import passwordAdornment from "../../../images/password-adornment.svg"
import hidePasswordIcon from "../../../images/hide-password.svg"
import showPasswordIcon from "../../../images/show-password.svg"
import addUserIcon from "../../../images/add-user.svg"
import forgotPasswordIcon from "../../../images/forgot.svg"
import close from "../../../images/close-outline.svg"

export const EmailPassword = (
  classes,
  hideEmail,
  hidePassword,
  visible,
  setVisible
) => ({
  email: {
    helperText: "email@mail.com",
    helperErrorText: "invalid email",
    placeholder: "Email",
    type: "text",
    hidden: hideEmail,
    startAdornment: (
      <span className={classes.emailAdornment}>
        <EmailAdornment />
      </span>
    ),
  },
  password: {
    helperText: "eg: 1passworD!",
    helperErrorText:
      "your must be at least 8 characters and include one uppercase letter, one number, and one special character",
    placeholder: "Password",
    hidden: hidePassword,
    type: visible ? "text" : "password",
    startAdornment: <img src={passwordAdornment} alt="Password" />,
    endAdornment: (
      <IconButton
        onClick={() => setVisible(!visible)}
        classes={{ root: classes.visibleIcon }}
      >
        <img
          src={visible ? showPasswordIcon : hidePasswordIcon}
          alt={`${visible ? "show" : "hide"} Password`}
        />
      </IconButton>
    ),
  },
})

export default function Login({
  steps,
  setSelectedStep,
  dispatchUser,
  dispatchFeedback,
}) {
  const classes = LoginStyles()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  /* A object that is used to create the text fields. */
  const fields = EmailPassword(classes, false, forgot, visible, setVisible)
  /**
   * "Find the step with the label "Sign Up" and set the selected step to that step's index."
   */
  const navigateSignUp = () => {
    const signUp = steps.find(step => step.label === "Sign Up")

    setSelectedStep(steps.indexOf(signUp))
  }

  const handleLogin = () => {
    setLoading(true)
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/local", {
        identifier: values.email,
        password: values.password,
      })
      .then(response => {
        setLoading(false)
        dispatchUser(
          setUser({
            ...response.data.user,
            jwt: response.data.jwt,
            onboarding: true,
          })
        )
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const handleForgot = () => {
    setLoading(true)
    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/forgot-password", {
        email: values.email,
      })
      .then(response => {
        setLoading(false)
        setSuccess(true)

        dispatchFeedback(
          setSnackbar({ status: "success", message: "Reset code sent" })
        )
      })
      .catch(error => {
        const { message } = error.response.data.message[0].messages[0]
        setLoading(false)
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      setForgot(false)
    }, 6000)
    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <Grid item classes={{ root: classes.accountIcon }}>
        <img src={accountIcon} alt="login page" />
      </Grid>
      <Fields
        fields={fields}
        errors={errors}
        setErrors={setErrors}
        values={values}
        setValues={setValues}
      />
      <Grid item>
        <Button
          onClick={() => (forgot ? handleForgot() : handleLogin())}
          disabled={loading || (!forgot && disabled)}
          variant="contained"
          color="secondary"
          classes={{
            root: clsx(classes.loginButton, {
              [classes.reset]: forgot,
            }),
          }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" classes={{ root: classes.buttonText }}>
              {forgot ? "forgot password" : "login"}
            </Typography>
          )}
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
            component="a"
            href={`${process.env.GATSBY_STRAPI_URL + "/connect/facebook"}`}
            classes={{
              root: clsx(classes.facebookButton, {
                [classes.passwordError]: errors.password,
              }),
            }}
          >
            <Typography variant="h3" classes={{ root: classes.facebookText }}>
              login with Facebook
            </Typography>
          </Button>
        </Grid>
      )}
      <Grid
        item
        container
        justifyContent={forgot ? "flex-end" : "space-between"}
      >
        {forgot ? null : (
          <Grid item>
            <IconButton onClick={navigateSignUp}>
              <img
                src={addUserIcon}
                alt="sign up"
                className={classes.bottomIcons}
              />
              <Typography variant="body1" color="primary">
                Sign Up
              </Typography>
            </IconButton>
          </Grid>
        )}

        <Grid item>
          <IconButton onClick={() => setForgot(!forgot)}>
            <Typography variant="body1" color="primary">
              {forgot ? null : "Forgot your password"}
            </Typography>
            <img
              src={forgot ? close : forgotPasswordIcon}
              alt={forgot ? "return to login" : "forgot password"}
              className={classes.bottomIcons}
            />
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}
