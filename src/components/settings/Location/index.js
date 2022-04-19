import React, { useState } from "react"

import Fields from "../../auth/Fields"
import Slots from "../Slots"

import { Grid, Chip } from "@material-ui/core"

import LocationStyles from "./LocationStyles"

import locationIcon from "../../../images/location.svg"
import streetAdornment from "../../../images/street-adornment.svg"
import zipAdornment from "../../../images/zip-adornment.svg"

export default function Location() {
  const classes = LocationStyles()
  const [values, setValues] = useState({ street: "", zip: "" })
  const [errors, setErrors] = useState({})

  const fields = {
    street: {
      placeholder: "Street",
      helperText: "eg: 10 rue de la Tielle",
      helperErrorText: "Invalid address",
      startAdornment: <img src={streetAdornment} alt="street" />,
    },
    zip: {
      placeholder: "Zip Code",
      helperText: "eg: 34500",
      helperErrorText: "Invalid zip code",
      startAdornment: <img src={zipAdornment} alt="zip code" />,
    },
  }

  return (
    <Grid item container direction="column" xs={6} alignItems="center">
      <Grid item>
        <img
          src={locationIcon}
          alt="location settings"
          className={classes.icon}
        />
      </Grid>
      <Grid item container direction="column" alignItems="center" classes={{root: classes.fieldContainer}}>
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          isWhite
        />
      </Grid>
      <Grid item classes={{ root: classes.chipWrapper }}>
        <Chip label="City, State" />
      </Grid>
      <Grid item container>
        <Slots />
      </Grid>
    </Grid>
  )
}
