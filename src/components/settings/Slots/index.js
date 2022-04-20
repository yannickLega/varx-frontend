import React from "react"
import clsx from "clsx"

import { Grid, Typography, Button } from "@material-ui/core"

import SlotsStyles from "./SlotsStyles"

export default function Slots({ slot, setSlot }) {
  const classes = SlotsStyles()

  return (
    <Grid item classes={{ root: classes.slotWrappers }}>
      {[1, 2, 3].map(number => (
        <Button
          onClick={() => setSlot(number - 1)}
          key={number}
          classes={{
            root: clsx(classes.slot, {
              [classes.selected]: slot === number - 1,
            }),
          }}
        >
          <Typography
            variant="h5"
            classes={{
              root: clsx(classes.slotText, {
                [classes.selectedText]: slot === number - 1,
              }),
            }}
          >
            {number}
          </Typography>
        </Button>
      ))}
    </Grid>
  )
}
