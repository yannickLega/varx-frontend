import React from "react"

import { Grid, Typography, Button } from "@material-ui/core"

import SlotsStyles from "./SlotsStyles"

export default function Slots() {
  const classes = SlotsStyles()

  return (
    <Grid item classes={{ root: classes.slotWrappers }}>
      {[1, 2, 3].map(slot => (
        <Button key={slot} classes={{ root: classes.slot }}>
          <Typography variant="h5" classes={{ root: classes.slotText }}>
            {slot}
          </Typography>
        </Button>
      ))}
    </Grid>
  )
}
