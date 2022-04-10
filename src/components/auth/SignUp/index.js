import React, { useState } from "react"
import clsx from "clsx"

import Fields from "../Fields"
import { EmailPassword } from "../Login"

import { Grid, Typography, Button, IconButton } from "@material-ui/core"

import SignUpStyles from "./SignUpStyles"

import addUserIcon from "../../../images/add-user.svg"
import nameAdornment from "../../../images/name-adornment.svg"
import forward from "../../../images/forward-outline.svg"
import backward from "../../../images/backwards-outline.svg"

export default function SignUp({ steps, setSelectedStep }) {
  const classes = SignUpStyles()
  const [info, setInfo] = useState(false)
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  })
  const [errors, setErrors] = useState({})
  const [visible, setVisible] = useState(false)

  const nameField = {
    name: {
      helperText: "eg: John Doe, Julien Dupont",
      helperErrorText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <img src={nameAdornment} alt="name" />,
    },
  }

  const fields = info
    ? EmailPassword(classes, false, false, visible, setVisible)
    : nameField

  const handleNavigate = direction => {
    if (direction === "forward") {
      setInfo(true)
    } else {
      if (info) {
        setInfo(false)
      } else {
        const login = steps.find(step => step.label === "Login")
        setSelectedStep(steps.indexOf(login))
      }
    }
  }

  const handleComplete = () => {
    const complete = steps.find(step => step.label === "Complete")
    setSelectedStep(steps.indexOf(complete))
  }

  return (
    <>
      <Grid item>
        <img src={addUserIcon} alt="new user" className={classes.addUserIcon} />
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
          onClick={() => (info ? handleComplete() : null)}
          classes={{
            root: clsx(classes.facebookSignUp, {
              [classes.removeButtonMargin]: info,
            }),
          }}
        >
          <Typography variant="h5" classes={{ root: classes.facebookText }}>
            sign up{info ? "" : " with Facebook"}
          </Typography>
        </Button>
      </Grid>
      <Grid item container justifyContent="space-between">
        <Grid item>
          <IconButton onClick={() => handleNavigate("backward")}>
            <img
              src={backward}
              alt="back to login"
              className={classes.bottomIcons}
            />
            <Typography variant="body1" color="primary">
              {info ? "back to name" : "back to login"}
            </Typography>
          </IconButton>
        </Grid>
        {info ? null : (
          <Grid item>
            <IconButton onClick={() => handleNavigate("forward")}>
              <Typography variant="body1" color="primary">
                continue registration
              </Typography>
              <img
                src={forward}
                alt="continue registration"
                className={classes.bottomIcons}
              />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </>
  )
}
