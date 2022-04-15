import React, { useState, useContext, useEffect } from "react"

import Login from "../Login"
import SignUp from "../SignUp"
import Complete from "../Complete"
import Reset from "../Reset"
import { UserContext, FeedbackContext } from "../../../contexts"

import { Grid, Paper } from "@material-ui/core"

import AuthPortalStyles from "./AuthPortalStyles"

export default function AuthPortal() {
  const classes = AuthPortalStyles()
  const [selectedStep, setSelectedStep] = useState(0)
  const { user, dispatchUser } = useContext(UserContext)
  const { feedback, dispatchFeedback } = useContext(FeedbackContext)

  const steps = [
    { component: Login, label: "Login" },
    { component: SignUp, label: "Sign Up" },
    { component: Complete, label: "Complete" },
    { component: Reset, label: "Reset" },
  ]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    if (code) {
      const resetStep = steps.find(step => step.label === "Reset")
      setSelectedStep(steps.indexOf(resetStep))
    }
  }, [])

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
                  user={user}
                  dispatchUser={dispatchUser}
                  feedback={feedback}
                  dispatchFeedback={dispatchFeedback}
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
