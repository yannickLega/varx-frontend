import React, { useState, useEffect } from "react"

import Fields from "../../auth/Fields"
import { EmailPassword } from "../../auth/Login"

import { Grid, useMediaQuery } from "@material-ui/core"

import DetailsStyles from "./DetailsStyles"

import fingerprint from "../../../images/fingerprint.svg"
import NameAdornment from "../../../images/NameAdornment"
import PhoneAdornment from "../../../images/PhoneAdornment"
import Slots from "../Slots"

export default function Details({
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
  const classes = DetailsStyles()
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setValues({ ...user.contactInfo[slot], password: "********" })
  }, [slot])

  useEffect(() => {
    const changed = Object.keys(user.contactInfo[slot]).some(
      field => values[field] !== user.contactInfo[slot][field]
    )

    setChangesMade(changed)
  }, [values])

  const email_password = EmailPassword(false, false, visible, setVisible, true)

  const name_phone = {
    name: {
      helperText: "eg: Julien Durant",
      helperErrorText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <NameAdornment color="#fff" />,
    },
    phone: {
      helperText: "eg: 666-666-6666 or 06-66-66-66-66",
      helperErrorText: "Invalid phone number",
      placeholder: "Phone",
      startAdornment: (
        <div className={classes.phoneAdornment}>
          <PhoneAdornment />
        </div>
      ),
    },
  }

  const fields = [name_phone, email_password]

  return (
    <Grid
      item
      container
      direction="column"
      lg={6}
      xs={12}
      alignItems="center"
      justifyContent="center"
      classes={{ root: classes.detailsContainer }}
    >
      <Grid item>
        <img
          src={fingerprint}
          alt="details settings"
          className={classes.icon}
        />
      </Grid>
      {fields.map((pair, i) => (
        <Grid
          container
          key={i}
          justifyContent="center"
          alignItems={matchesXS ? "center" : undefined}
          classes={{ root: classes.fieldContainer }}
          direction={matchesXS ? "column" : "row"}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
            disabled={!edit}
            settings
          />
        </Grid>
      ))}
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  )
}
