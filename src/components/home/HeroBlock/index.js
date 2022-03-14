import React from "react"
import Lottie from "react-lottie"

import { Grid, Typography } from "@material-ui/core"

import animationData from "../../../images/data.json"
import HeroBlockStyles from "./HeroBlockStyles"

export default function HeroBlock() {
  const classes = HeroBlockStyles()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    //égal a animationData: animationData
    animationData,
  }
  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item>
        <Grid container direction="column">
          <Grid item>
            <Typography align="center" variant="h1">
              The Premier
              <br />
              Developer Clothing Line
            </Typography>
          </Grid>
          <Grid item>
            <Typography align="center" variant="h3">
              high quality, custom-designed shirts, hats, and hoodies
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Lottie options={defaultOptions} width="40rem" />
      </Grid>
    </Grid>
  )
}
