import React, { useState, useEffect } from "react"
import axios from "axios"
import { setSnackbar } from "../../../contexts/actions"

import { EmailPassword } from "../Login"

import Fields from "../Fields"

import { Grid, Typography, Button, CircularProgress } from "@material-ui/core"

import accountIcon from "../../../images/account.svg"

import ResetStyles from "./ResetStyles"

export default function Reset({ steps, setSelectedStep, dispatchFeedback }) {
  const classes = ResetStyles()
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({ password: "", confirmation: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const { password } = EmailPassword(classes, true, false, visible, setVisible)

  const fields = {
    password,
    confirmation: {
      ...password,
      placeholder: "Confirm Password",
      helperText: "",
    },
  }

  const handleReset = () => {
    setLoading(true)
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    axios
      .post(process.env.GATSBY_STRAPI_URL + "/auth/reset-password", {
        code,
        password: values.password,
        passwordConfirmation: values.confirmation,
      })
      .then(response => {
        setLoading(false)
        setSuccess(true)
        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: "Password Reset Successfully",
          })
        )
      })
      .catch(error => {
        setLoading(false)
        const { message } = error.response.data.message[0].messages[0]
        console.error(error)
        dispatchFeedback(setSnackbar({ status: "error", message }))
      })
  }

  const disabled =
    Object.keys(errors).some(error => errors[error] === true) ||
    Object.keys(errors).length !== Object.keys(values).length ||
    values.password !== values.confirmation

  useEffect(() => {
    if (!success) return

    const timer = setTimeout(() => {
      window.history.replaceState(null, null, window.location.pathname)

      const login = steps.find(step => step.label === "Login")
      setSelectedStep(steps.indexOf(login))
    }, 6000)

    return () => clearTimeout(timer)
  }, [success])

  return (
    <>
      <Grid item classes={{ root: classes.icon }}>
        <img src={accountIcon} alt="reset password page" />
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
          onClick={handleReset}
          disabled={disabled}
          variant="contained"
          color="secondary"
          classes={{ root: classes.reset }}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography variant="h5" classes={{ root: classes.buttonText }}>
              reset password
            </Typography>
          )}
        </Button>
      </Grid>
    </>
  )
}
