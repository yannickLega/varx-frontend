import React, { useState } from "react"

import {
  Grid,
  Typography,
  Button,
  FormControlLabel,
  Switch,
} from "@material-ui/core"

import PaymentsStyles from "./PaymentsStyles"

import cardIcon from "../../../images/card.svg"
import Slots from "../Slots"

export default function Payments({
  user,
  slot,
  setSlot,
  checkout,
  saveCard,
  setSaveCard,
}) {
  const classes = PaymentsStyles({ checkout })

  const card = user.paymentMethods[slot]

  return (
    <Grid
      item
      container
      direction="column"
      lg={checkout ? 12 : 6}
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
          <Typography
            align="center"
            variant="h3"
            classes={{ root: classes.number }}
          >
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
      <Grid
        item
        container
        justifyContent="space-between"
        classes={{ root: classes.slotsContainer }}
      >
        <Slots slot={slot} setSlot={setSlot} noLabel />
        {checkout && (
          <Grid item>
            <FormControlLabel
              classes={{
                root: classes.switchWrapper,
                label: classes.switchLabel,
              }}
              label="Save Card For Future Use"
              labelPlacement="start"
              control={
                <Switch
                  checked={saveCard}
                  onChange={() => setSaveCard(!saveCard)}
                  color={"secondary"}
                />
              }
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
