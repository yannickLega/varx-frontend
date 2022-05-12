import React from "react"

import { Grid, Typography, Chip } from "@material-ui/core"

import OrderDetailItemStyles from "./OrderDetailItemStyles"

export default function OrderDetailItem({ item }) {
  const classes = OrderDetailItemStyles()

  return (
    <Grid
      item
      container
      justifyContent="space-between"
      alignItems="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img
          src={process.env.GATSBY_STRAPI_URL + item.variant.images[0].url}
          alt={item.name}
          className={classes.product}
        />
      </Grid>
      <Grid item classes={{ root: classes.itemInfo }}>
        <Typography variant="body2">
          {item.name} x {item.qty}
        </Typography>
        {item.variant.style ? (
          <Typography variant="body2">Style: {item.variant.style}</Typography>
        ) : null}
        {item.variant.size ? (
          <Typography variant="body2">Size: {item.variant.size}</Typography>
        ) : null}
        <Chip
          label={`$${item.variant.price}`}
          classes={{ root: classes.chipRoot }}
        />
      </Grid>
    </Grid>
  )
}
