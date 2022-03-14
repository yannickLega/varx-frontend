import { Grid } from "@material-ui/core"
import React from "react"
import separator from "../../images/wave.svg"

export default function Separator() {
  return (
    <Grid>
      <img src={separator} alt="separator"/>
    </Grid>
  )
}
