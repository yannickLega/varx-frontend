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
}) {
  const classes = FieldsStyles({ isWhite, fullWidth })

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

            if (errors[field] || valid[field] === true) {
              setErrors({ ...errors, [field]: !valid[field] })
            }
            setValues({ ...values, [field]: e.target.value })
          }}
          // sur le focus gere les erreurs avec la function validate
          onBlur={e => {
            const valid = validateHelper(e)
            setErrors({ ...errors, [field]: !valid[field] })
          }}
          //applique le style error sur le field
          error={errors[field]}
          helperText={
            errors[field]
              ? fields[field].helperErrorText
              : fields[field].helperText
          }
          classes={{ root: classes.textField }}
          placeholder={fields[field].placeholder}
          type={fields[field].type}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {fields[field].startAdornment}
              </InputAdornment>
            ),
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
