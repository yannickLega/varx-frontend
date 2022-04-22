import React, { useState } from "react"

import { Grid, Typography, Button } from "@material-ui/core"

import PaymentsStyles from "./PaymentsStyles"

import cardIcon from "../../../images/card.svg"
import Slots from "../Slots"

export default function Payments({ user }) {
  const classes = PaymentsStyles()
  const [slot, setSlot] = useState(0)

  const card = user.paymentMethods[slot]

  return (
    <Grid
      item
      container
      direction="column"
      lg={6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.paymentsContainer }}
    >
      <Grid item>
        <img src={cardIcon} alt="payment settings" className={classes.icon} />
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Typography align="center" variant="h3" classes={{ root: classes.number }}>
            {card.last4
              ? `${card[0].brand.toUpperCase()} **** **** ${card[0].last4}`
              : "Add a new card during checkout"}
          </Typography>
        </Grid>
        {card.last4 && (
          <Grid item>
            <Button variant="contained" classes={{ root: classes.removeCard }}>
              <Typography
                variant="h6"
                classes={{ root: classes.removeCardText }}
              >
                Remove Card
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  )
}
