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
}) {
  const classes = FieldsStyles()

  return Object.keys(fields).map(field => {
    const validateHelper = event => {
      // valide chaque lettre quand le format est bon efface l'erreur
      const valid = validate({ [field]: event.target.value })
      setErrors({ ...errors, [field]: !valid[field] })
    }
    return !fields[field].hidden ? (
      <Grid item key={field}>
        <TextField
          value={values[field]}
          onChange={e => {
            if (errors[field]) {
              validateHelper(e)
            }
            setValues({ ...values, [field]: e.target.value })
          }}
          // sur le focus gere les erreurs avec la function validate
          onBlur={e => validateHelper(e)}
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
