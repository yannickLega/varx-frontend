import React from "react"

import { Grid, TextField, InputAdornment } from "@material-ui/core"

import validate from "../../ui/validate"

import FieldsStyles from "./FieldsStyles"

export default function Fields({
  fields,
  errors,
  setErrors,
  values,
  setValues,
  isWhite,
  disabled,
  fullWidth,
  settings,
  xs,
  noError,
}) {
  const classes = FieldsStyles({ isWhite, fullWidth, settings, xs })

  return Object.keys(fields).map(field => {
    const validateHelper = event => {
      // valide chaque lettre quand le format est bon efface l'erreur
      return validate({ [field]: event.target.value })
    }
    return !fields[field].hidden ? (
      <Grid item key={field}>
        <TextField
          fullWidth={fullWidth}
          disabled={disabled}
          value={values[field]}
          onChange={e => {
            const valid = validateHelper(e)

            if (!noError && (errors[field] || valid[field] === true)) {
              setErrors({ ...errors, [field]: !valid[field] })
            }
            setValues({ ...values, [field]: e.target.value })
          }}
          // sur le focus gere les erreurs avec la function validate
          onBlur={e => {
            if (noError) return

            const valid = validateHelper(e)
            setErrors({ ...errors, [field]: !valid[field] })
          }}
          //applique le style error sur le field
          error={noError ? false : errors[field]}
          helperText={
            noError
              ? ""
              : errors[field]
              ? fields[field].helperErrorText
              : fields[field].helperText
          }
          classes={{ root: classes.textField }}
          placeholder={fields[field].placeholder}
          type={fields[field].type}
          InputProps={{
            startAdornment: fields[field].startAdornment ? (
              <InputAdornment position="start">
                {fields[field].startAdornment}
              </InputAdornment>
            ) : undefined,
            endAdornment: fields[field].endAdornment ? (
              <InputAdornment position="end">
                {fields[field].endAdornment}
              </InputAdornment>
            ) : undefined,
            classes: { input: classes.input },
          }}
        />
      </Grid>
    ) : null
  })
}
