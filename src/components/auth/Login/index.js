import React, { useState } from "react"
import clsx from "clsx"

import Fields from "../Fields"

import { Grid, Typography, Button, IconButton } from "@material-ui/core"

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

export default function Login({ steps, setSelectedStep }) {
  const classes = LoginStyles()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)
  const [forgot, setForgot] = useState(false)

  /* A object that is used to create the text fields. */
  const fields = EmailPassword(classes, false, forgot, visible, setVisible)
  /**
   * "Find the step with the label "Sign Up" and set the selected step to that step's index."
   */
  const navigateSignUp = () => {
    const signUp = steps.find(step => step.label === "Sign Up")

    setSelectedStep(steps.indexOf(signUp))
  }

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
          variant="contained"
          color="secondary"
          classes={{
            root: clsx(classes.loginButton, {
              [classes.reset]: forgot,
            }),
          }}
        >
          <Typography variant="h5">
            {forgot ? "reset password" : "login"}
          </Typography>
        </Button>
      </Grid>
      {forgot ? null : (
        <Grid item>
          <Button
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
