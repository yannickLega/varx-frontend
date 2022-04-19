import React from "react"
import clsx from "clsx"

import Details from "../Details"
import Payments from "../Payments"
import Location from "../Location"
import Edit from "../Edit"

import { Grid } from "@material-ui/core"

import SettingsStyles from "./SettingsStyles"

export default function Settings({ setSelectedSetting }) {
  const classes = SettingsStyles()

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details />
        <Payments />
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location />
        <Edit setSelectedSetting={setSelectedSetting} />
      </Grid>
    </>
  )
}
