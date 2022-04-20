import React, {useContext} from "react"
import clsx from "clsx"

import {UserContext} from "../../../contexts"

import Details from "../Details"
import Payments from "../Payments"
import Location from "../Location"
import Edit from "../Edit"

import { Grid } from "@material-ui/core"

import SettingsStyles from "./SettingsStyles"

export default function Settings({ setSelectedSetting }) {
  const classes = SettingsStyles()
  const {user} = useContext(UserContext)

  return (
    <>
      <Grid container classes={{ root: classes.sectionContainer }}>
        <Details user={user} />
        <Payments user={user} />
      </Grid>
      <Grid
        container
        classes={{ root: clsx(classes.bottomRow, classes.sectionContainer) }}
      >
        <Location user={user} />
        <Edit user={user} setSelectedSetting={setSelectedSetting} />
      </Grid>
    </>
  )
}
