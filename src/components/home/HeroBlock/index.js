import React from "react"
import Lottie from "react-lottie"

import { Grid, Typography, useMediaQuery } from "@material-ui/core"

import animationData from "../../../images/data.json"
import HeroBlockStyles from "./HeroBlockStyles"

export default function HeroBlock() {
  const matchesLG = useMediaQuery(theme => theme.breakpoints.down("lg"))
  const matchesMD = useMediaQuery(theme => theme.breakpoints.down("md"))
  const matchesSM = useMediaQuery(theme => theme.breakpoints.down("sm"))
  const matchesXS = useMediaQuery(theme => theme.breakpoints.down("xs"))

  const classes = HeroBlockStyles()

  const defaultOptions = {
    loop: true,
    autoplay: true,
    //égal a animationData: animationData
    animationData,
  }
  return (
    <Grid container justifyContent="space-around" alignItems="center">
      <Grid item classes={{ root: classes.textContainer }}>
        <Grid container direction="column">
          <Grid item>
            <Typography
              align="center"
              variant="h1"
              classes={{ root: classes.heading }}
            >
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
        <Lottie
          options={defaultOptions}
          width={
            matchesXS
              ? "20rem"
              : matchesSM
              ? "30rem"
              : matchesMD
              ? "35rem"
              : matchesLG
              ? "40rem"
              : "45rem"
          }
        />
      </Grid>
    </Grid>
  )
}
