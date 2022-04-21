import React, { useState, useEffect } from "react"

import Fields from "../../auth/Fields"
import Slots from "../Slots"

import { Grid, Chip } from "@material-ui/core"

import LocationStyles from "./LocationStyles"

import locationIcon from "../../../images/location.svg"
import streetAdornment from "../../../images/street-adornment.svg"
import zipAdornment from "../../../images/zip-adornment.svg"

export default function Location({
  user,
  edit,
  setChangesMade,
  values,
  setValues,
  slot,
  setSlot,
  errors,
  setErrors,
}) {
  const classes = LocationStyles()

  useEffect(() => {
    setValues(user.locations[slot])
  }, [slot])

  useEffect(() => {
    const changed = Object.keys(user.locations[slot]).some(
      field => values[field] !== user.locations[slot][field]
    )

    setChangesMade(changed)
  }, [values])

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
    <Grid
      item
      container
      direction="column"
      xs={6}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.locationContainer }}
    >
      <Grid item>
        <img
          src={locationIcon}
          alt="location settings"
          className={classes.icon}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.fieldContainer }}
      >
        <Fields
          fields={fields}
          values={values}
          setValues={setValues}
          errors={errors}
          setErrors={setErrors}
          isWhite
          disabled={!edit}
        />
      </Grid>
      <Grid item classes={{ root: classes.chipWrapper }}>
        <Chip
          label={
            values.city ? `${values.city}, ${values.state}` : "City, State"
          }
        />
      </Grid>
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  )
}
