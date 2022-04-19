import React from "react"

import { Grid, Typography, Button } from "@material-ui/core"

import PaymentsStyles from "./PaymentsStyles"

import card from "../../../images/card.svg"
import Slots from "../Slots"

export default function Payments() {
  const classes = PaymentsStyles()

  const cards = [{ last4: 1234, brand: "Visa" }]

  return (
    <Grid item container direction="column" xs={6} alignItems="center">
      <Grid item>
        <img src={card} alt="payment settings" className={classes.icon} />
      </Grid>
      <Grid item container justifyContent="center">
        <Grid item>
          <Typography variant="h3" classes={{ root: classes.number }}>
            {cards
              ? `${cards[0].brand.toUpperCase()} **** **** ${cards[0].last4}`
              : "Add a new card during checkout"}
          </Typography>
        </Grid>
        {cards && (
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
      <Grid item container>
        <Slots />
      </Grid>
    </Grid>
  )
}
