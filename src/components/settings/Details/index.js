import React, { useState, useEffect } from "react"
import clsx from "clsx"

import Fields from "../../auth/Fields"
import { EmailPassword } from "../../auth/Login"

import {
  Grid,
  useMediaQuery,
  FormControlLabel,
  Switch,
} from "@material-ui/core"

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
  checkout,
  billing,
  setBilling,
}) {
  const classes = DetailsStyles({ checkout })
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (checkout) {
      setValues(user.contactInfo[slot])
    } else {
      setValues({ ...user.contactInfo[slot], password: "********" })
    }
  }, [slot])

  useEffect(() => {
    if (checkout) return
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

  let fields = [name_phone, email_password]

  if (checkout) {
    fields = [
      {
        name: name_phone.name,
        email: email_password.email,
        phone: name_phone.phone,
      },
    ]
  }

  return (
    <Grid
      item
      container
      direction="column"
      lg={checkout ? 12 : 6}
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
          alignItems={matchesXS || checkout ? "center" : undefined}
          classes={{
            root: clsx({
              [classes.fieldContainerCart]: checkout,
              [classes.fieldContainer]: !checkout,
            }),
          }}
          direction={matchesXS || checkout ? "column" : "row"}
        >
          <Fields
            fields={pair}
            values={values}
            setValues={setValues}
            errors={errors}
            setErrors={setErrors}
            isWhite
            disabled={checkout ? false : !edit}
            settings={!checkout}
          />
        </Grid>
      ))}
      <Grid
        item
        container
        justifyContent={checkout ? "space-between" : undefined}
        classes={{ root: classes.slotsContainer }}
      >
        <Slots slot={slot} setSlot={setSlot} checkout={checkout} />
        {checkout && (
          <Grid item>
            <FormControlLabel
              classes={{
                root: classes.switchWrapper,
                label: classes.switchLabel,
              }}
              label="Billing"
              labelPlacement="start"
              control={
                <Switch
                  checked={billing}
                  onChange={() => setBilling(!billing)}
                  color={"secondary"}
                />
              }
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  )
}
