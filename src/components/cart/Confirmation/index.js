import React from "react"

import { Grid, Typography } from "@material-ui/core"

import ConfirmationStyles from "./ConfirmationStyles"

import confirmationIcon from "../../../images/tag.svg"
import NameAdornment from "../../../images/NameAdornment"
import EmailAdornment from "../../../images/EmailAdornment"
import PhoneAdornment from "../../../images/PhoneAdornment"
import streetAdornment from "../../../images/street-adornment.svg"
import zipAdornment from "../../../images/zip-adornment.svg"
import promoAdornment from "../../../images/promo-code.svg"
import cardAdornment from "../../../images/card.svg"

export default function Confirmation() {
  const classes = ConfirmationStyles()

  const firstFields = [
    {
      value: "Yannick Lega",
      adornment: (
        <div className={classes.nameWrapper}>
          <NameAdornment color="#fff" />
        </div>
      ),
    },
    {
      value: "yannick.lega@yahoo.com",
      adornment: (
        <div className={classes.emailWrapper}>
          <EmailAdornment color="#fff" />
        </div>
      ),
    },
    {
      value: "06-66-66-66-66",
      adornment: (
        <div className={classes.phoneWrapper}>
          <PhoneAdornment />
        </div>
      ),
    },
    {
      value: "19 rue de la tielle",
      adornment: <img src={streetAdornment} alt="street address" />,
    },
  ]

  const secondFields = [
    {
      value: "34300 Agde, Occitanie",
      adornment: <img src={zipAdornment} alt="city, state, zip code" />,
    },
    {
      value: "**** **** **** 1234",
      adornment: <img src={cardAdornment} alt="credit card" />,
    },
    {
      promo: {
        helperText: "",
        placeholder: "Promo code",
        startAdornment: <img src={promoAdornment} alt="promo code" />,
      },
    },
  ]

  return (
    <Grid item container direction="column">
      <Grid item container>
        <Grid item container direction="column" xs={8}>
          {firstFields.map(field => (
            <Grid item container key={field.value}>
              <Grid item xs={1}>
                {field.adornment}
              </Grid>
              <Grid item xs={11}>
                <Typography variant="body1" classes={{ root: classes.text }}>
                  {field.value}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={4}>
          <img src={confirmationIcon} alt="confirmation" />
        </Grid>
      </Grid>
    </Grid>
  )
}
