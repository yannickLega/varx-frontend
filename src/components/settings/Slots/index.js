import React from "react"
import clsx from "clsx"

import { Grid, Typography, Button } from "@material-ui/core"

import SlotsStyles from "./SlotsStyles"

export default function Slots({ slot, setSlot, checkout, noLabel }) {
  const classes = SlotsStyles()

  return (
    <Grid item container xs={noLabel ? 3 : checkout ? 6 : undefined}>
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
      {checkout && (
        <Grid item>
          <Typography variant="body1" classes={{ root: classes.shipping }}>
            Shipping
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}
