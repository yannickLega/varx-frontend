import React from "react"

import { Grid, Typography, Button } from "@material-ui/core"

import CheckoutNavigationStyles from "./CheckoutNavigationStyles"

export default function CheckoutNavigation({
  steps,
  selectedStep,
  setSelectedStep,
}) {
  const classes = CheckoutNavigationStyles({ selectedStep, steps })

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      classes={{ root: classes.navBar }}
    >
      <Grid item classes={{ root: classes.back }}>
        <Button onClick={() => setSelectedStep(selectedStep - 1)}>
          <Typography variant="h5">{"<"}</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item classes={{ root: classes.forward }}>
        <Button onClick={() => setSelectedStep(selectedStep + 1)}>
          <Typography variant="h5">{">"}</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}
