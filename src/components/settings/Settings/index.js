import React from "react"

import Details from "../Details"
import Payments from "../Payments"
import Location from "../Location"

import { Grid } from "@material-ui/core"

import SettingsStyles from "./SettingsStyles"

export default function Settings() {
  const classes = SettingsStyles()

  return (
    <>
      <Grid container>
        <Details />
        <Payments />
      </Grid>
      <Grid container>
        <Location />
      </Grid>
    </>
  )
}
