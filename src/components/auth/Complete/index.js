import React, { useEffect } from "react"
import { setUser } from "../../../contexts/actions"

import { Grid, Typography, Button } from "@material-ui/core"

import CompleteStyles from "./CompleteStyles"

import checkmark from "../../../images/checkmark-outline.svg"
import forward from "../../../images/forward-outline.svg"

export default function Complete({ user, dispatchUser }) {
  const classes = CompleteStyles()

  useEffect(() => {
    //cleanup func --- only execute on component unmount
    return () => {
      dispatchUser(setUser({ ...user, onboarding: true }))
    }
  }, [])

  return (
    <>
      <Grid
        item
        container
        direction="column"
        alignItems="center"
        classes={{ root: classes.iconText }}
      >
        <Grid item>
          <img src={checkmark} alt="sign up finished" />
        </Grid>
        <Grid item>
          <Typography variant="h3" classes={{ root: classes.text }}>
            Account successfully Created!
          </Typography>
        </Grid>
      </Grid>
      <Grid item container justifyContent="flex-end">
        <Grid item classes={{ root: classes.shopContainer }}>
          <Button>
            <Typography variant="h3" classes={{ root: classes.text }}>
              Shop
            </Typography>
            <img src={forward} alt="browse products" className={classes.shop} />
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
