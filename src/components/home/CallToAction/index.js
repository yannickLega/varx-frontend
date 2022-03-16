import React from "react"
import { Link } from "gatsby"

import { Grid, Typography, Button, useMediaQuery } from "@material-ui/core"

import CallToActionStyles from "./CallToActionStyles"

import cta from "../../../images/cta.svg"

export default function CallToAction() {
  const classes = CallToActionStyles()
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))

  return (
    <Grid
      container
      justifyContent="space-around"
      alignItems="center"
      classes={{ root: classes.container }}
      direction={matchesMD ? "column" : "row"}
    >
      <Grid item>
        <img src={cta} className={classes.icon} alt="quality committed" />
      </Grid>
      <Grid item>
        <Grid container direction="column">
          <Grid item classes={{ root: classes.headingContainer }}>
            <Typography align={matchesMD ? "center" : undefined} variant="h1">
              Committed To Quality
            </Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography
              align={matchesMD ? "center" : undefined}
              variant="body1"
            >
              At VAR X our mission is to provide comfortable, durable, premium,
              designer clothing and clothing accessories to developers and
              technology enthusiasts.
            </Typography>
          </Grid>
          <Grid
            item
            container
            justifyContent={matchesMD ? "center" : undefined}
            classes={{ root: classes.buttonContainer }}
          >
            <Grid item>
              <Button
                component={Link}
                to="/contact"
                variant="outlined"
                color="primary"
              >
                Contact Us
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/account"
                classes={{ root: classes.account }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
