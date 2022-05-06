import React from "react"

import { Grid, Typography } from "@material-ui/core"

import BillingConfirmationStyles from "./BillingConfirmationStyles"

export default function BillingConfirmation({
  detailBillingSwitch,
  billingDetails: { name, email, phone },
  detailSlot,
  locationBillingSwitch,
  billingLocation: { street, zip, city, state },
  locationSlot,
}) {
  const classes = BillingConfirmationStyles()

  const fields = [
    {
      title: "Billing Info",
      values: { name, email, phone },
      hidden: detailBillingSwitch === detailSlot,
    },
    {
      title: "Billing Address",
      values: {
        address1: street,
        address2: `${zip} ${city},`,
        address3: state,
      },
      hidden: locationBillingSwitch === locationSlot,
    },
  ]

  return (
    <Grid item container justifyContent="flex-end">
      {fields.map(field =>
        field.hidden ? null : (
          <Grid item key={field.title} classes={{ root: classes.wrapper }}>
            <Typography
              align="right"
              variant="h4"
              classes={{ root: classes.heading }}
            >
              {field.title}
            </Typography>
            <Typography
              align="right"
              variant="h3"
              classes={{ root: classes.values }}
            >
              {Object.keys(field.values).map(value => (
                <span key={value}>
                  {field.values[value]}
                  <br />
                </span>
              ))}
            </Typography>
          </Grid>
        )
      )}
    </Grid>
  )
}
