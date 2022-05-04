import React, { useState, useContext } from "react"
import axios from "axios"

import { FeedbackContext, UserContext } from "../../../contexts"
import { setSnackbar, setUser } from "../../../contexts/actions"

import {
  Grid,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@material-ui/core"

import CheckoutNavigationStyles from "./CheckoutNavigationStyles"

import save from "../../../images/save.svg"
import Delete from "../../../images/Delete"

export default function CheckoutNavigation({
  steps,
  selectedStep,
  setSelectedStep,
  details,
  setDetails,
  detailSlot,
  location,
  locationSlot,
  setLocation,
}) {
  const classes = CheckoutNavigationStyles({ selectedStep, steps })
  const [loading, setLoading] = useState(null)
  const { dispatchFeedback } = useContext(FeedbackContext)
  const { user, dispatchUser } = useContext(UserContext)

  const handleAction = action => {
    if (steps[selectedStep].error) {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "All fields must be valid before saving",
        })
      )
      return
    }
    setLoading(action)

    const isDetails = steps[selectedStep].title === "Contact"
    const isLocation = steps[selectedStep].title === "Address"

    axios
      .post(
        process.env.GATSBY_STRAPI_URL + "/users-permissions/set-settings",
        {
          details: isDetails && action !== "delete" ? details : undefined,
          detailSlot: isDetails ? detailSlot : undefined,
          location: isLocation && action !== "delete" ? location : undefined,
          locationSlot: isLocation ? locationSlot : undefined,
        },
        {
          headers: { Authorization: `Bearer ${user.jwt}` },
        }
      )
      .then(response => {
        setLoading(null)
        dispatchFeedback(
          setSnackbar({
            status: "success",
            message: `Information ${
              action === "delete" ? "Deleted" : "Saved"
            } Successfully`,
          })
        )
        dispatchUser(
          setUser({ ...response.data, jwt: user.jwt, onboarding: true })
        )

        if (action === "delete") {
          if (isDetails) {
            setDetails({ name: "", email: "", phone: "" })
          } else if (isLocation) {
            setLocation({ street: "", zip: "", city: "", state: "" })
          }
        }
      })
      .catch(error => {
        setLoading(null)
        console.error(error)
        dispatchFeedback(
          setSnackbar({
            status: "error",
            message: `There was a problem ${
              action === "delete" ? "deleting" : "saving"
            }  your information, please try again.`,
          })
        )
      })
  }

  return (
    <Grid
      item
      container
      justifyContent="center"
      alignItems="center"
      classes={{ root: classes.navBar }}
    >
      <Grid item classes={{ root: classes.back }}>
        <Button onClick={() => setSelectedStep(selectedStep - 1)}>
          <Typography variant="h5">{"<"}</Typography>
        </Button>
      </Grid>
      <Grid item>
        <Typography variant="h5">
          {steps[selectedStep].title.toUpperCase()}
        </Typography>
      </Grid>
      <Grid item classes={{ root: classes.forward }}>
        <Button
          disabled={steps[selectedStep].error}
          classes={{ disabled: classes.disabled }}
          onClick={() => setSelectedStep(selectedStep + 1)}
        >
          <Typography variant="h5">{">"}</Typography>
        </Button>
      </Grid>
      {steps[selectedStep].hasActions ? (
        <Grid item classes={{ root: classes.actions }}>
          <Grid container>
            <Grid item>
              {loading === "save" ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={() => handleAction("save")}>
                  <img src={save} alt="save" className={classes.icon} />
                </IconButton>
              )}
            </Grid>
            <Grid item>
              {loading === "delete" ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={() => handleAction("delete")}>
                  <span className={classes.delete}>
                    <Delete color="#fff" />
                  </span>
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Grid>
  )
}
