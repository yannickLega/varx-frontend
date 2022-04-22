import React, { useContext, useState } from "react"
import axios from "axios"

import { FeedbackContext } from "../../../contexts"
import { setSnackbar, setUser } from "../../../contexts/actions"

import {
  Grid,
  Typography,
  IconButton,
  CircularProgress,
} from "@material-ui/core"

import EditStyles from "./EditStyles"

import Confirmation from "../Confirmation"

import Backwards from "../../../images/BackwardsOutline"
import editIcon from "../../../images/edit.svg"
import saveIcon from "../../../images/save.svg"

export default function Edit({
  setSelectedSetting,
  edit,
  setEdit,
  details,
  locations,
  detailSlot,
  locationSlot,
  changesMade,
  user,
  dispatchUser,
  isError,
}) {
  const classes = EditStyles()
  const { dispatchFeedback } = useContext(FeedbackContext)
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleEdit = () => {
    if (edit && isError) {
      dispatchFeedback(
        setSnackbar({
          status: "error",
          message: "All fields must be valid before saving",
        })
      )
      return
    }

    setEdit(!edit)
    const { password, ...newDetails } = details

    if (password !== "********") {
      setDialogOpen(true)
    }

    if (edit && changesMade) {
      setLoading(true)

      axios
        .post(
          process.env.GATSBY_STRAPI_URL + "/users-permissions/set-settings",
          {
            details: newDetails,
            detailSlot,
            location: locations,
            locationSlot,
          },
          { headers: { Authorization: `Bearer ${user.jwt}` } }
        )
        .then(response => {
          setLoading(false)
          dispatchFeedback(
            setSnackbar({
              status: "success",
              message: "Settings Saved Successfully",
            })
          )
          dispatchUser(
            setUser({ ...response.data, jwt: user.jwt, onboarding: true })
          )
        })
        .catch(error => {
          setLoading(false)
          console.error(error)
          dispatchFeedback(
            setSnackbar({
              status: "error",
              message:
                "There was a problem saving your settings, please try again.",
            })
          )
        })
    }
  }

  return (
    <Grid
      item
      container
      lg={6}
      xs={12}
      justifyContent="space-evenly"
      alignItems="center"
      classes={{ root: classes.editContainer }}
    >
      <Grid item>
        <IconButton onClick={() => setSelectedSetting(null)}>
          <Grid item>
            <span className={classes.icon}>
              <Backwards color="#fff" />
            </span>
            <Grid item>
              <Typography variant="body2">Back to user menu</Typography>
            </Grid>
          </Grid>
        </IconButton>
      </Grid>
      <Grid item>
        {loading ? (
          <CircularProgress color="secondary" size="8rem" />
        ) : (
          <IconButton disabled={loading} onClick={handleEdit}>
            <Grid item container direction="column">
              <Grid item classes={{ root: classes.iconWrapper }}>
                <img
                  src={edit ? saveIcon : editIcon}
                  alt={`${edit ? "save" : "edit"} settings`}
                  className={classes.icon}
                />
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  {edit ? "save" : "edit"}
                </Typography>
              </Grid>
            </Grid>
          </IconButton>
        )}
      </Grid>
      <Confirmation
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        user={user}
        dispatchFeedback={dispatchFeedback}
        setSnackbar={setSnackbar}
      />
    </Grid>
  )
}
