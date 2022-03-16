import React from "react"
import { Grid, Typography } from "@material-ui/core"
import { Link } from "gatsby"

import MarketingButtonsStyles from "./MarketingButtonsStyles"

import moreByUs from "../../../images/more-by-us.svg"
import store from "../../../images/store.svg"

export default function MarketingButtons() {
  const classes = MarketingButtonsStyles()

  const buttons = [
    { label: "Store", icon: store, link: "/hoodies" },
    { label: "More By Us", icon: moreByUs, href: "https://www.google.com" },
  ]

  return (
    <Grid
      container
      justifyContent="space-around"
      classes={{ root: classes.container }}
    >
      {buttons.map(button => (
        <Grid item key={button.label}>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            direction="column"
            classes={{ root: classes.button }}
            component={button.link ? Link : "a"}
            to={button.link ? button.link : undefined}
            href={button.href ? button.href : undefined}
          >
            <Grid item>
              <img
                className={classes.icon}
                src={button.icon}
                alt={button.label}
              />
            </Grid>
            <Grid item>
              <Typography classes={{ root: classes.label }} variant="h1">
                {button.label}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  )
}
