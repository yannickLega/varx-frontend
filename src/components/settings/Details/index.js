import React, { useState, useEffect } from "react"

import Fields from "../../auth/Fields"
import { EmailPassword } from "../../auth/Login"

import { Grid } from "@material-ui/core"

import DetailsStyles from "./DetailsStyles"

import fingerprint from "../../../images/fingerprint.svg"
import NameAdornment from "../../../images/NameAdornment"
import PhoneAdornment from "../../../images/PhoneAdornment"
import Slots from "../Slots"

export default function Details({ user }) {
  const classes = DetailsStyles()
  const [visible, setVisible] = useState(false)
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "********",
  })
  const [errors, setErrors] = useState({})
  const [slot, setSlot] = useState(0)

  useEffect(() => {
    setValues({ ...user.contactInfo[slot], password: "********" })
  }, [slot])

  const email_password = EmailPassword(
    classes,
    false,
    false,
    visible,
    setVisible,
    true
  )

  const name_phone = {
    name: {
      helperText: "eg: Julien Durant",
      helperErrorText: "you must enter a name",
      placeholder: "Name",
      startAdornment: <NameAdornment color="#fff" />,
    },
    phone: {
      helperText: "for USA: 666-666-6666, for France: 06-66-66-66-66",
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
      xs={6}
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
          classes={{ root: classes.fieldContainer }}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
          />
        </Grid>
      ))}
      <Grid item container classes={{ root: classes.slotsContainer }}>
        <Slots slot={slot} setSlot={setSlot} />
      </Grid>
    </Grid>
  )
}
