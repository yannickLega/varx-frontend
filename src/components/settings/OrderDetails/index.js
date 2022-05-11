import React from "react"

import { Grid, Typography, SwipeableDrawer } from "@material-ui/core"

import OrderDetailsStyles from "./OrderDetailsStyles"

export default function OrderDetails({ open, setOpen }) {
  const classes = OrderDetailsStyles()

  return (
    <SwipeableDrawer
      open={!!open}
      onOpen={() => null}
      onClose={() => setOpen(null)}
      classes={{ paper: classes.drawer }}
      anchor="right"
    ></SwipeableDrawer>
  )
}
