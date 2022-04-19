import React from "react"

import { Grid, Typography, IconButton } from "@material-ui/core"

import EditStyles from "./EditStyles"

import Backwards from "../../../images/BackwardsOutline"
import editIcon from "../../../images/edit.svg"
import saveIcon from "../../../images/save.svg"

export default function Edit({ setSelectedSetting }) {
  const classes = EditStyles()

  return (
    <Grid
      item
      container
      xs={6}
      justifyContent="space-evenly"
      alignItems="center"
      classes={{ root: classes.editContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <span className={classes.icon}>
            <Backwards color="#fff" />
          </span>
        </IconButton>
      </Grid>
      <Grid item>
        <IconButton>
          <img src={editIcon} alt="edit" className={classes.icon} />
        </IconButton>
      </Grid>
    </Grid>
  )
}
