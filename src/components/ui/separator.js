import { Grid } from "@material-ui/core"
import React from "react"
import separator from "../../images/wave.svg"

/**
 * This function returns a grid container with an image inside
 * @returns A grid container with an image inside.
 */
export default function Separator() {
  return (
    <Grid container>
      <img src={separator} alt="separator" />
    </Grid>
  )
}
