import React, { useState } from "react"

import Login from "../Login"
import SignUp from "../SignUp"
import Complete from "../Complete"

import { Grid, Paper } from "@material-ui/core"

import AuthPortalStyles from "./AuthPortalStyles"

export default function AuthPortal() {
  const classes = AuthPortalStyles()
  const [selectedStep, setSelectedStep] = useState(0)

  const steps = [
    { component: Login, label: "Login" },
    { component: SignUp, label: "Sign Up" },
    { component: Complete, label: "Complete" },
  ]

  return (
    <Grid
      container
      justifyContent="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <Paper elevation={6} classes={{ root: classes.paper }}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="space-between"
            classes={{ root: classes.inner }}
          >
            {/* Step is capitalize cause it's a component */}
            {steps.map((Step, i) =>
              selectedStep === i ? (
                <Step.component
                  setSelectedStep={setSelectedStep}
                  steps={steps}
                  key={Step.label}
                />
              ) : null
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  )
}
