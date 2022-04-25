import React from "react"
import clsx from "clsx"

import { Grid, Typography, Button } from "@material-ui/core"

import shippingIcon from "../../../images/shipping.svg"

import ShippingStyles from "./ShippingStyles"

export default function Shipping({
  shippingOptions,
  selectedShipping,
  setSelectedShipping,
}) {
  const classes = ShippingStyles()

  return (
    <Grid
      item
      container
      alignItems="center"
      direction="column"
      justifyContent="center"
      classes={{ root: classes.shippingContainer }}
    >
      <Grid item>
        <img src={shippingIcon} alt="shipping" className={classes.icon} />
      </Grid>
      <Grid item container justifyContent="space-around">
        {shippingOptions.map(option => (
          <Grid item key={option.label}>
            <Button
              onClick={() => setSelectedShipping(option.label)}
              classes={{
                root: clsx(classes.button, {
                  [classes.selected]: selectedShipping === option.label,
                }),
              }}
            >
              <Grid container direction="column">
                <Grid item>
                  <Typography
                    variant="h5"
                    classes={{
                      root: clsx(classes.label, {
                        [classes.selectedText]: selectedShipping === option.label,
                      }),
                    }}
                  >
                    {option.label}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    classes={{
                      root: clsx(classes.price, {
                        [classes.selectedText]: selectedShipping === option.label,
                      }),
                    }}
                  >{`$${option.price.toFixed(2)}`}</Typography>
                </Grid>
              </Grid>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
