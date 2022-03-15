import React from "react"
import { Link } from "gatsby"

import { Grid, Typography, Button } from "@material-ui/core"

import CallToActionStyles from "./CallToActionStyles"

import cta from "../../../images/cta.svg"

export default function CallToAction() {
  const classes = CallToActionStyles()
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      classes={{ root: classes.container }}
    >
      <Grid item>
        <img width="300rem" height="300rem" src={cta} alt="quality committed" />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          alignItems="center"
          classes={{ root: classes.blockContainer }}
        >
          <Grid item>
            <Typography variant="h1">Committed To Quality</Typography>
          </Grid>
          <Grid item classes={{ root: classes.body }}>
            <Typography variant="body1">
              At Var X our mission is to provide comfortable, durable, premium
              designer clothing, and clothing accessories to developers and
              technology enthusiasts.
            </Typography>
          </Grid>
          <Grid item container justifyContent="flex-end">
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
                component={Link}
                to="/account"
                variant="contained"
                color="primary"
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
